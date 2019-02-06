---
title: Componente de Card(Tarjetas)
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---
# Tarjetas

<p class="description">Las tarjetas contienen información y acciones sobre un tema.</p>

Las [Tarjetas](https://material.io/design/components/cards.html) son superficies que muestran contenido y acciones sobre un tema particular.

Deben se fáciles de leer y la información que muestran debe ser relevante y accionable. Elementos como texto e imagenes deben ser colocados sobre tarjetas de manera lógica y jerarquica.

## Tarjeta simple

Aunque las tarjetas pueden soportar multiples acciones, controles de la interfaz y varios menus debemos usarlas con precaución ya que son puntos de ingreso a información mas detallada.

{{"demo": "pages/demos/cards/SimpleCard.js"}}

## Interacción compleja

En desktop, el contenido de las tarjetas puede expandirse.

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## Multimedia

Un ejemplo de una tarjeta usando una imagen para reforzar contenido.

{{"demo": "pages/demos/cards/MediaCard.js"}}

Por defecto usamos una combinacion de un `<div>` y una *imagen de fondo* para mostrar contenido multimedia. Esto puede ser problemático en ciertas situaciones. Por ejemplo, cuando queremos mostrar un video o una imagen responsiva. En estos casos podemos usar la propiedad `component`:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## Controles de IU

Acciones adicionales dentro de las tarjetas son iniciadas explícitamente usando iconos, texto, controles de IU, localizados de manera típica en el pie de la tarjeta.

Aca un ejemplo de una tarjeta con control multimedia.

{{"demo": "pages/demos/cards/MediaControlCard.js"}}