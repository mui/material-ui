# TypeScript

### テーマのカスタマイズ

デフォルトのテーマタイプを拡張して、`makeStyles` 、`useTheme` 、または`styled` を使用するたびにテーマタイプを設定する必要がないようにすることができます。

```typescript
declare module '@mui/material/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```
