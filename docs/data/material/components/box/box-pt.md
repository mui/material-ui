---
product: material-ui
title: React Box
components: Box
githubLabel: 'component: Box'
---

# Box

<p class="description">O componente Box serve como um componente encapsulador (wrapper) para a auxiliar na maioria das necessidades de uso com CSS.</p>

The Box component packages [all the style functions](/system/properties/) that are exposed in `@mui/system`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Exemplo

[A paleta](/system/palette/) com funções de estilo.

## A propriedade `sx`

All system properties are available via the [`sx` prop](/system/getting-started/the-sx-prop/). Além disso, a propriedade `sx` permite você especificar quaisquer outras regras CSS que precisar. Aqui está um exemplo de como usá-la:

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

## Sobrescrevendo componentes do Material-UI

O componente Box envolve seu componente. It creates a new DOM element, a `<div>` that by default can be changed with the `component` prop. Digamos que você queira usar um `<span>`: Digamos que você queira usar um `<span>`:

{{"demo": "BoxComponent.js", "defaultCodeOpen": true }}

Isso funciona muito bem quando as alterações precisam ser isoladas em um novo elemento DOM. Note no exemplo, a forma que você alterou a margem.

No entanto, às vezes, você precisa modificar o elemento DOM subjacente. Como um exemplo, talvez queira mudar a borda do Botão. Por exemplo, você quer mudar a borda do botão. A herança por CSS não irá ajudar nesse caso. To workaround the problem, you can use the [`sx`](/system/getting-started/the-sx-prop/) prop directly on the child if it is a MUI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Salvar</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Salvar</Button>
```

For non-Material-UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Salvar</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Salvar</Box>
```

## System props

Como um componente util do CSS, o `Box` também suporta todas as propriedades de [`sistem`](/system/properties/). Você pode usá-los como propriedades diretamente no componente. Por exemplo, uma margem do topo:

```jsx
<Box mt={2}>
```
