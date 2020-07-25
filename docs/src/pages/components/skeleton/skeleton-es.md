---
title: Skeleton React component
components: Skeleton
---

# Esqueleto

<p class="description">Mostrar una vista previa de su contenido antes de que se carguen los datos para reducir la frustración en tiempo de carga.</p>

Es posible que los datos de sus componentes no estén disponibles inmediatamente. Puede aumentar el rendimiento percibido por los usuarios usando esqueletos. Parece que las cosas están sucediendo inmediatamente, entonces la información se muestra incrementalmente en la pantalla (Cf. [Evitar el Spinner](https://www.lukew.com/ff/entry.asp?1797)).

El componente está diseñado para ser utilizado **directamente en sus componentes**. Por ejemplo:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variantes

El componente soporta 3 variantes de forma.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animaciones

By default, the skeleton pulsate, but you can change the animation for a wave or disable it entirely.

{{"demo": "pages/components/skeleton/Animations.js"}}

### Pulsate example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Ejemplo de onda

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Dimensiones inferentes

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Accesibilidad

Skeleton screens provide an alternative to the traditional spinner methods. Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).