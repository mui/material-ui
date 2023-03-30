# Densidade

<p class="description">Como aplicar densidade aos componentes de Material-UI.</p>

## Aplicando densidade

Esta seção explica como aplicar a densidade. Ela não cobre casos de uso potenciais ou considerações sobre o uso de densidade em seu aplicativo. The Material Design guidelines have a [comprehensive guide](https://m2.material.io/design/layout/applying-density.html) covering these topics in more detail.

## Implementando densidade

Uma densidade mais alta pode ser aplicada a alguns componentes via propriedades. As páginas de componentes têm pelo menos um exemplo usando o respectivo componente com densidade mais alta aplicada.

Dependendo do componente, a densidade é aplicada por meio de espaçamento menor ou simplesmente reduzindo o tamanho.

Os seguintes componentes possuem propriedades que aplicam maior densidade:

- [Button](/material-ui/api/button/)
- [Fab](/material-ui/api/fab/)
- [FilledInput](/material-ui/api/filled-input/)
- [FormControl](/material-ui/api/form-control/)
- [FormHelperText](/material-ui/api/form-helper-text/)
- [IconButton](/material-ui/api/icon-button/)
- [InputBase](/material-ui/api/input-base/)
- [InputLabel](/material-ui/api/input-label/)
- [ListItem](/material-ui/api/list-item/)
- [OutlinedInput](/material-ui/api/outlined-input/)
- [Table](/material-ui/api/table/)
- [TextField](/material-ui/api/text-field/)
- [Toolbar](/material-ui/api/toolbar/)

## Explore a densidade do tema

Esta ferramenta permite aplicar densidade via espaçamento e propriedades de componentes. Você pode navegar e ver como isso se aplica à sensação geral dos componentes do Material-UI.

Se você ativar alta densidade, um tema personalizado será aplicado a documentação. Este tema é apenas para fins de demonstração. Você _não deve_ aplicar este tema para todo o seu aplicativo, isso pode impactar negativamente a experiência do usuário. The [Material Design guidelines](https://m2.material.io/design/layout/applying-density.html) has examples for when not to apply density.

O tema é configurado com as seguintes opções:

```js
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        sizeSmall: {
          // Adjust spacing to reach minimal touch target hitbox
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
});
```

{{"demo": "DensityTool.js", "hideToolbar": true}}
