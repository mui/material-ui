# z-index

<p class="description">z-index é a propriedade CSS que ajuda a controlar o leiaute, fornecendo um terceiro eixo para organizar o conteúdo.</p>

Vários componentes do Material-UI utiliza `z-index`, empregando uma escala z-index padrão em Material-UI, que foi projetada para adequar layer drawers, modals, snackbars, tooltips(dicas), e muito mais.

[Estes valores](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/zIndex.js) começam em um número arbitrário, alto e específico, o suficiente para idealmente evitar conflitos.

- mobile stepper: 1000
- speed dial: 1050
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

Esses valores sempre podem ser customizados. You will find them in the theme under the [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) key of the theme. Customização de valores individuais não é recomendada; você deve mudar um, você provavelmente precisará mudar todos eles.