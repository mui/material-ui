---
title: Componente React Tabelas
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tabelas

<p class="description">Tabelas exibem conjuntos de dados. Eles podem ser totalmente customizadas.</p>

[Tabelas de dados](https://material.io/design/components/data-tables.html) apresentam informações de uma forma fácil de verificar, de modo que os usuários podem procurar por padrões e percepções. Elas podem ser incorporadas no conteúdo principal, assim como Cartões.

Tabelas de dados podem incluir:

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

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Tabela Densa

Um exemplo simples de uma tabela densa sem frescuras.

{{"demo": "pages/components/tables/DenseTable.js"}}

## Classificando & Selecionando

Este exemplo demonstra o uso de linhas clicáveis e `Checkbox` para a seleção, com uma barra de ferramentas personalizada `Toolbar`. Ele usa o componente `TableSortLabel` para ajudar no estilo dos cabeçalhos das colunas.

A tabela recebeu uma largura fixa para demonstrar a rolagem horizontal. Para impedir que os controles de paginação rolem, o componente TablePagination é usado fora da tabela. (O [Exemplo 'da ação de paginação personalizada'](#custom-table-pagination-action) abaixo mostra a paginação dentro de TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js"}}

## Tabelas Customizadas

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Ação de paginação de tabela personalizada

A propriedade `Action` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Virtualized Table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

### material-table

![estrelas](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Outros

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.