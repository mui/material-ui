# MUI Connect plugin

<p class="description">A Figma plugin that lets you generate a theme from the Material UI Design kit for Figma. </p>

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the MUI Connect plug-in running on the side, doing customziations to the Material UI Switch component." width="1628" height="400" />

MUI Connect is a Figma plugin that lets you generate a theme from the Material UI Design kit for Figma.
You can customize both design tokens and components, generate a theme JSON, and see your changes from an embedded Storybook instance.

:::warning
The plugin is in beta and doesn't currently support customization to all Material UI components.
:::

## How to run the plugin

### Pre-requisites

The MUI Connect Figma plugin only currently works on the Material UI Design kit.
It won't be able to generate the theme for other files, including the Joy UI Design kit.

Test the plugin by starting with [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).
Then, visit the Store to get access to [the complete version](https://mui.com/r/material-ui-figma-latest/) with all of the Material UI components.

### Basics

Once you've installed it, go to your copy of the Material UI design kit, click on the "Resources" button, go to the "Plugins" tab, and then click on "MUI Connect".

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's "local variables" and "local styles" features.

### Available tokens

The Material UI design kits come fully loaded with design tokens that map out to the React library's default theme.
MUI Connect can read all of the available tokens in the theme.

To customize one of them, open the Local variables modal or one text style or shadow in the Local styles panel, and change their values.
After you've done that, open the plugin and click on "Generate theme".
You should be able to see the modified tokens on the code and the Storybook preview tab.

### Adding new tokens

Adding new tokens to the existing category of tokens supported (such as colors, shadows, typography, etc.) is also possible.
Ensure you add the new ones within the corresponding category and click "Generate theme" again to see them in the code and Storybook.

## Customizing the components

You can also customize how a component looks and generate its theme code using MUI Connect.
Currently, the only supported Material UI components are the Button, Switch, and Typography.

## Inserting the theme code into your codebase

## New feature requests and bug reports

Use [the MUI Design kits GitHub repository](https://github.com/mui/mui-design-kits/issues/new/choose) to open issues about bugs or feature requests for MUI Connect.
