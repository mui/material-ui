---
title: Componente React Grade
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grade

<p class="description">O leiaute responsivo da grade do Material Design se adapta ao tamanho e orientação da tela, garantindo a consistência entre leiautes.</p>

Uma [grade](https://material.io/design/layout/responsive-layout-grid.html) cria consistência visual entre leiautes, enquanto permite flexibilidade em uma ampla variedade de projetos. A UI responsiva do Material Design é baseada em um leiaute de grade com 12 colunas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> O componente `Grid` não deve ser confundido com um data grid; ele está mais próximo de um layout grid. Para um cabeçalho do data grid para [o componente `DataGrid`](/components/data-grid/).

## Como funciona

O sistema de grade é implementado com o componente `Grid`:

- Ele usa [Box flexível CSS](https://www.w3.org/TR/css-flexbox-1/) para alta flexibilidade.
- Existem dois tipos de leiautes: *contêineres* e *itens*.
- Larguras de itens são definidas em porcentagens, então elas são sempre fluidas e dimensionadas em relação ao elemento pai.
- Itens têm preenchimento para criar o espaçamento entre itens individuais.
- Existem cinco pontos de quebra (breakpoints) na grade: xs, sm, md, lg e xl.
- Valores inteiros podem ser dados para cada ponto de quebra,  indicando quantas das 12 colunas disponíveis são ocupadas pelo componente quando a largura da área de exibição satisfaz as [restrições de ponto de quebra](/customization/breakpoints/#default-breakpoints).

Se você é **novo ou não está familiarizado com o flexbox**, nós recomendamos você a ler este [guia do Flexbox CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Espaçamento

A grade responsiva se concentra em larguras de espaçamento consistentes, em vez de largura de coluna. As margens e colunas do Material Design seguem uma grade de linha de base quadrada de **8px**. A propriedade de espaçamento é um inteiro entre 0 e 10. Por padrão, o espaçamento entre dois itens de grade segue uma função linear: `output(spacing) = spacing * 8px`, por exemplo, `spacing={2}` cria um espaçamento de 16px.

Esta função de transformação de saída pode ser customizada [usando o tema](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Grades fluídas

As grades fluídas usam colunas que dimensionam e redimensionam o conteúdo. O leiaute de uma grade fluída pode usar pontos de quebra para determinar se o leiaute precisa mudar drasticamente.

### Grade básica

A largura das colunas são valores inteiros entre 1 e 12; eles se aplicam em qualquer ponto de quebra e indicam a quantidade de colunas ocupadas pelo componente.

Um valor dado a um ponto de quebra, aplica-se a todos os outros pontos de quebra mais amplos do que ele (a menos que substituído, como você pode ler mais tarde nesta página). Por exemplo, `xs={12}` dimensiona o componente para ocupar toda a largura da área de exibição independente do seu tamanho.

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Grade com pontos de quebra

Algumas colunas têm várias larguras definidas, fazendo com que o leiaute seja alterado no ponto de interrupção definido. Os valores de largura dados para pontos de quebra maiores, substituem aqueles dados a pontos de quebra menores.

Por exemplo, `xs={12} sm={6}` dimensiona o componente para ocupar metade da área de exibição (6 colunas), quando a largura da área de exibição é de [600 ou mais pixels](/customization/breakpoints/#default-breakpoints). Para áreas de exibição menores, o componente preenche todas as 12 colunas disponíveis.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Leiaute Automático

O leiaute automático faz com que os *items* compartilhem equitativamente o espaço disponível. Isso também significa que você pode definir a largura de um *item* e os outros automaticamente se redimensionarão em torno dele.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grade Complexa

A demonstração a seguir não segue a especificação do Material Design, mas ilustra como a grade pode ser usada para criar leiautes complexos.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grade Aninhada

As propriedades `container` e `item` são boleanas e independentes. Elas podem ser combinados.

> Um **container** flex é a caixa gerada por um elemento com uma exibição definida por `flex` ou `inline-flex`. Os filhos em um fluxo de um container flex são chamados de flex **items** e são dispostos usando o modelo de leiaute flex (flex layout).

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

Para que o item permaneça dentro do contêiner, você precisa definir `min-width: 0`. Para que o item permaneça dentro do contêiner, você precisa definir `min-width: 0`.

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

As propriedades `xs`, `sm`, `md`, `lg`, e `xl`  **não são suportadas** com containers `direction="column"` e `direction="column-reverse"`.

Elas definem o número de grades que o componente usará para um determinado ponto de quebra. Elas destinam-se a controlar a **largura** usando `flex-basis` em contêineres `row`, mas elas irão impactar a altura em contêineres `column`. Se usadas, essas propriedades podem ter efeitos indesejáveis na altura dos elementos do item `Grid`.

## Leiaute de Grade CSS

Material-UI não fornece nenhuma funcionalidade CSS de Grade, mas como pode ser visto abaixo, você pode facilmente usar leiaute de Grade CSS em suas páginas.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}
