# z-index

<p class="description">z-index é a propriedade CSS que ajuda a controlar o leiaute, fornecendo um terceiro eixo para organizar o conteúdo.</p>

Vários componentes do Material-UI utiliza `z-index`, empregando uma escala z-index padrão em Material-UI, que foi projetada para adequar layer drawers, modals, snackbars, tooltips(dicas), e muito mais.

[Estes valores](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js) começam em um número arbitrário, alto e específico, o suficiente para idealmente evitar conflitos.

- mobile stepper: 1000
- barras de aplicativos: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- dicas: 1500

Esses valores sempre podem ser customizados. Você os encontrará no tema sob a chave [`zIndex`](/customization/default-theme/?expend-path=$.zIndex) do componente theme. Customização de valores individuais não é recomendada; você deve mudar um, você provavelmente precisará mudar todos eles.