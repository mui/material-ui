---
title: Componente React Tabela
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tabela

<p class="description">Tabelas exibem conjuntos de dados. Elas podem ser totalmente customizadas.</p>

[Tabelas](https://material.io/design/components/data-tables.html) apresentam informações de uma forma fácil de visualizar, de modo que os usuários podem procurar por padrões e percepções. Elas podem ser incorporadas no conteúdo principal, assim como cartões.

As tabelas podem incluir:

- Uma visualização correspondente
- Navegação
- Ferramentas para consultar e manipular dados

Ao incluir ferramentas, elas devem ser colocadas diretamente acima ou abaixo da tabela.

## Estrutura

Um exemplo simples sem frescuras.

Uma tabela de dados contém uma linha de cabeçalho no topo que lista os nomes das colunas, seguidas pelas linhas dos dados.

## Tabela de dados

O componente `Table` tem um mapeamento próximo dos elementos nativos de `<table>`. Este requisito torna a construção de tabelas de dados ricas e desafiadora.

O [componente `DataGrid`](/components/data-grid/) é projetado para situações de uso que focam em torno da manipulação de uma grande quantidade de dados tabulares. Enquanto vem com uma estrutura mais rígida, em troca, você ganha recursos poderosos.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Tabela Simples

Um exemplo simples de uma tabela densa sem muito enfeite.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Tabela Densa

Este exemplo demonstra o uso de linhas clicáveis com `Checkbox` para a seleção, e com um componente `Toolbar` customizado. Ele usa o componente `TableSortLabel` para ajudar no estilo dos cabeçalhos das colunas.

A tabela recebeu uma largura fixa para demonstrar a rolagem horizontal. Para impedir que os controles de paginação rolem, o componente TablePagination é usado fora da tabela. (O [Exemplo da 'ação de paginação customizada'](#custom-pagination-actions) abaixo mostra a paginação dentro de um TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tabelas Customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Opções de paginação customizada

É possível customizar as opções mostradas na seleção "Rows per page" usando a propriedade `rowsPerPageOptions`. Você deve fornecer um array de:

- **numbers**, cada número será usado para o rótulo e valor da opção.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, as chaves `value` e `label` serão utilizadas respectivamente para exibição do rótulo e valor da opção (útil para strings de idioma como 'Todos').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Ações de paginação customizada

A propriedade `ActionsComponent` do componente `TablePagination` permite a implementação de ações customizadas.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Cabeçalho fixo

Um exemplo de uma tabela com linhas roláveis e cabeçalhos de coluna fixos. Ele se beneficia do suporte de `stickyHeader` (⚠️ sem suporte ao IE 11).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Tabela minimizável

Um exemplo de uma tabela com linhas expansíveis, revelando mais informações. Ela utiliza o componente [`Collapse`](/api/collapse/).

{{"demo": "pages/components/tables/CollapsibleTable.js", "bg": true}}

## Abrangendo Tabela

Um exemplo simples com abrangência de linhas & colunas.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Tabela Virtualizada

No exemplo a seguir, nós demonstramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) com o componente `Table`. Ela renderiza 200 linhas e pode facilmente lidar com mais. A virtualização ajuda a lidar com problemas de desempenho.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Acessibilidade

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

Um caption funciona como um título para uma tabela. A maioria dos leitores de tela anunciam o conteúdo dos captions. Os captions ajudam os usuários a encontrar uma tabela e a entender o que ela representa e decidir se querem lê-la.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}