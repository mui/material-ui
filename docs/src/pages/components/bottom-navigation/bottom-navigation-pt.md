---
title: Componente React para Navegação inferior
components: BottomNavigation, BottomNavigationAction
---

# Navegação Inferior

<p class="description">A barra de navegação inferior permite navegar entre os principais destinos em um aplicativo.</p>

Barras de [Navegação Inferior](https://material.io/design/components/bottom-navigation.html) apresentam de três a cinco destinos na parte inferior da tela. Cada destino é apresentado por um ícone e opcionalmente um rótulo de texto (text label). Quando um botão de navegação é pressionado, o usuário é levado ao destino associado com ícone.

## Navegação Inferior

Quando existir apenas **três** ações, exiba ambos, os ícones e rótulos de texto.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Navegação Inferior sem rótulo

Se existir **quatro** ou **cinco** ações, exiba os destinos inativos somente com ícone.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}