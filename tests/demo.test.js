import lex from 'pug-lexer'
import parse from 'pug-parser'
import genSource from '#pug-source-gen'

import { test, expect } from 'vitest'

const source = `
include a

mixin myMixin(arg)
  block
  p&attributes(attributes) Paragraph: #[strong= arg]

html
  head
  body
    p.klass(attr falseattr=false class=['myClass']) Introduction
    +myMixin('Content').klass2
      h1 Heading
`

test('generate', () => {
  const ast = parse(lex(source))
  const generatedSource = genSource(ast)
  expect(generatedSource).toMatchInlineSnapshot(`
    "include a
    mixin myMixin(arg)
      block
      p&attributes([object Object]) Paragraph: #[strong= arg]
    html
      head
      body
        p.klass(attr=true falseattr=false class=['myClass']) Introduction
        +myMixin('Content').klass2
          h1 Heading"
  `)
})
