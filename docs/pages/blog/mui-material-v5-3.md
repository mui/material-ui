---
title: Material v5.3 — Theming upgrade
description: We are excited to announce the callback support for global theme overrides!
date: 2022-01-18T00:00:00.000Z
authors: ['siriwatknp']
tags: ['News']
card: false
---

## TL;DR

- `styleOverrides` supports callback as a value that allows dynamic style based on props:

  ```jsx
  <ThemeProvider
    theme={createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              ...ownerState.variant === outlined && {
                borderWidth: '2px',
                borderRadius: theme.shape.borderRadius,
              },
            }),
          },
        }
      }
    })}
  />
  ```

- The callback also works with the [experimental `sx`](/system/styled/#how-can-i-use-the-sx-syntax-with-the-styled-utility) function:

  ```jsx
  import { ThemeProvider, createTheme, experimental_sx as sx } from '@mui/material/styles';

  <ThemeProvider
    theme={createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            startIcon: sx({
              // shorthand for margin-right
              mr: { xs: '4px', sm: '6px', md: '8px' }
            }),
            endIcon: sx({
              // shorthand for margin-left
              ml: { xs: '4px', sm: '6px', md: '8px' }
            }),
          },
        }
      }
    })}
  />
  ```

- [Variant theming](/customization/theme-components/#adding-new-component-variants) is deprecated. (We will provide a codemod for migrating it).

## The problems

In v4, the style engine library was JSS which has some limitations. Style overrides were not able to support dynamic props via a callback so we relied on using classes. Take a look at [`Chip` classes](https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/Chip/chipClasses.ts) for example, there are more than 20 classes that are incomplete if we count the permutation of elements (`root | avatar | icon | label | deleteIcon`), size (`small | medium | large`), and color (`primary | secondary | ...`). This leads to a bad theming experience because developers need to know the specific key in order to customize.

It would be better if developers can read the props and create a custom style without knowing what key they should use.

Luckily, it is now possible in v5 to do that because of the new style engine powered by emotion. Theming is simpler and more flexible. You only need to know the component's slot name and then provide an object for static overrides or a callback for dynamic style.

## Using callback in `styleOverrides`

The callback gives you the `props` that the slot received. Most of the time, you would use:

- `props.ownerState`: the combination of runtime props and internal states.
- `props.theme`: the theme you provide to `<ThemeProvider theme={yourTheme}>` or the default theme.

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

<ThemeProvider
  theme={createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          // you can now use the theme without creating the initial theme!
          root: ({ ownerState, theme }) => ({
            padding: {
              small: '8px 4px',
              medium: '12px 6px',
              large: '16px 8px',
            }[ownerState.size],
            ...ownerState.variant === 'outlined' && {
              borderWidth: '2px',
              ...ownerState.variant === 'primary' && {
                borderColor: theme.palette.primary.light,
              },
            },
          }),
          label: {
            padding: 0,
          }
        },
      }
    }
  })}
>
  ...your app
</ThemeProvider>
```

> 💡 The side benefit of using a callback is that you can use the theme without creating the outer scoped variable.

### Typescript

The callback is typed-safe. `ownerState` is the `ComponentProps` interface and `theme` is `Theme` interface.

```tsx
{
  MuiChip: {
    styleOverrides: {
      // ownerState: ChipProps
      // theme: Theme
      root: ({ ownerState, theme }) => ({...}),
    },
  }
}
```

If you extend the `ComponentProps` or [`Theme`](/customization/theming/#custom-variables) via module augmentation, you will be able to see them inside the callback 🎉.

## Experimental `sx` function

Initially, `sx` is designed to be a prop that you can inject style with shorthand notation to the component created by `styled` API:

```jsx
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Label = styled('span')({
  fontWeight: 'bold',
  fontSize: '0.875rem',
})

<Box sx={{ display: 'flex' }}>
  <Label sx={{ color: 'text.secondary' }}>Label</Label>
</Box>;
```

> 💡 All MUI components are created by `styled` API, so they accept `sx` prop by default.

`sx` helps developers write less code and be more productive once they are familiar with the API. With the callback support in `styleOverrides`, it is now possible to use `sx` like syntax at the global theme overrides.

All you need to do is using the [`experimental_sx`](/system/styled/#how-can-i-use-the-sx-syntax-with-the-styled-utility) function: 

```jsx
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from '@mui/material/styles';

<ThemeProvider
  theme={createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: sx({
            px: 1.5, // shorthand for padding-left & right
            py: 0.75, // shorthand for padding-top & bottom
            fontWeight: 500,
            borderRadius: 2,
          }),
          label: {
            padding: 0,
          }
        },
      }
    }
  })}
>
  ...your app
</ThemeProvider>
```

If you want to create a dynamic style based on props, you can return an array from the callback:

```js
{
  root: ({ ownerState }) => [
    sx({
      px: 1.5,
      py: 0.75,
      fontWeight: 500,
      borderRadius: 2,
    }),
    ownerState.variant === 'outlined' && ownerState.color === 'default' &&
      sx({
        borderColor: 'text.secondary',
      }),
    ownerState.size === 'small' && 
      sx({
        fontSize: { xs: '0.875rem', sm: '0.75rem' },
      })
  ],
  // ...other keys
}
```

🎉🎉🎉 That's it for today! Happy styling 💅.

I hope this small update makes your customization experience better than before. Don't forget to share this update with your friends and/or colleagues.

To get more updates in the future, subscribe to our newsletter at the bottom of this page.

## Read more

- [Component theming](/customization/theme-components/)
- [All supported shorthands in `sx`](/system/the-sx-prop/#theme-aware-properties)
- [`sx` performance tradeoff](/system/basics/#performance-tradeoff)
- [`sx` with `styled`](/system/styled/#difference-with-the-sx-prop)


