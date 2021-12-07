# z-index

<p class="description">z-index é a propriedade CSS que ajuda a controlar o leiaute, fornecendo um terceiro eixo para organizar o conteúdo.</p>

Several MUI components utilize `z-index`, employing a default z-index scale in MUI that has been designed to properly layer drawers, modals, snackbars, tooltips, and more.

Os valores de `z-index` começam em um número arbitrário, alto e especifico o suficiente para idealmente evitar conflitos:

- assistente mobile: 1000
- acesso rápido: 1050
- barra de aplicativos: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- dica: 1500

Esses valores sempre podem ser customizados. Você os encontrará no tema sob a chave [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) do objeto de tema. Customização de valores individuais não é recomendada; se você deve mudar um, você provavelmente precisará mudar todos eles.
