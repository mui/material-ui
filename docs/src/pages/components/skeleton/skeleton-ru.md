---
title: 'Компонент React: Скелет'
components: Скелет
---

# Скелет

<p class="description">Отображайте макет вашего приложения перед загрузкой данных, чтобы уменьшить дискомфорт от загрузки.</p>

Данные ваших компонентов могут не быть доступны сразу. Вы можете увеличить предполагаемую производительность для пользователей с помощью скелетов. Кажется, что все происходит мгновенно, затем информация постепенно отображается на экране. (см. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

Компонент разработан для использования **напрямую в ваших компонентах**. Например:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variants

Компонент поддерживает 3 формы.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Анимации

По умолчанию скелет пульсирует, но вы можете изменить анимацию волны или полностью отключить ее.

{{"demo": "pages/components/skeleton/Animations.js"}}

## Пример в качестве YouTube

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Пример в качестве Facebook

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}