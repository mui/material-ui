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

Обратите внимание, что [react](https://www.npmjs.com/package/react) > = 16.3.0 и [react-dom](https://www.npmjs.com/package/react-dom) > = 16.3.0 являются одноранговыми зависимостями.

## Шрифт Roboto

Material-UI был разработан на основе шрифта [Roboto](https://fonts.google.com/specimen/Roboto). Поэтому обязательно следуйте [этим инструкциям](/style/typography/#general). Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

В качестве альтернативы, если вы используете JSX поверх HTML для отрисовки head:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Иконочный шрифт

Для того, чтобы использовать компонент `Icon`, вы должны сначала добавить [Material icons](https://material.io/tools/icons/) шрифт. Вот [некоторые инструкции](/style/icons/#font-icons) как это сделать. Например, через Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

В качестве альтернативы, если вы используете JSX поверх HTML для отрисовки head:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Иконки

Для того, чтобы использовать предварительно собранные иконки SVG Material, например, найденные в [демонстрационных версиях](/demos/app-bar/), сначала нужно установить [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) пакет:

```sh
npm install @material-ui/icons
```

## CDN

Вы можете начать использовать Material-UI с минимальной интерфейсной инфраструктурой, что отлично подходит для прототипирования. Мы не рекомендуем использовать этот подход в производственных условиях - клиент должен загрузить всю библиотеку, независимо от того, какие компоненты фактически используются, как это влияет на производительность и использование полосы пропускания.

#### Релизы UMD

Мы предоставляем два файла универсального определения модуля (UMD):

- один для разработки: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- один для публикации: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

Вы можете следовать [этому примеру CDN](https://github.com/mui-org/material-ui/tree/next/examples/cdn) для быстрого старта.