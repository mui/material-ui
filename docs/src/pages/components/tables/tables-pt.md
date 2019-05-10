---
title: Componente React Table
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tables (Tabelas)

<p class="description">Tabelas de dados exibem conjuntos de dados. Eles podem ser totalmente personalizados.</p>

[Tabelas de Dados](https://material.io/design/components/data-tables.html) apresentar as informações de uma forma fácil de verificar, de modo que os usuários podem procurar por padrões e insights. Elas podem ser incorporadas no conteúdo principal, como Cards.

Tabelas de dados podem incluir:

- Uma visualização correspondente
- Navegação
- Ferramentas para consultar e manipular dados

Ao incluir ferramentas, elas devem ser colocadas diretamente acima ou abaixo da tabela.

## Estrutura

Uma tabela de dados contém uma linha de cabeçalho no topo que lista os nomes das colunas, seguidas pelas linhas dos dados.

Caixas de seleção devem acompanhar cada linha se o usuário precisar selecionar ou manipular dados.

Para acessibilidade, a primeira coluna é ajustada para ser um `<th>` elemento, com um `âmbito` de `"linha"`. Isso permite que os leitores de tela identifiquem o valor de uma célula por seu nome de linha e coluna.

## Tabela Simples

Um exemplo simples sem frescuras.

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Dense Table

A simple example of a dense table with no frills.

{{"demo": "pages/components/tables/DenseTable.js"}}

## Classificando & Selecionando

Este exemplo demonstra o uso de linhas clicáveis e `Checkbox` para a seleção, com uma barra de ferramentas personalizada ``. Ele usa o componente `TableSortLabel` para ajudar no estilo dos cabeçalhos das colunas.

A tabela recebeu uma largura fixa para demonstrar a rolagem horizontal. Para impedir que os controles de paginação rolem, o componente TablePagination é usado fora da tabela. (O [Exemplo 'da ação de paginação personalizada'](#custom-table-pagination-action) abaixo mostra a paginação dentro de TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js"}}

## Customized tables

Aqui está um exemplo de personalização do componente. Você pode aprender mais sobre isso na [página de documentação de substituições](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Ação de paginação de tabela personalizada

A propriedade `Action` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Tabela de abrangência

Um exemplo simples com abrangência de linhas & colunas.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Tabela Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) com o componente `Table`. São renderizadas 200 linhas e pode facilmente lidar com mais. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Projetos Complementares

Para caso de usos mais avançados, você é capaz de aproveitar de:

### material-table

![estrelas](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Other

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) Uma grade de dados para Material-UI com paginação, ordenação, filtragem, agrupamento and funções de edição ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Tabelas de dados responsivos para Material-UI com filtro, ordenação, pesquisa e muito mais.