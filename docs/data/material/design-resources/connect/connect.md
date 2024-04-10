# Connect plugin

<p class="description">Connect is a Figma plugin that generates Material UI themes directly from design to code.</p>

## Introduction

[Connect](https://www.figma.com/community/plugin/1336346114713490235/) is a Figma plugin that lets you generate a theme from the [Material UI for Figma Design Kit](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/).
Customize the Design Kit's tokens and components, and run the Connect plugin to generate a theme ready for use in your Material UI based projects.

:::warning
Connect works in combination with the Material UI for Figma Design Kit [v5.16.0 and later](https://github.com/mui/mui-design-kits/releases).
Other kits, such as the Joy UI Design Kit, are not yet supported.
:::

<img src="/static/material-ui/design-resources/connect.png" style="width: 814px;" alt="Customizing the Material UI Switch component in Figma with the Connect plugin running." width="1628" height="400" />

## Running the plugin

If you don't have [the complete and latest](/store/items/figma-react/) Material UI Design Kit version installed, you can test the plugin by using [the Community version](https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x/) instead.

After installing it, open the Design Kit file in Figma.
Then head over to [the Connect plugin page](https://www.figma.com/community/plugin/1336346114713490235/) on Figma's Community tab and click on **Open in...** and select the Material UI for Figma Design Kit.

<img src="/static/material-ui/design-resources/connect-access.png" style="width: 814px;" alt="Accessing Connect via the Resources menu in Figma." width="1628" height="400" />

## Customizing design tokens

The Design Kit's design tokens are defined in the [local variable collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables) for color palettes, breakpoints, shapes & spacing tokens, and in [local effect and text styles](https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles#:~:text=Local%20styles%20are%20styles%20that,or%20from%20the%20style%20picker.) for shadow and typography tokens. You can freely alter or extend these tokens to customize the look and feel of your design system, and use Connect to generate a theme containing your customizations.

### Altering existing tokens

The Material UI Design Kit comes fully loaded with design tokens that map out to [the default theme of the Material UI React library](/material-ui/customization/default-theme/).

To customize tokens defined by Figma variables, open the local variables modal by clicking on the filter icon as shown below.
Tweak any of the variables available in the various collections (palette, breakpoints, shapes & spacing) as you see fit.

<img src="/static/material-ui/design-resources/connect-variables.png" style="width: 814px; margin-bottom: 8px;" alt="The Locals variables menu in Figma, where all design tokens are stored and new ones can be added." width="1628" height="400" />

Then open the Connect plugin and click on **Generate theme**.

<img src="/static/material-ui/design-resources/connect-generate.png" style="width: 814px" alt="The Generate theme button in the Connect plugin UI." width="1628" height="400" />

A theme containing the altered tokens is generated and displayed in the plugin's **Theme** tab.

<img src="/static/material-ui/design-resources/connect-code-editor.png" style="width: 814px" alt="The generated theme displayed in the Connect plugin UI." width="1628" height="400" />

Preview the generated theme and your customized tokens by navigating to the **Storybook preview** tab.

<img src="/static/material-ui/design-resources/connect-storybook.png" style="width: 814px" alt="The generated theme previewed in Storybook in the Connect plugin UI." width="1628" height="400" />

### Adding new tokens

You can also extend the existing tokens with your own by either adding new variables to the existing local variable collections, or by adding new elevation and typography styles.
After you've added your custom tokens, click on **Regenerate theme** to includes these tokens in your theme.

<img src="/static/material-ui/design-resources/connect-regenerate.png" style="width: 814px" alt="The 'Regenerate button' in the Connect plugin UI." width="1628" height="400" />

## Customizing components

Connect can also generate theme styles for customized components. This feature is currently limited to the **Button** and **Switch** components. Support for more components will follow soon.

:::warning
Please note that the Desing Kit's component layer hierarchy and layer names should remain unaltered in order for Connect to correctly extract the custom component styles and generate a theme for them.
:::

<video controls muted loop width="1584" height="1080" style="border-radius: 12px; border: 1px solid; border-color: hsla(0, 0%, 0%, .1);">
  <source src="/static/material-ui/design-resources/custom-component.mp4" type="video/mp4">
</video>

You can customize components by changing the look and feel of component variants in the Desing Kit.

Each variant represents a specific version of a component defined by its variant properties (e.g. color, size, state, ...). These properties map to Material UI props and states. For example, the `Checked=True, Size=Medium, Color=Primary, State=Enabled` Switch variant in Figma maps to `<Switch color="primary" size="medium" checked={true} disabled={false} />` in Material UI.

### Customizing component variants

In the example below we've customized the `Checked=True, Size=Medium, Color=Primary, State=Enabled` variant of the Switch component to look like an iOS switch.

<img src="/static/material-ui/design-resources/connect-component-variant.png" style="width: 814px" alt="A specific variant of the Switch component selected in the Design Kit" width="1628" height="400" />

Connect will generate the following theme:

```js
{
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
            '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))':
              {
                width: '40px',
                height: '21px',
                padding: '0',
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  padding: '0',
                  '& .MuiSwitch-thumb': {
                    width: '17px',
                    height: '17px',
                    background: '#FAFAFA',
                  },
                  '& + .MuiSwitch-track': {
                    width: '38px',
                    height: '21px',
                    background: 'var(--mui-palette-success-light)',
                    opacity: '1',
                  },
                },
              },
          },
        },
      },
    },
  },
}
```

As you can see, the generated theme targets the class names matching the specific variant we've altered in Figma. As we've only customized one variant in Figma the resulting theme will only apply our iOS style when the Switch component props and state exactly match those of the customized variant.

In order to deal with all the states the Switch can be in we have to alter the sibling variants in Figma as well. For example, let's say we fully want to customize Switch component of size `medium` and color `primary`. To do so we have to alter the style of the following variants in Figma:

- `Checked=True, Size=Medium, Color=Primary, State=Enabled`
- `Checked=False, Size=Medium, Color=Primary, State=Enabled`
- `Checked=True, Size=Medium, Color=Primary, State=Hovered`
- `Checked=False, Size=Medium, Color=Primary, State=Hovered`
- `Checked=True, Size=Medium, Color=Primary, State=Disabled`
- `Checked=False, Size=Medium, Color=Primary, State=Disabled`
- `Checked=True, Size=Medium, Color=Primary, State=Focused`
- `Checked=False, Size=Medium, Color=Primary, State=Focused`

To efficiently do this, you can:

1. Start by customizing a single 'base' variant (e.g. `Checked=True, Size=Medium, Color=Primary, State=Enabled`).
2. Clone this variant and rename it to target the next variant you'd like to customize (e.g. rename the cloned version of `Checked=True, Size=Medium, Color=Primary, State=Enabled` to `Checked=False, Size=Medium, Color=Primary, State=Enabled`)
3. Delete the old, now duplicate version of this variant (e.g. delete the original `Checked=False, Size=Medium, Color=Primary, State=Enabled` variant).
4. Move the new version of the variant to the correct square in the variant grid
5. Make the necessary style adjustments to the variant's child layers.

Repeat this process for each variant you want to customize. Below you can see what the result can look like.

<img src="/static/material-ui/design-resources/connect-switch-component-customized.png" style="width: 814px" alt="A fully customized Switch component in the Design Kit" width="1628" height="400" />

Now you can go ahead and run Connect to generate a new theme. For the example shown above the theme will look like this:

```js
{
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          "&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)": {
            width: "40px",
            height: "21px",
            padding: "0",
            "& .MuiSwitch-switchBase": {
              padding: "0",
              "& .MuiSwitch-thumb": {
                width: "17px",
                height: "17px",
                background: "#FAFAFA",
              },
              "& + .MuiSwitch-track": {
                width: "38px",
                height: "21px",
              },
            },
            "&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(3px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "#BDBDBD",
                    opacity: "1",
                  },
                },
              },
            "&:not(:has(.Mui-checked)):has(.Mui-disabled):not(:has(.Mui-focusVisible))":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(3px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "rgba(229, 229, 229, 0.99)",
                    opacity: "1",
                  },
                },
              },
            "&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):has(.Mui-focusVisible)":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(3px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    border: "1px solid #000",
                    background: "#BDBDBD",
                    opacity: "1",
                  },
                },
              },
            "&:has(.Mui-checked):has(.Mui-disabled):not(:has(.Mui-focusVisible))":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(19px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "rgba(187, 231, 188, 0.99)",
                    opacity: "1",
                  },
                },
              },
            "&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(3px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "#616161",
                    opacity: "1",
                  },
                },
              },
            "&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(19px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "var(--mui-palette-success-light)",
                    opacity: "1",
                  },
                },
              },
            "&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(19px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    background: "var(--mui-palette-success-dark)",
                    opacity: "1",
                  },
                },
              },
            "&:has(.Mui-checked):not(:has(.Mui-disabled)):has(.Mui-focusVisible)":
              {
                "& .MuiSwitch-switchBase": {
                  transform: "translateX(19px) translateY(2px)",
                  "& + .MuiSwitch-track": {
                    border: "1px solid #000",
                    background: "var(--mui-palette-success-light)",
                    opacity: "1",
                  },
                },
              },
          },
        },
      },
    },
  },
}
```

Finally you can check out the Storybook preview to test the Material UI version of your component.

<img src="/static/material-ui/design-resources/connect-switch-component-customized-storybook.png" style="width: 814px" alt="A fully customized Switch component in Storybook" width="1628" height="400" />

## Using the generated theme

The theme generated by Connect is meant to be used in combination with Material UI's [`CssVarsProvider`](/material-ui/experimental-api/css-theme-variables/migration/). Material UI's default [`ThemeProvider`](/material-ui/customization/theming/#theme-provider) is currently not supported.

:::info
Use Material UI's [CssVarsProvider](/material-ui/experimental-api/css-theme-variables/migration/) to load a theme generated by Connect.
:::

An example of using a theme generated theme by Connect in your frontend codebase:

```ts
// Your app's root component
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";

export default function MyApp({ Component, pageProps }) {
  // the theme object generated by Connect
  const copiedConnectTheme = {
    shape: {
      borderRadius: 12,
    }
  };

  const theme = extendTheme(copiedConnectTheme);

  return (
    <CssVarsProvider theme={theme}>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
```

## Feedback and bug reports

Use [the dedicated Connect feedback board](https://mui-connect.canny.io/feedback) to share feedback, report bugs, or drop feature requests.
