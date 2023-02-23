---
product: material-ui
title: Componente React para Botão
components: Button, IconButton, ButtonBase, LoadingButton
materialDesign: https://m2.material.io/components/buttons
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base/react-button/
---

# Button

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://m2.material.io/components/buttons) comunicam ações que os usuários podem realizar. Eles são normalmente colocados em toda a interface do usuário, em lugares como:

- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Button

O `Botão` vem com três variantes: texto (padrão), contido e delineado.

{{"demo": "BasicButtons.js"}}

### Botões de texto

[Botões de texto](https://m2.material.io/components/buttons#text-button) normalmente são usados ​​para ações menos pronunciadas, incluindo aquelas localizadas: em caixas de diálogo, em cartões. Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "TextButtons.js"}}

### Botões contidos

[Botões Contidos](https://m2.material.io/components/buttons#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

{{"demo": "ContainedButtons.js"}}

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "DisableElevation.js"}}

### Botões delineados

[Outlined buttons](https://m2.material.io/components/buttons#outlined-button) are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "OutlinedButtons.js"}}

## Manipulando cliques

Todos os componentes aceitam um método manipulador `onClick` que é aplicado ao elemento DOM raiz.

```jsx
<Button
  onClick={() => {
    alert('clicado');
  }}
>
  Clique aqui
</Button>
```

Note that the documentation [avoids](/material-ui/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Cor

{{"demo": "ColorButtons.js"}}

Além de usar as cores de botão padrão, você pode adicionar outras personalizadas ou desativar as que não forem necessárias. See the [Adding new colors](/material-ui/customization/palette/#adding-new-colors) example for more info.

## Tamanhos

For larger or smaller buttons, use the `size` prop.

{{"demo": "ButtonSizes.js"}}

## Botão de upload

{{"demo": "UploadButtons.js"}}

## Botões com ícones e rótulo

Às vezes você pode querer ter ícones para certos botões para aprimorar a experiência do usuário, pois reconhecem logotipos mais facilmente do que texto. Por exemplo, se você tem um botão com a ação de "deletar", você pode rotulá-lo com o ícone de lata de lixo.

{{"demo": "IconLabelButtons.js"}}

## Botão de ícone

Botões de ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequados para botões de alternância que permitem uma escolha única para ser selecionado ou desmarcado, como adicionar ou remover uma estrela para um item.

{{"demo": "IconButtons.js"}}

### Tamanhos

Para botões maiores ou menores, use a prop `size`

{{"demo": "IconButtonSizes.js"}}

### Cores

Use a propriedade `color` para aplicar uma paleta de cores ao componente.

{{"demo": "IconButtonColors.js"}}

## Botões customizados

Aqui estão alguns exemplos de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/button/).

## Botão de carregamento

Os botões de carregamento podem mostrar estado de carregamento e desativar as interações.

{{"demo": "LoadingButtons.js"}}

Alterne o interruptor de carregamento para ver a transição entre os diferentes estados.

{{"demo": "LoadingButtonsTransition.js"}}

## Botão complexo

Os botões de texto, botões contidos, botões de ação flutuante e botões de ícone são construídos com base no mesmo componente: O componente `ButtonBase`. Você pode usar esse componente para construir interações diferentes.

{{"demo": "ButtonBase.js"}}

## Biblioteca de roteamento de terceiros

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. Here is a [more detailed guide](/material-ui/guides/routing/#button).

## Limitações

### Propriedade CSS Cursor not-allowed

O componente ButtonBase define `pointer-events: none;` ao desabilitar os botões, o que previne que o cursor desabilitado seja exibido.

Se você deseja usar `not-allowed`, você tem duas opções:

1. **Apenas com CSS**. You can remove the pointer-events style on the disabled state of the `<button>` element:

```css
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Então:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/material-ui/react-tooltip/#disabled-elements).
- O cursor não irá mudar se você renderizar algum outro elemento que não seja um botão, por exemplo, um elemento link `<a>`.

2. **Alteração no DOM**. Você pode encapsular o botão:

```jsx
<span style={{ cursor: 'not-allowed' }}>
  <Button component={Link} disabled>
    disabled
  </Button>
</span>
```

Isso tem a vantagem de suportar qualquer elemento, por exemplo, um elemento de link `<a>`.
