# TypeScript

## 定制的`主题`

您可以扩展默认的主题类型，这样每次使用 `makeStyles`， `useTheme`，或 `styled` 时，可以避免设置主题类型。

```ts
declare module '@mui/core/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```
