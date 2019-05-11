---
title: Componente de React Card (Tarjeta)
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Tarjetas

<p class="description">Las tarjetas contienen información y acciones sobre un tema.</p>

Las [Tarjetas](https://material.io/design/components/cards.html) son superficies que muestran contenido y acciones sobre un tema particular.

Deben ser fáciles de leer y la información que muestran debe ser relevante y accionable. Elementos como texto e imágenes deben ser colocados sobre tarjetas de manera lógica y jerárquica.

## Tarjeta simple

Aunque las tarjetas pueden permitir múltiples acciones, controles de la interfaz y varios menús, debemos usarlas con precaución ya que son puntos de ingreso a información mas detallada.

{{"demo": "pages/components/cards/SimpleCard.js"}}

## Interacción compleja

En desktop, el contenido de las tarjetas puede expandirse.

{{"demo": "pages/components/cards/RecipeReviewCard.js"}}

## Multimedia

Un ejemplo de una tarjeta usando una imagen para reforzar contenido.

{{"demo": "pages/components/cards/MediaCard.js"}}

Por defecto usamos una combinacion de un `<div>` y una *imagen de fondo* para mostrar contenido multimedia. Esto puede ser problemático en ciertas situaciones. Por ejemplo, tal vez queremos mostrar un vídeo o una imagen responsiva. En estos casos podemos usar la propiedad `component`:

{{"demo": "pages/components/cards/ImgMediaCard.js"}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE 11.

## Controles de IU

Acciones adicionales dentro de las tarjetas son iniciadas explícitamente usando iconos, texto y controles de IU, localizados de manera típica en el pie de la tarjeta.

Acá un ejemplo de una tarjeta con control multimedia.

{{"demo": "pages/components/cards/MediaControlCard.js"}}