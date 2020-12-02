---
title: Componente React para Botão
components: Button, IconButton, ButtonBase
---

# Botão

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem realizar. Eles são normalmente colocados em toda a interface do usuário, em lugares como:

- Caixa de diálogo
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

## Botões Contidos

[Botões Contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Botões de Texto

[Botões de texto](https://material.io/design/components/buttons.html#text-button) são utilizados tipicamente para ações menos significativas, incluindo aquelas localizadas em:

- Caixas de diálogo
- Cartões

Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botões Delineados

[Botões delineados](https://material.io/design/components/buttons.html#outlined-button) são botões com ênfase média. Eles contém ações que são importantes, mas não são as ações primárias de um aplicativo.

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Manipulando cliques

Todos os componentes aceitam um método manipulador `onClick` que é aplicado ao elemento DOM raiz.

```jsx
<Button onClick={() => { alert('clicado') }}>Clique aqui</Button>
```

Note que a documentação [evita](/guides/api/#native-properties) mencionar as propriedades nativas (existem várias) na seção de API dos componentes.

## Botão de upload

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botões com ícones e rótulo

Às vezes você pode querer ter ícones para determinado botão para melhorar o UX do aplicativo, reconhecemos logotipos mais facilmente do que o texto puro. Por exemplo, se você tem um botão com a ação de "deletar", você pode rotulá-lo com o ícone de lata de lixo.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Botões de Ícone

Botões de ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequados para botões de alternância que permitem uma escolha única para ser selecionado ou desmarcado, como adicionar ou remover uma estrela para um item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Botões customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/button).

## Botões complexos

Os botões de texto, botões contidos, botões de ação flutuante e botões de ícone são construídos com base no mesmo componente: O componente `ButtonBase`. Você pode tirar vantagem deste componente de nível mais abstrato para construir interações customizadas.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Biblioteca de roteamento de terceiros

Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. O componente `ButtonBase` fornece uma propriedade para lidar com este caso de uso: `component`. No entanto, para alguns polyfills de foco, `ButtonBase` requer o nó DOM do componente fornecido. Isso é obtido anexando-se uma referência ao componente e esperando que o componente envie essa referência para o nó DOM subjacente. Dado que muitos dos componentes interativos dependem do `ButtonBase`, você deve ser capaz de tirar proveito em todos os lugares.

Aqui está um [exemplo de integração com react-router](/guides/composition/#button).

## Limitações

### Propriedade CSS Cursor not-allowed

O componente ButtonBase define `pointer-events: none;` ao desabilitar os botões, o que previne que o cursor desabilitado seja exibido.

Se você deseja usar `not-allowed`, você tem duas opções:

1. **Apenas com CSS**. Você pode modificar os estilos aplicados no seletor de estado disabled do elemento `<button>`:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

Então:

- Você deve adicionar `pointer-events: none;` de volta quando você precisar exibir [dicas em elementos desabilitados](/components/tooltips/#disabled-elements).
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