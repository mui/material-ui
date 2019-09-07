# TypeScript

### Anpassung des `Theme`

You can augment the default theme type to avoid having to set the theme type every time you use `makeStyles`, `useTheme`, or `styled`.

```typescript
declare module '@material-ui/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```