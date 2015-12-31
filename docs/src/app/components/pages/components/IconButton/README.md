## Icon Button
An [Icon Button](https://www.google.com/design/spec/components/buttons.html#buttons-toggle-buttons) generates a button element around an icon. Also, focus styles will happen on tab but not on click. There are three ways to add an icon:

  1. For stylesheets: Set the prop "iconClassName" to the classname for you icon.
  2. For SVG icons: Insert the SVG component as a child of icon buttons. This is the method we are using. [View our source](https://github.com/callemall/material-ui/blob/master/src/svg-icons/action/grade.jsx) to see how ActionGrade was created using mui.SvgIcon.
  3. Alternative: You can also insert a [FontIcon](http://www.material-ui.com/#/components/icons) component as a child of IconButton. This is similar to how the iconClassName prop from method 1 is handled.
  4. Google Material Icons: Now also supported for iconButtons by passing "material-icons" in iconClassName prop.

### Examples
