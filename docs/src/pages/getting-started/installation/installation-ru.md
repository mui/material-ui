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
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Иконочный шрифт

Для того, чтобы использовать компонент `Icon`, вы должны сначала добавить [Material icons](https://material.io/tools/icons/) шрифт. Вот [некоторые инструкции](/components/icons/#font-icons) как это сделать. Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

В качестве альтернативы, если вы используете JSX поверх HTML для отрисовки head:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Иконки

Для того, чтобы использовать предварительно собранные SVG-иконки Material, такие как те, которые используются для [демонстрации](/components/icons/), сначала необходимо установить пакет [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

Вы можете начать использовать Material-UI с минимальной интерфейсной инфраструктурой, что отлично подходит для прототипирования.

We are providing two Universal Module Definition (**UMD**) files:

- один для разработки: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- один для публикации: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Вы можете следовать [этому примеру CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) для быстрого старта.

⚠️ We **discourage** using this approach in **production** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version like [v3.9.3](https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js).