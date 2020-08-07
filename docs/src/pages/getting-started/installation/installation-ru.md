# Инструкция по установке

<p class="description">Установите Material-UI, самый популярный в мире фреймворк для пользовательского интерфейса React.</p>

Material-UI доступен в виде пакета [ npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Для установки и сохранения в вашем ` package.json ` зависимости, запустите:

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```

Обратите внимание, что [react](https://www.npmjs.com/package/react) > = 16.8.0 и [react-dom](https://www.npmjs.com/package/react-dom) > = 16.8.0 являются одноранговыми зависимостями.

## Шрифт Roboto

Material-UI был разработан на основе шрифта [Roboto](https://fonts.google.com/specimen/Roboto). Поэтому обязательно следуйте [этим инструкциям](/components/typography/#general). Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Иконочный шрифт

Вот [некоторые инструкции](/components/icons/#font-icons) как это сделать. Чтобы использовать компонент иконочного шрифта `Icon`, сначала необходимо установить шрифт [Material Icons](https://material.io/tools/icons/). Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Иконки

Для того, чтобы использовать предварительно собранные SVG-иконки Material, такие как те, которые используются для [демонстрации](/components/icons/), сначала необходимо установить пакет [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// через npm
npm install @material-ui/icons

// через yarn
yarn add @material-ui/icons
```

## CDN

Вы можете начать использовать Material-UI с минимальной интерфейсной инфраструктурой, что отлично подходит для прототипирования.

Предоставляются два файла в формате **UMD**:

- один для разработки: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- один для публикации: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Вы можете следовать [этому примеру CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) для быстрого старта.

Использование этого подхода в **продакшене** **не рекомендуется** - клиент вынужден загружать целую библиотеку независимо от того, какие компоненты он реально использует. Это плохо влияет на производительность.

В ссылках на UMD-файлы используется тег `latest` для указания на последнюю версию библиотеки. Этот указатель **нестабильный**, он изменяется при появлении новых версий. Вы можете указывать конкретную версию, например, [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).