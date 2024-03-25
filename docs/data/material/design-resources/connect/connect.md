# Connect plugin

<p class="description">Connect is a Figma plugin that lets you generate a theme from the Material UI Design Kit.</p>

## Introduction

Connect is a Figma plugin that lets you generate a theme from the [Material UI Design Kit for Figma](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).
You can customize design tokens and components, export a JSON file with the changes to your theme, and visualize your customizations through an embedded Storybook instance.

:::warning
This plugin is currently in beta and some Material UI components cannot be customized yet.

Connect only supports the Material UI Design Kit; others, such as the Joy UI Design Kit, are not yet supported.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the Connect plugin running on the side, customizing the Material UI Switch component." width="1628" height="400" />

## Running the plugin

### Basics

Test the plugin by starting with [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).
Then, visit the Store to get access to [the complete version](https://mui.com/r/material-ui-figma-latest/) with all of the Material UI components.

Once you've installed it, go to your copy of the Material UI Design Kit, click on the **"Resources"** button, go to the **"Plugins"** tab, and then click on **"Connect"**.

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="A screenshot of Figma showcasing the resources menu, which is where you'd go to access Connect." width="1628" height="400" />

<!-- The image above will be replaced for a better one once the plugin is actually live -->

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's local variables and local styles.

### Existing tokens

The Material UI Design Kit comes fully loaded with design tokens that map out to [the default theme of the Material UI React library](/material-ui/customization/default-theme/).

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
Currently, the only supported Material UI components are the Button, Switch, and Typography.
:::

## Adding the theme code into your codebase

## Give feedback

Use [the MUI Design kits GitHub repository](https://github.com/mui/mui-design-kits/issues/new/choose) to open issues about bugs or feature requests for Connect.
