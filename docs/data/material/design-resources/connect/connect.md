# Connect plugin

<p class="description">Connect is a Figma plugin that generates Material UI themes directly from design to code.</p>

## Introduction

[Connect](https://www.figma.com/community/plugin/1336346114713490235/) is a Figma plugin that lets you generate a theme from the [Material UI for Figma Design Kit](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/).
You can customize design tokens and components, export the generated theme as a JSON file, and visualize your customizations through an embedded Storybook instance.

:::info
This plugin is **in beta**. Component customization support is currently limited to the Button, Switch, and Typography components.
More components will follow soon!
:::

:::warning
Connect works in combination with the Material UI for Figma Design Kit [v5.16.0 and later](https://github.com/mui/mui-design-kits/releases).
Other kits, such as the Joy UI Design Kit, are not supported yet.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="A screenshot of Figma together with the Connect plugin running on the side, customizing the Material UI Switch component." width="1628" height="400" />

## Running the plugin

If you don't have [the Complete and latest](/store/items/figma-react/) Material  UI Design Kit version installed, you can test the plugin by using [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/) instead.

After installing it, open the Design Kit file on Figma.
Once that's done, head over to [the Connect profile page](https://www.figma.com/community/plugin/1336346114713490235/) on Figma's Community tab and click on "**Open in...**".
You should be able to pick the Design Kit file.

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="A screenshot of Figma showcasing the resources menu, which is where you'd go to access Connect." width="1628" height="400" />

## Customizing design tokens

Design tokens consist of the styles that are defined through Figma's [local variables](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables) and [local styles](https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles#:~:text=Local%20styles%20are%20styles%20that,or%20from%20the%20style%20picker.).

### Existing tokens

The Material UI Design Kit comes fully loaded with design tokens that map out to [the default theme of the Material UI React library](/material-ui/customization/default-theme/).
Connect can read all of the existing tokens in the theme.

To customize them using local variables, open the modal by clicking on the filter icon as shown below.
Tweak any of the variables available there as you see fit.

<img src="/static/material-ui/design-resources/connect-variables.png" style="width: 814px; margin-bottom: 8px;" alt="A screenshot of Figma showcasing the locals variables menu, which is where all of the design tokens are stored and where you'd go to add new ones." width="1628" height="400" />

Then open the plugin and click on **Generate theme.**
After a few seconds, you should be able to see the updated theme with your customizations in the code editor.

<img src="/static/material-ui/design-resources/connect-generate.png" style="width: 814px" alt="A screenshot of the Connect plugin UI highlighting the Generate theme button." width="1628" height="400" />

### Adding new tokens

You can add custom tokens such as new colors or shadows, for example, to the existing list.
After adding them, click on **Regenerate theme** again to see them in the code editor tab.

## Customizing the components

You can customize how a component looks in all of its variants and states and generate its theme using Connect.

<video controls muted loop width="1584" height="1080" style="border-radius: 12px; border: 1px solid; border-color: hsla(0, 0%, 0%, .1);">
  <source src="/static/material-ui/design-resources/custom-component.mp4" type="video/mp4">
</video>

:::warning
Component customization support is currently limited to the Button, Switch, and Typography components.
More components will follow soon!
:::

## Using the generated theme

The code Connect generates uses [the `CssVarsProvider` API](/material-ui/experimental-api/css-theme-variables/migration/) under the hood, which primarily impacts you if your project supports both light and dark modes, whereas component customization code should work on your theme regardless of which API you're using because Connect utilizes CSS classes to target component slots.

### Theme tokens

For example, say you've changed the primary main color in light mode as well as the border-radius value.
This is how your code should be inserted into your theme:

```js
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#BBDEFB', // example color
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});
```

:::info
The `colorSchemes` node and `extendTheme` function are the only elements particular to the `CssVarsProvider` API.
Remove the former and change the latter to `createTheme` if you're using [the standard `ThemeProvider` API](/material-ui/customization/theming/) instead.
:::

## Component customizations

The code Connect generates for component customizations should work well if you just copy it into your theme's `component` node.
For example, imagine you've customized the Switch's track and thumb size.
Here's how you'd add the code to your theme:

```js
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))':
              {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(20px) translateY(5px)',
                  '& .MuiSwitch-thumb': {
                    width: '15px',
                    height: '15px',
                    boxShadow: 'none',
                  },
                  '& + .MuiSwitch-track': {
                    height: '20px',
                  },
                },
              },
          },
        },
      },
    },
  },
});
```

You can clean it up further by removing all of the `has()` pseudo-classes.
Connect needs that to be able to isolate the changes done through Figma, but you might not need it on your code.
So, here's the updated code:

```js
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium.MuiSwitch-colorPrimary': {
            '& .MuiSwitch-switchBase': {
              transform: 'translateX(20px) translateY(5px)',
              '& .MuiSwitch-thumb': {
                width: '15px',
                height: '15px',
                boxShadow: 'none',
              },
              '& + .MuiSwitch-track': {
                height: '20px',
              },
            },
          },
        },
      },
    },
  },
});
```

## Feedback and bug reports

Use [the dedicated Canny.io board](https://mui-connect.canny.io/feedback) to share any feedback, report bugs, or drop feature requests.
