## Icon Button
An [Icon Button](https://www.google.com/design/spec/components/buttons.html#buttons-toggle-buttons) generates a button 
element around an icon. Also, focus styles will happen on tab but not on click. There are three ways to add an icon:

  1. For icon font stylesheets: Set the prop `iconClassName` to the classname for your icon. Certain icon fonts support 
  ligatures, allowing the icon to be specified as a string.
  2. For SVG icons: Insert the SVG component as a child of icon buttons.
  3. Alternative: You can also insert a [FontIcon](/#/components/font-icon) component as a child of IconButton. This is 
  similar to how the iconClassName prop from method 1 is handled.

### Examples
