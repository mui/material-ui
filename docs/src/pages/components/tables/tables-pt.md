---
title: Componente React Tabelas
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tabelas

<p class="description">Tabelas de dados exibem um conjuntos de dados. Eles podem ser totalmente personalizados.</p>

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

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de substituições](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Ação de paginação de tabela personalizada

A propriedade `Action` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Tabela de abrangência

Um exemplo simples com abrangência de linhas & colunas.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Tabela Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) com o componente `Table`. São renderizadas 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Projetos Complementares

Para casos de uso mais avançados, você pode tirar proveito de:

### material-table

![estrelas](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) é uma tabela de dados simples e poderosa para React baseado na tabela do Material-UI com alguns recursos adicionais. Eles suportam muitos formas de utilização (edição, filtragem, agrupamento, ordenação, seleção, i18n, árvore de dados e muito mais). Você deveria dar uma olhada.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Outros

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) Uma grade de dados para Material-UI com paginação, ordenação, filtragem, agrupamento e funções de edição ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Tabelas de dados responsivas para Material-UI com filtro, ordenação, pesquisa e muito mais.