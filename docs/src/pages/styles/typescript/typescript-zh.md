# TypeScript

### 自定义 `主题`

You can augment the default theme type to avoid having to set the theme type every time you use `makeStyles`, `useTheme`, or `styled`.

```typescript
declare module '@material-ui/core/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```