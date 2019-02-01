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

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Classificando & Selecionando

Este exemplo demonstra o uso de linhas clicáveis e `Checkbox` para a seleção, com uma barra de ferramentas personalizada ``. Ele usa o componente `TableSortLabel` para ajudar no estilo dos cabeçalhos das colunas.

A tabela recebeu uma largura fixa para demonstrar a rolagem horizontal. Para impedir que os controles de paginação rolem, o componente TablePagination é usado fora da tabela. (O [Exemplo 'da ação de paginação personalizada'](#custom-table-pagination-action) abaixo mostra a paginação dentro de TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Tabelas Customizadas

Se você já leu a página de [documentação de sobreposição (Overrides)](/customization/overrides/) mas não se sente confiante em como utilizar, seguem alguns exemplos em como você pode mudar a aparência de uma `TableCell`.

⚠️ Embora a especificação do design do material incentive o tema, este exemplo está fora do caminho comum.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Ação de paginação de tabela personalizada

A propriedade `Action` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Tabela de abrangência

Um exemplo simples com abrangência de linhas & colunas.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Tabela Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) com o componente `Table`. São renderizadas 200 linhas e pode facilmente lidar com mais.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Projetos Complementares

For more advanced use cases you might be able to take advantage of:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Tabelas de dados responsivos para Material-UI com filtro, ordenação, pesquisa e muito mais.
- [material-table](https://github.com/mbrn/material-table) DataTable baseado no componente table com recursos adicionais como: pesquisa, filtro, ordenação e muito mais.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Tabela Material-UI Virtualizada.