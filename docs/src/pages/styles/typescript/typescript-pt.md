# TypeScript

### Customização de tema

Você pode sobrecarregar a definição do tema padrão para evitar de ter que redefinir a cada vez que você for usar `makeStyles`, `useTheme`, ou `styled`.

```typescript
declare module '@material-ui/core/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}
```