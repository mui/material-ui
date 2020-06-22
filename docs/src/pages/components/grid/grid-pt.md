---
title: Componente React para Grade
components: Grid
---

# Grade

<p class="description">O leiaute responsivo da grade do Material Design se adapta ao tamanho e orientação da tela, garantindo a consistência entre leiautes.</p>

Uma [grade](https://material.io/design/layout/responsive-layout-grid.html) cria consistência visual entre leiautes, enquanto permite flexibilidade em uma ampla variedade de projetos. A UI responsiva do Material Design é baseada em um leiaute de grade com 12 colunas.

## Como funciona

O sistema de grade é implementado com o componente `Grid`:

- Ele usa [Box flexível CSS](https://www.w3.org/TR/css-flexbox-1/) para alta flexibilidade.
- Existem dois tipos de leiautes: *contêineres* e *itens*.
- Larguras de itens são definidas em porcentagens, então elas são sempre fluidas e dimensionadas em relação ao elemento pai.
- Itens têm preenchimento para criar o espaçamento entre itens individuais.
- Existem cinco pontos de quebra (breakpoints) na grade: xs, sm, md, lg e xl.

Se você é **novo ou não está familiarizado com o flexbox**, nós recomendamos você a ler este [guia do Flexbox CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Espaçamento

A grade responsiva se concentra em larguras de espaçamento consistentes, em vez de largura de coluna. As margens e colunas do Material Design seguem uma grade de base quadrada de **8px**. A propriedade de espaçamento é um inteiro entre 0 e 10. Por padrão, o espaçamento entre dois itens de grade segue uma função linear: `output(spacing) = spacing * 8px`, por exemplo, `spacing={2}` cria um espaçamento de 16px.

Esta função de transformação de saída pode ser customizada [usando o tema](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Grades fluídas

As grades fluídas usam colunas que dimensionam e redimensionam o conteúdo. O leiaute de uma grade fluída pode usar pontos de quebra para determinar se o leiaute precisa mudar drasticamente.

### Grade básica

As larguras de coluna se aplicam a todos os pontos de quebra (por exemplo, `xs` e acima).

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Grade com pontos de quebra

Algumas colunas têm várias larguras definidas, fazendo com que o leiaute seja alterado no ponto de quebra definido.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Leiaute Automático

O leiaute automático faz com que os *itens* compartilhem equitativamente o espaço disponível. Isso também significa que você pode definir a largura de um *item* e os outros automaticamente se redimensionarão em torno dele.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grade Complexa

A demonstração a seguir não segue a especificação do Material Design, mas ilustra como a grade pode ser usada para criar leiautes complexos.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grade Aninhada

As propriedades `container` e `item` são boleanas e independentes. Elas podem ser combinados.

> Um **contêiner** flex é a caixa gerada por um elemento com uma exibição definida por `flex` ou `inline-flex`. Os filhos em um fluxo de um contêiner flex são chamados de **flex itens** e são dispostos usando o modelo de leiaute flex.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## Limitações

### Margem negativa

Há uma limitação com a margem negativa que usamos para implementar o espaçamento entre itens. Uma barra de rolagem horizontal irá aparecer se uma margem negativa vai além do `<body>`. Existem 3 soluções disponíveis:

1. Não usar o recurso de espaçamento e implementá-lo no espaço do usuário `spacing={0}` (Padrão).
2. Aplicando padding ao pai com pelo menos metade do valor de espaçamento aplicado ao filho:

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

3. Adicionando `overflow-x: hidden;` para o pai.

### white-space: nowrap;

A configuração inicial em itens flexíveis é `min-width: auto`. Isto causa um conflito de posicionamento quando os elementos filhos estão usando `white-space: nowrap`. Você pode enfrentar o problema com:

```jsx
<Grid item xs>
  <Typography noWrap>
```

Para que o item permaneça dentro do contêiner, você precisa definir `min-width: 0`. Na prática, você pode definir a propriedade `zeroMinWidth`:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

Embora o componente `Grid` tenha uma propriedade `direction` que permite valores de `row`, `row-reverse`, `column`, e `column-reverse`, existem algumas funcionalidades que não são suportadas dentro de contêineres `column` e `column-reverse`. As propriedades que definem o número de grades que o componente usará para um determinado ponto de quebra (`xs`, `sm`, `md`, `lg`, e `xl`) são focadas no controle da largura e **não** tem efeitos similares na altura dentro de contêineres `column` e `column-reverse`. Se usados dentro de contêineres `column` e `column-reverse`, estas propriedades apresentam efeitos indesejáveis na largura dos elementos do `Grid`.

## Leiaute de Grade CSS

Material-UI não fornece nenhuma funcionalidade CSS de Grade, mas como pode ser visto abaixo, você pode facilmente usar leiaute de Grade CSS em suas páginas.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}