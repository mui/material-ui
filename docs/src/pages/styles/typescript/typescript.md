# TypeScript

## Customization of `Theme`

You can augment the default theme type to avoid having to set the theme type every time you use `makeStyles`, `useTheme`, or `styled`.

```ts
declare module '@mui/material/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```
