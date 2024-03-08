# Connect plugin

<p class="description">A Figma plugin that lets you generate a theme from the Material UI Design kit for Figma. </p>

## Introduction

Connect is a Figma plugin that lets you generate a theme from the [Material UI Design kit for Figma](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).
You can customize both design tokens and components, export a JSON file with the changes to your theme, and also see them through an embedded Storybook instance.

:::warning
The plugin is in beta and doesn't currently support customization to all Material UI components.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the Connect plugin running on the side, doing customziations to the Material UI Switch component." width="1628" height="400" />

## Running the plugin

### Pre-requisites

The Connect Figma plugin only currently works on the Material UI Design kit.
It doesn't support other kits, such as Joy UI, at the moment.

### Basics

Test the plugin by starting with [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x).
Then, visit the Store to get access to [the complete version](https://mui.com/r/material-ui-figma-latest/) with all of the Material UI components.

Once you've installed it, go to your copy of the Material UI design kit, click on the "Resources" button, go to the "Plugins" tab, and then click on "Connect".

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="A screenshot of Figma showcasing the resources menu, which is where you'd go to access Connect." width="1628" height="400" />

<!-- The image above will be replaced for a better one once the plugin is actually live -->

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's "Local variables" and "Local styles" features.

### Existing tokens

The Material UI design kit comes fully loaded with design tokens that map out to [the React library's default theme](/material-ui/customization/default-theme/).
Connect can read all of the existing tokens in the theme.

<img src="/static/material-ui/design-resources/connect-variables.png" style="width: 814px;" alt="A screenshot of Figma showcasing the locals variables menu, which is where all of the design tokens are stored and where you'd go to add new ones." width="1628" height="400" />

To customize them, using the Local variables route as an example, open the modal by clicking on the filter icon, as shown above.
Tweak any of the variables available there as you see fit.
Then, open the plugin and click on "Generate theme".
After a few seconds, you should be able to see the updated theme, with your customizations, in the code editor.

### Adding new tokens

Adding new tokens (such as new colors, shadows, typography, etc.) to the existing list is also possible.
Ensure you add the new ones within the corresponding category and click "Generate theme" again to see them in the code editor tab.

## Customizing the components

You can also customize how a component looks and generate its theme code using Connect.
Currently, the only supported Material UI components are the Button, Switch, and Typography.

## Adding the theme code into your codebase

## Give feedback

Use [the MUI Design kits GitHub repository](https://github.com/mui/mui-design-kits/issues/new/choose) to open issues about bugs or feature requests for Connect.
