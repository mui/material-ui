# TypeScript

### Personalización de `Tema`

Puedes aumentar el tipo de tema predeterminado para evitar tener que configurar el tipo de tema cada vez que utilices `makeStyles`, `useTheme`, o `styled`.

```typescript
declare module '@material-ui/core/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```