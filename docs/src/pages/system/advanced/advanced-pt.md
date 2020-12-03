# Avançado

<p class="description">Aqui você pode encontrar exemplos de como você pode usar o sistema em seus componentes customizados.</p>

## Adicionando a propriedade `sx` para seus componentes customizados

O utilitário `unstable_styleFunctionSx` adiciona suporte para a propriedade `sx` em seus componentes. Normalmente você usaria os componentes `Box` de `@material-ui/core` como raiz da árvore de componentes. Se você quiser usar o sistema sem depender do Material-UI, este utilitário lhe dará as mesmas capacidades, enquanto tem um tamanho menor de pacote.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## Usando utilitários de sistema autônomo

Se você precisar apenas de alguns elementos do sistema em seus componentes customizados, você pode usar diretamente e combinar as diferentes funções de estilo disponíveis, e acessá-las como propriedades de componente. Você pode usar esta abordagem se você precisar de um tamanho menor de pacote e melhor desempenho do que o uso de Box, pelo preço de usar um suporte de subconjunto `sx` e uma API diferente.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
