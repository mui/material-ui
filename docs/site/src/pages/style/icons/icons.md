# Icons

Material [icons](https://material.io/guidelines/style/icons.html) use geometric shapes to visually represent core ideas, capabilities, or topics.

Icons are commonly found in app bars, toolbars, buttons, and lists.

## Font Icons

An `Icon` will display one of the many [material design icons freely available](https://material.io/icons/). As a prerequisite, you must include an icon font such as [the material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web).

{{demo='pages/style/icons/Icons.js'}}

## SVG Icons

The `SvgIcon` component takes an SVG `path` element as its child, and converts it to a React component which displays
the path and allows the icon to be styled and respond to mouse events.

The resulting icon can be used as is, or included as a child for other Material-UI components that use icons.

{{demo='pages/style/icons/SvgPaths.js'}}
