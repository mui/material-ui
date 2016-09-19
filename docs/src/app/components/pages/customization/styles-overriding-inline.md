### Overriding with Inline Styles

The **first way** to override the style of the components is to use the *inline-style* approach.

Every component provides different `style` properties. Those properties always have
a higher priority over the style used internally.
In detail:
 - A `style` property is always provided and applied to the *root* element.
 - Additional `xxxStyle` properties are provided to customize nested elements.
E.g. `iconStyle`.

If you need to override the inline styles of an element nested deep within a component and there is not a style property available to do so, please [submit an issue](https://github.com/callemall/material-ui/issues) requesting to have one added.
