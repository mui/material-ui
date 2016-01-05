## Font Icon
This component will render any [icon](https://www.google.com/design/spec/style/icons.html#) defined in any style sheets included in your project.
We are using [Google's Material Design Icons](https://github.com/google/material-design-icons) for our documentation site along with some custom icons.
You can use sites like IcoMoon for generating custom font files.
To use FontIcon, add your stylesheet to your project and reference the icon's className in the className prop.

We also support [Google's Material Icons](http://google.github.io/material-design-icons/) as seen in the third block of code.
If you're using the material icons, be sure to include the link to the font icon file in your head section:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

To see available Material Icons, go to [material icons library](https://design.google.com/icons/).
Google's material icon's names are in snake_case format. For example: ActionHome would be written as action_home.

### Examples
