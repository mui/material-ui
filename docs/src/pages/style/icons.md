# Icons

Material [icons](https://material.io/guidelines/style/icons.html) use geometric shapes to visually
represent core ideas, capabilities, or topics.

## System icons

A [system icon](https://material.io/guidelines/style/icons.html#icons-system-icons) or UI icon,
symbolizes a command, file, device, or directory.
System icons are also used to represent common actions like trash, print, and save,
and are commonly found in app bars, toolbars, buttons, and lists.
Google has provided a set of [Material icons](https://material.io/icons/) that follow these guidelines.

Material-UI provides two components to render system icons: `Icon` for rendering font icons, and `SvgIcon` for rendering SVG paths.

### Font Icons

The `Icon` component will display an icon from any icon font that supports ligatures.
As a prerequisite, you must include one, such as the
[Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web) in your project.

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the
class name using the Icon component's `className` property.

To use an icon simply wrap the icon name (font ligature) with the `Icon` component,
for example `<Icon>star</Icon>`.
By default, an Icon will inherit the current text color.
Optionally, you can set the icon color using one of the theme color properties: `accent`, `action`, `contrast`, `disabled`, `error`, & `primary`.

{{demo='pages/style/Icons.js'}}

### SVG Icons

The `SvgIcon` component takes an SVG `path` element as its child and converts it to a React component that displays the path,
and allows the icon to be styled and respond to mouse events.

The resulting icon can be used as is,
or included as a child for other Material-UI components that use icons.

{{demo='pages/style/SvgIcons.js'}}

### SVG Material icons

We provide a separate NPM package,
[material-ui-icons](https://www.npmjs.com/package/material-ui-icons),
that includes the [material.io/icons](https://material.io/icons/) converted to SvgIcon components.
Let's say you are looking for an icon.
You can take advantage of the **search bar** of [material.io/icons](https://material.io/icons/).
Keep in mind that we `PascalCase` the names of the icons, for instance:
- [`alarm`](https://material.io/icons/#ic_alarm) is exposed as `material-ui-icons/Alarm`
- [`alarm off`](https://material.io/icons/#ic_alarm_off) is exposed as `material-ui-icons/AlarmOff`

{{demo='pages/style/SvgMaterialIcons.js'}}
