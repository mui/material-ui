---
title: Componente React Tabelas
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (tabela)

<p class="description">Tables display sets of data. Eles podem ser totalmente customizadas.</p>

[Tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. Elas podem ser incorporadas no conteúdo principal, assim como Cartões.

Tables can include:

- Uma visualização correspondente
- Navegação
- Ferramentas para consultar e manipular dados

Ao incluir ferramentas, elas devem ser colocadas diretamente acima ou abaixo da tabela.

## Estrutura

Uma tabela de dados contém uma linha de cabeçalho no topo que lista os nomes das colunas, seguidas pelas linhas dos dados.

Caixas de seleção devem acompanhar cada linha se o usuário precisar selecionar ou manipular dados.

Para acessibilidade, a primeira coluna é ajustada para ser um elemento `<th>`, com um `escopo` de `"linha"`. Isso permite que os leitores de tela identifiquem o valor de uma célula por seu nome de linha e coluna.

## Tabela Simples

Um exemplo simples sem frescuras.

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## Tabela Densa

Um exemplo simples de uma tabela densa sem frescuras.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Classificando & Selecionando

Este exemplo demonstra o uso de linhas clicáveis e `Checkbox` para a seleção, com uma barra de ferramentas personalizada `Toolbar`. Ele usa o componente `TableSortLabel` para ajudar no estilo dos cabeçalhos das colunas.

A tabela recebeu uma largura fixa para demonstrar a rolagem horizontal. Para impedir que os controles de paginação rolem, o componente TablePagination é usado fora da tabela. (O [Exemplo 'da ação de paginação personalizada'](#custom-table-pagination-action) abaixo mostra a paginação dentro de TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tabelas Customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Custom pagination actions

A propriedade `Action` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Cabeçalho fixo

Um exemplo de uma tabela com linhas roláveis e cabeçalhos de coluna fixos. Ele aproveita do suporte de `stickyHeader` (⚠️ sem suporte ao IE 11).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Tabela de abrangência

Um exemplo simples com abrangência de linhas & colunas.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Tabela Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) com o componente `Table`. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

### material-table

![estrelas](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) é uma tabela de dados simples e poderosa para React baseado na tabela do Material-UI com alguns recursos adicionais. Eles suportam muitos formas de utilização (edição, filtragem, agrupamento, ordenação, seleção, i18n, árvore de dados e muito mais). Você deveria dar uma olhada.

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### Outros

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) Uma grade de dados para Material-UI com paginação, ordenação, filtragem, agrupamento e funções de edição.([Com licenciamento de uso pago](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Tabelas de dados responsivas para Material-UI com filtro, ordenação, pesquisa e muito mais.
- [tubular-react](https://github.com/unosquare/tubular-react): Uma tabela de Material-UI com fonte de dados local ou remota. Com filtragem, classificação, pesquisa de texto livre, exportação para CSV localmente e agregações.

## Acessibilidade

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}