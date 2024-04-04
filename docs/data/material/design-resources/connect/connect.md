# Connect plugin

<p class="description">Connect is a Figma plugin that generates Material UI themes directly from design to code.</p>

## Introduction

[Connect](https://www.figma.com/community/plugin/1336346114713490235/) is a Figma plugin that lets you generate a theme from the [Material UI for Figma Design Kit](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/).
You can customize design tokens and components, export the generated theme as a JSON file, and visualize your customizations through an embedded Storybook instance.

:::info
This plugin is **in beta**. Component customization support is currently limited to the Button and Switch components. More components will follow soon!
:::

:::warning
Connect works in combination with the Material UI for Figma Design Kit v5.16.0 and later. Other kits, such as the Joy UI Design Kit, are not yet supported.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the Connect plugin running on the side, customizing the Material UI Switch component." width="1628" height="400" />

## Running the plugin

If you don't have [the Complete and latest](/store/items/figma-react/) Material UI Design Kit version installed, you can test the plugin by using [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/) instead.

After installing it, open the Design Kit file on Figma.
Once that's done, head over to [the Connect profile page](https://www.figma.com/community/plugin/1336346114713490235/) on Figma's Community tab and click on "**Open in Figma**".
You'll be able to pick which file to open the plugin at.

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="A screenshot of Figma showcasing the resources menu, which is where you'd go to access Connect." width="1628" height="400" />

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's [local variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables) and [local styles](https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles#:~:text=Local%20styles%20are%20styles%20that,or%20from%20the%20style%20picker.).

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

You can customize how a component looks in all of its variants and states and generate its theme using Connect.

:::warning
Currently, the only supported Material UI components are the Button, Switch, and Typography.
:::

## Adding the theme code into your codebase

## Give feedback

Use [the MUI Design kits GitHub repository](https://github.com/mui/mui-design-kits/issues/new/choose) to open issues about bugs or feature requests for Connect.
