# Connect plugin

<p class="description">Connect is a Figma plugin that generates Material UI themes directly from design to code.</p>

## Introduction

[Connect](https://www.figma.com/community/plugin/1336346114713490235/) is a Figma plugin that lets you generate a theme from the [Material UI for Figma Design Kit](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/).
You can customize design tokens and components, export the generated theme as a JSON file, and visualize your customizations through an embedded Storybook instance.

:::warning
This plugin is **in beta**. Component customization support is currently limited to the Button and Switch components. More components will follow soon!

Connect works in combination with the Material UI for Figma Design Kit v5.16.0 and later. Other kits, such as the Joy UI Design Kit, are not yet supported.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the Connect plugin running on the side, customizing the Material UI Switch component." width="1628" height="400" />

## Running the plugin

### Getting started

Follow these steps to generate a Material UI theme using the Connect plugin:

1. Download the [Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/) or purchase the [Complete version](https://mui.com/store/items/figma-react/) of the Material UI for Figma Design Kit.
2. Download and install the [Connect Figma plugin](https://www.figma.com/community/plugin/1336346114713490235/).
3. Open your copy of the Material UI for Figma Design Kit.
4. In the opened Design Kit, right-click anywhere in the canvas, then click **Plugins** > **Connect**.
5. The Connect plugin will appear. Now click on **Generate theme**.
6. After a few seconds a theme is generated (the theme will be empty if the default design kit is unaltered).
7. Click on the **Storybook preview** tab to preview your theme applied to the Material UI component library.

There are several ways to start customizing the Desing Kit in order to generate a non-empty theme file.
Currently the Connect plugin supports customizations applied to:

- `Local variables > palette` to generate custom [color palette tokens](https://mui.com/material-ui/customization/palette/)
- `Local variables > breakpoints` to generate custom [breakpoint tokens](https://mui.com/material-ui/customization/breakpoints/)
- `Local variables > shape` to generate custom [border radius tokens](https://mui.com/system/borders/#border-radius/)
- `Local variables > spacing` to generate custom [spacing tokens](https://mui.com/material-ui/customization/spacing/)
- `Effect styles > elevation` to generate custom [shadow tokens](https://mui.com/system/shadows/)
- `Text styles > typography` to generate custom [Typography component](https://mui.com/material-ui/react-typography/) styles
- `Components > Button > any variant` to generate custom [Button component](https://mui.com/material-ui/react-button/) theme styles
- `Components > Switch > any variant` to generate custom [Switch component](https://mui.com/material-ui/react-switch/) theme styles

(Note: More components will soon be supported)

Once you've made any of these changes to the Design Kit, rerun the plugin to generate a new theme.

### Basics

Test the plugin by starting with [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/).
Then, visit the Store to get access to [the Complete version](https://mui.com/store/items/figma-react/) with all of the Material UI components.

Once you've installed it, go to your copy of the Material UI Design Kit, click on the **"Resources"** button, go to the **"Plugins"** tab, and then click on **"Connect"**.

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="A screenshot of Figma showcasing the resources menu, which is where you'd go to access Connect." width="1628" height="400" />

<!-- The image above will be replaced for a better one once the plugin is actually live -->

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's local variables and local styles.

### Existing tokens

The Material UI Design Kit comes fully loaded with design tokens that map out to [the default theme of the Material UI React library](/material-ui/customization/default-theme/).

Connect can read all of the existing tokens in the theme.
To customize them using local variables, open the modal by clicking on the filter icon as shown above.
Tweak any of the variables available there as you see fit.
Then open the plugin and click on **Generate theme.**

After a few seconds, you should be able to see the updated theme with your customizations in the code editor.

<img src="/static/material-ui/design-resources/connect-variables.png" style="width: 814px;" alt="A screenshot of Figma showcasing the locals variables menu, which is where all of the design tokens are stored and where you'd go to add new ones." width="1628" height="400" />

### Adding new tokens

You can add custom tokens such as new colors, shadows, or typography to the existing list.
Add your custom tokens to the appropriate category and click **Generate theme** again to see them in the code editor tab.

## Customizing the components

You can customize how a component looks and generate its theme code using Connect.

:::warning
Currently, the only supported Material UI components are the Button, Switch, and Typography.
:::

## Adding the theme code into your codebase

## Give feedback

Use [the MUI Design kits GitHub repository](https://github.com/mui/mui-design-kits/issues/new/choose) to open issues about bugs or feature requests for Connect.
