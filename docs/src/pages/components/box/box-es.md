---
title: React Box component
githubLabel: 'component: Box'
---

# Cuadro

<p class="description">El componente Box sirve como una envoltura para la mayoría de las necesidades CSS.</p>

El componente Box recoge [todas las funciones de estilo](/system/basics/#all-inclusive) que están expuesta en `@material-ui/system`. It's created using the `experimentalStyled()` function of `@material-ui/core/styles`.

[La función de estilo de la paleta](/system/palette/).

## Ejemplo

[La función de estilo de la paleta](/system/palette/).

## The sx prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Anulación de componentes de material-UI

El componente Box envuelve su componente. Crea un nuevo elemento DOM, un `<div>` por defecto que se puede cambiar con la propiedad `componente`. Digamos que quiere usar un `<span>` en lugar:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Esto funciona muy bien cuando los cambios se pueden aislar a un nuevo elemento DOM. Por ejemplo, puede cambiar el margen de esta manera.

Sin embargo, a veces tienes que apuntar al elemento DOM subyacente. For instance, you want to change the border of the Button. The Button component defines its own styles. La herencia por CSS no ayuda. Para solucionar el problema, tiene dos opciones:

1. Utilice [`React.cloneElement ()`](https://reactjs.org/docs/react-api.html#cloneelement)

El componente Box tiene una propiedad `clone` para permitir el uso del método de elemento clon de React.

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Use props de render

Los elementos hijo de Box aceptan una función props de render. Puede extraer el `className`.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠️ La especificidad de CSS se basa en el orden de importación. Si desea la garantía de que se anulará el estilo del componente envuelto, debe importar el cuadro al final.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Nombre                                               | Tipo                                                                                                                          | Por defecto                             | Descripción                                                                                              |
|:---------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">hijos&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | Función de render de Box o nodo.                                                                         |
| <span class="prop-name">clone</span>                 | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | Si `true`, el Box reciclará su elemento DOM secundario. Está usando `React.cloneElement` internamente.   |
| <span class="prop-name">component</span>             | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | El componente utilizado para el nodo raíz. Ya sea un 'string' para usar un elemento DOM o un componente. |
| <span class="prop-name">sx</span>                    | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                                      |
