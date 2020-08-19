# Densidade

<p class="description">Como aplicar densidade aos componentes de Material-UI.</p>

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

Esta ferramenta permite aplicar densidade via espaçamento e propriedades de componentes. Você pode navegar e ver como isso se aplica à sensação geral dos componentes do Material-UI.

Se você ativar alta densidade, um tema personalizado será aplicado a documentação. Este tema é apenas para fins de demonstração. Você *não deve* aplicar este tema para todo o seu aplicativo, isso pode impactar negativamente a experiência do usuário. As [diretrizes de Material design](https://material.io/design/layout/applying-density.html#typographic-density) tem exemplos para quando não aplicar densidade.

O tema é configurado com as seguintes opções:

```js
const theme = createMuiTheme({
  components: {
    MuiButton: {
      props: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      props: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      props: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      props: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      props: {
        size: 'small',
      },
      overrides: {
        sizeSmall: {
          // Adjust spacing to reach minimal touch target hitbox
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
    MuiInputBase: {
      props: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      props: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      props: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      props: {
        margin: 'dense',
      },
    },
    MuiFab: {
      props: {
        size: 'small',
      },
    },
    MuiTable: {
      props: {
        size: 'small',
      },
    },
    MuiTextField: {
      props: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      props: {
        variant: 'dense',
      },
    },
  },
});
```

{{"demo": "pages/customization/density/DensityTool.js", "hideToolbar": true}}