## Card

A [card](https://www.google.com/design/spec/components/cards.html)
is a piece of paper with unique related data that serves as an
entry point to more detailed information. For example, a card could
contain a photo, text, and a link about a single subject.

Cards have a constant width and variable height. The maximum height is
limited to the height of the available space on a platform,
but it can temporarily expand (for example, to display a comment field).
Cards do not flip over to reveal information on the back.

`Card` expansion can be controlled (use `expanded` and `onExpandChange`
properties) or uncontrolled (use `initiallyExpanded` property). Use the
`expandable` property to control whether an element will react to
expansion or not. Use `actAsExpander` on `CardTitle` or `CardHeader` to
let them have an expander button.

### Examples
