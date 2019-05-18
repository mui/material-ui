---
title: Componente de React para navegación a pie de página
components: BottomNavigation, BottomNavigationAction
---

# Bottom Navigation (Navegação Inferior)

<p class="description">Las barras de navegación inferiores permiten movimiento entre destinos primarios en una aplicación.</p>

[La barra de Navegación Inferior](https://material.io/design/components/bottom-navigation.html) muestra de tres a cinco destinos en la parte inferior de una pantalla. Cada destino es representado por un icono y una etiqueta de texto opcional. Cuando un icono de navegación inferior es tocado, el usuario es llevado al destino de navegación superior asociado con ese icono.

## Botón de navegación

Cuando sólo hay **tres** acciones, muestra las dos cosas, iconos y etiquetas de texto en todo momento.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js"}}

## Botón de navegación sin texto

Si hay **cuatro ** o **cinco** acciones, mostrar vistas inactivas solamente como iconos.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js"}}