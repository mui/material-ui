---
title: Windows High Contrast mode support in Material UI
description: Learn how Windows High Contrast maps to CSS system colors and why Material UI uses an opt-in theme enhancer for forced-colors support.
date: 2026-07-01T00:00:00.000Z
authors: ['silviuaavram']
tags: ['Material UI', 'Accessibility', 'Guide']
manualCard: false
---

## Windows High Contrast mode

As described in the [Microsoft blog](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/), the Windows High Contrast mode is an accessibility feature that is designed to increase text legibility and improve readability. It can be enabled at an Operating System level, by going to Settings > Ease of Access > High contrast, then 'Turn on high contrast'.

The user can select system colors which are going to be applied, via the user theme, to their UI. In turn, web developers need to make sure these system colors are applied correctly to their apps, such that the resulting experience is correct.

## CSS System Colors

When Windows High Contrast Mode (WHCM) is turned on, complex color gradients, shadows, and background images are removed. Text is converted to a solid color that contrasts with the background. Buttons, borders, and menus are reduced to simple outlines and solid fills for clear visibility.

These overrides are done using the [css system colors](https://www.w3.org/TR/css-color-4/#css-system-colors). They have OS defaults, but, as mentioned above, these could be changed by the user as well. System colors are meant to cover all cases where the OS needs a contrasting alternative to the colors it will replace. For example, `SelectedItem` and `SelectedItemText` are used to override a selected menu item's background and text colors. When doing an value override, the user should make sure that these colors contrast at least to the WCAG AA standard, but this part is out of scope for this article. Instead, we are going to focus on using these system colors in our components, to make sure the app in WHCM looks as expected.

## CSS Features

CSS provides a media query that detects whenever WHCM is active:

### @media(forced-colors: $value)

```css
@media (forced-colors: active) {
  .highlighted-menu-item {
    color: HighlightText;
    background-color: Highlight;
  }
}
```

Here, we are using the a duo of system colors to style a menu item's selected state. For native HTML elements, the browser will do that out of the box, so it's important that we do it ourselves for the custom built elements.

### forced-color-adjust: $value

Another CSS feature that is useful here is the [forced-color-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/forced-color-adjust) property. This is an escape hatch that should be used whenever we don't want the OS to apply WHCM styles on an elements and its children.

In the example above, the styles are probably not going to be enough, as the OS will also apply a highlight style over the menu item's text, and that could look weird. Consequently, we can use the `forced-color-adjust: none` escape hatch to get rid of it. Just keep in mind that you are now in full control and need to make sure that the styles chosen for WHCM work well.

## Chromium Flags

Some useful Chromium features that allow developers to emulate and test WHCM are found in the DevTools' Rendering tab. These are:

- `forced-colors`: when set to `active`, it emulates the WHCM inside the browser.
- `prefer-color-scheme`: force either `light` or `dark` mode, which is also useful for WHCM, since it's supposed to work in both color schemes.

## WHCM with Material UI Components

### The problem

Material UI components generally behaved well in WHCM, but there were some corner cases that we missed.

The fixes cover:

- AccordionSummary disabled opacity.
- Autocomplete disabled options.
- Autocomplete focused and selected options.
- Checkbox disabled color.
- FilledInput error and disabled states.
- FormControlLabel disabled label.
- FormHelperText error and disabled states.
- FormLabel error and disabled states.
- Input error and disabled states.
- InputBase placeholder opacity.
- LinearProgress root, bar, and buffer visibility.
- MenuItem disabled, hover, focus-visible, and selected states.
- ListItemIcon inherited color.
- ListItemButton hover, focus-visible, and selected states.
- NativeSelect disabled icon.
- OutlinedInput error and disabled states.
- Radio disabled color.
- Slider disabled track and thumb.
- Switch disabled track and thumb.
- ButtonBase focus outline.
- Tooltip visible border.
- ToggleButton selected and selected hover states.

If these cases would not have been properly visible within our default themes, it would have been a huge issue. Consequently, it was critical for us to address the gaps in WHCM. Lucky for us, Material UI provides many options to style components, so the real challenge was to choose the best one for the job.

The following demo shows these affected states side by side.
In Chrome, open DevTools > More tools > Rendering, then set `forced-colors` to `active` and `prefers-color-scheme` to `light` or `dark`.
You can also use your operating system's high contrast or contrast theme settings.

{{"demo": "../../data/material/customization/palette/HighContrastShowcase.js", "defaultCodeOpen": false}}

### The options

#### The `sx` prop

```jsx
<Button
  sx={{
    '@media (forced-colors: active)': {
      border: '1px solid ButtonBorder',
      color: 'ButtonText',
    },
  }}
>
  Save changes
</Button>
```

The quickest way to patch a styling issue. However, we needed to fix the components on our end, instead of asking our consumers to patch all their components via `sx`.

#### The `styled()` wrappers

```jsx
const AppButton = styled(Button)(() => ({
  '@media (forced-colors: active)': {
    borderColor: 'ButtonBorder',
  },
  '&:focus-visible': {
    '@media (forced-colors: active)': {
      outline: '5px auto Highlight',
    },
  },
}));
```

An upgrade over `sx` in this case, since it allows the style to be reused between component instances. However, we run into the same issue as before: consumers would need to wrap their components, instead of us fixing them.

#### global CSS / `GlobalStyles`

```jsx
<GlobalStyles
  styles={{
    '@media (forced-colors: active)': {
      '.MuiButtonBase-root:focus-visible': {
        outline: '5px auto Highlight',
      },
      '.MuiTooltip-tooltip': {
        border: '1px solid ButtonText',
      },
    },
  }}
/>
```

Same issue as before: userland fix. Also, it's purely selector-based, and might be quite brittle due to class names and specificity.

#### Theme `components.styleOverrides`

```jsx
const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [`&.${menuItemClasses.selected}`]: {
            '@media (forced-colors: active)': {
              forcedColorAdjust: 'none',
              color: 'SelectedItemText',
              backgroundColor: 'SelectedItem',
            },
          },
          [`&.${menuItemClasses.focusVisible}, &:hover`]: {
            '@media (forced-colors: active)': {
              forcedColorAdjust: 'none',
              color: 'HighlightText',
              backgroundColor: 'Highlight',
            },
          },
        },
      },
    },
  },
});
```

This might be the best way to address the issue by the users, since it's component-aware and central. If a consumer would have chosen to address this issue in their Material UI based solution, this would have probably the best solution.

#### Built-in styles inside components

This is the most straightforward approach to address the issue from our end: actually improving the component styles.

```js
const ButtonRoot = styled(ButtonBase)(({ theme }) => ({
  // regular Button styles...

  '@media (forced-colors: active)': {
    '&:focus-visible': {
      outline: '5px auto Highlight',
    },

    [`&.${buttonClasses.disabled}`]: {
      color: 'GrayText',
      opacity: 1,
    },
  },
}));
```

It involves us going through all our components, identify the gaps, and address them, merge the changes and release. Solved. However, some of our consumers most probably addressed these issues themselves, and our changes might become breaking changes for them. We still wanted to address the issue on our end, but without any potential issues on update.

#### Theme Enhancer

To avoid breaking changes and also deliver a fix from our side, we considered to deliver a theme enhancer, which would be a fully opt-in solution. The API proposed is quite simple:

```js
const userTheme = createTheme({
  // user theme options
});
const enhancedTheme = enhance(userTheme, {
  // system color value overrides
});
```

This gives us control over the user's theme in order to provide the required style overrides, while also giving the user the choice of using it.

### The solution

```js
import { createTheme, enhanceHighContrast } from '@mui/material/styles';

const theme = enhanceHighContrast(createTheme(), {
  activeBackground: 'SelectedItem',
  activeText: 'SelectedItemText',
});
```

Finally, we decided to go ahead with the [theme enhancer](https://mui.com/material-ui/customization/palette/#windows-high-contrast-mode). The [enhanceHighContrast](https://mui.com/material-ui/customization/theming/#enhancehighcontrast-theme-tokens-theme) function takes the user's theme as argument, an object with token overrides, and adds the fixes on top of the theme.

It involves minimum changes from the user, it's completely opt-in and addresses all issues through the theme object's `styleOverrides`. Of course, we would strongly encourage everyone to use it, whether or not they have addressed the issue in-house, as there might still be gaps.

For example, here's the theme overrides fix for the FormLabel's error and disabled states, using tokens:

```js
MuiFormLabel: {
  ...c?.MuiFormLabel,
  styleOverrides: {
    ...c?.MuiFormLabel?.styleOverrides,
    root: [
      c?.MuiFormLabel?.styleOverrides?.root,
      {
        [`&.${formLabelClasses.error}`]: {
          [HCM]: {
            color: hcTokens.error,
          },
        },
        [`&.${formLabelClasses.disabled}`]: {
          [HCM]: {
            color: hcTokens.disabled,
          },
        },
      },
    ],
  },
},
```

## Takeaways

The `enhanceHighContrast` feature is part of Material UI's effort to improve the library's accessibility and encourage accessible UX in web apps. We look forward to receiving feedback as we aim to improve our support for Windows High Contrast mode even further.
