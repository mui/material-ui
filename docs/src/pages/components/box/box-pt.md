---
title: Componente React Box
---

# Box

<p class="description">O componente Box serve como um componente wrapper (invólucro) para a maioria das necessidades de uso com CSS.</p>

O componente Box empacota [ todas as funções de estilo](/system/basics/#all-inclusive) que estão expostas em `@material-ui/system</ code>.
Ele é criado usando a função <a href="/styles/api/#styled-style-function-component"> <code>styled()`</a> de `@material-ui/styles `.

## Exemplo

[A paleta](/system/palette/) de funções de estilo.

## Sobrescrevendo componentes do Material-UI

O componente Box envolve seu componente. Ele cria um novo elemento DOM, uma `<div>` por padrão que pode ser modificada através da propriedade `component`. Digamos que você queira usar um `<span>`:

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

Isso funciona muito bem quando as alterações precisam ser isoladas em um novo elemento DOM. Por exemplo, a você pode alterar as margens da mesma maneira.

No entanto, às vezes, você precisa modificar o elemento DOM subjacente. Por exemplo, você deseja alterar a cor do texto do botão. O componente `Button` define sua própria cor. A herança por CSS não nos ajuda nesse caso. Para contornar o problema, você tem duas opções:

1. Usar [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

O componente Box tem uma propriedade `clone` para permitir o uso do método de clonar elemento do React.

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

1. Use propriedades de renderização

Os elementos filhos de Box aceitam uma função de renderização de propriedades. Você pode então extrair o `className`.

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠️ A especificidade do CSS depende da ordem de importação. Se você quer garantir que o estilo do componente encapsulado seja substituído, você precisa importar o Box por ultimo.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Nome                                                    | Tipo                                                                                                              | Padrão                                  | Descrição                                                                                            |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | Função de renderização do Box ou nó.                                                                 |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | Se `true`, o box irá recriar seu elemento DOM filho. Ele irá usar `React.cloneElement` internamente. |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | O componente usado como nó raiz. Ou uma string para usar um elemento DOM ou componente.              |

Quaisquer outras propriedades fornecidas serão usadas por [funções de estilos](/system/basics/#all-inclusive) ou propagadas para o elemento raiz.