# TypeScript

### Customization of `Theme`

Puedes aumentar el tipo de tema predeterminado para evitar tener que configurar el tipo de tema cada vez que utilices `makeStyles`, `useTheme`, o `styled`.

```typescript
declare module '@mui/material/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```
