---
product: material-ui
title: React Box
components: Box
githubLabel: 'component: Box'
---

# Box

<p class="description">O componente Box serve como um componente encapsulador (wrapper) para a auxiliar na maioria das necessidades de uso com CSS.</p>

O componente Box compõe [[todas as funções de estilo](/system/basics/#all-inclusive)](/system/properties/) que são expostas no `@material-ui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Exemplo

[A paleta](/system/palette/) com funções de estilo.

## A propriedade `sx`

Todas as propriedades do sistema estão disponíveis através do [prop `sx` ](/system/getting-started/the-sx-prop/). Além disso, o prop `sx` permite você especificar quaisquer outras regras CSS que precisar. Aqui está um exemplo de como usá-la:

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

## Sobrescrevendo componentes do Material-UI

O componente Box envolve o seu componente. Ele cria um elemento DOM, uma `<div>`  que pode ser modificada através da propriedade `component`. Digamos que você queira usar um `<span>`:

{{"demo": "BoxComponent.js", "defaultCodeOpen": true }}

Isso funciona muito bem quando as alterações precisam ser isoladas em um novo elemento DOM. Note no exemplo, a forma que você alterou a margem.

No entanto, às vezes, você precisa modificar o elemento DOM subjacente. Como um exemplo, talvez queira mudar a borda do Button. O componente Button define seus próprios estilos. A herança por CSS não irá ajudar nesse caso. Para contornar o problema, você pode usar o prop [`sx`](/system/getting-started/the-sx-prop/) diretamente no filho, se o mesmo for um componente MUI.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Salvar</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Salvar</Button>
```

Para componentes não-MUI, use a propriedade de ` component`.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Salvar</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Salvar</Box>
```

## Propriedades do sistema

Como um componente util do CSS, o `Box` também suporta todas as propriedades de [`system`](/system/properties/). Você pode usá-los como propriedades diretamente no componente. Por exemplo, uma margem do topo:

```jsx
<Box mt={2}>
```
