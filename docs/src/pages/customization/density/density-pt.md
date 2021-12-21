# Densidade

<p class="description">How to apply density to MUI components.</p>

## Aplicando densidade

Esta seção explica como aplicar a densidade. Ela não cobre casos de uso potenciais ou considerações sobre o uso de densidade em seu aplicativo. As diretrizes de Material design tem um [abrangente guia](https://material.io/design/layout/applying-density.html#typographic-density) cobrindo estes tópicos com mais detalhes.

## Implementando densidade

Uma densidade mais alta pode ser aplicada a alguns componentes via propriedades. As páginas de componentes têm pelo menos um exemplo usando o respectivo componente com densidade mais alta aplicada.

Dependendo do componente, a densidade é aplicada por meio de espaçamento menor ou simplesmente reduzindo o tamanho.

Os seguintes componentes possuem propriedades que aplicam maior densidade:

- [Button](/api/button/)
- [Fab](/api/fab/)
- [FilledInput](/api/filled-input/)
- [FormControl](/api/form-control/)
- [FormHelperText](/api/form-helper-text/)
- [IconButton](/api/icon-button/)
- [InputBase](/api/input-base/)
- [InputLabel](/api/input-label/)
- [ListItem](/api/list-item/)
- [OutlinedInput](/api/outlined-input/)
- [Table](/api/table/)
- [TextField](/api/text-field/)
- [Toolbar](/api/toolbar/)

## Explore a densidade do tema

Esta ferramenta permite aplicar densidade via espaçamento e propriedades de componentes. You can browse around and see how this applies to the overall feel of MUI components.

Se você ativar alta densidade, um tema personalizado será aplicado a documentação. Este tema é apenas para fins de demonstração. Você *não deve* aplicar este tema para todo o seu aplicativo, isso pode impactar negativamente a experiência do usuário. As [diretrizes de Material design](https://material.io/design/layout/applying-density.html#typographic-density) tem exemplos para quando não aplicar densidade.

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

{{"demo": "pages/customization/density/DensityTool.js", "hideToolbar": true}}
