---
title: React-компонент Автозаполнение
components: TextField, Popper, Autocomplete
---

# Autocomplete (Автодополнение)

<p class="description">Автодополнение - это обычный ввод текста, дополненный панелью предлагаемых опций.</p>

Этот виджет используется для установки значения однострочного текстового поля. Он полезен в одном из двух случев:

1. Значение для текстового поля должно быть выбрано из предопределенного набора допустимых значений, например, поле местоположения должно содержать действительное имя местоположения: [поле со списком](#combo-box).
2. Текстовое поле может содержать любое произвольное значение, но целесообразно предлагать пользователю возможные значения. Например, поле поиска может предлагать аналогичные или предыдущие поиски, чтобы сэкономить время пользователя: [free solo](#free-solo).

## Ком-Бог

Значение должно быть выбрано из предопределенного набора допустимых значений.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Песочница

Каждый из следующих примеров демонстрирует одну функцию компонента автозаполнения.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Выбор страны

Выберите одну страну из 248.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

## Бесплатное соло

Установите для `freeSolo` значение true, чтобы текстовое поле могло содержать любое произвольное значение.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

## Сгруппированные

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Отключенные опции

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

Для продвинутой кастомизации используйте `useAutocomplete()` хук. It accepts almost the same options as the Autocomplete component minus all the props related to the rendering of JSX. The Autocomplete component uses this hook internally.

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 4.5 [4,5 кБ в сжатом виде](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Head to the [Customized Autocomplete](#customized-autocomplete) section for a customization example with the `Autocomplete` component instead of the hook.

## Асинхронные запросы

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Места Google Maps

A customized UI for Google Maps Places Autocomplete.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API.

> ⚠️ Before you can start using the Google Maps JavaScript API, you must sign up and create a billing account.

## Множественные значения

Also known as tags, the user is allowed to enter more than one value.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Фиксированные опции

В случае, если вам нужно зафиксировать определенный тег (так что он не мог быть удалён через интерфейс), вы можете установить chips в состояние disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Чекбоксы

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

## Размеры

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Customized Autocomplete

This demo reproduces the GitHub's label picker:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Пользовательский фильтр

The component exposes a factory to create a filter method that can provided to the `filerOption` prop. You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

It supports the following options:

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
  - `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Lowercase everything.
  - `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
  - `config.stringify` (*Func* [optional]): Defaults to `JSON.stringify`.
  - `config.trim` (*Boolean* [optional]): По умолчанию - `false`. Remove trailing spaces.

In the following demo, the options need to start with the query prefix:

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Дополнительные параметры

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). For instance:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## Виртуализация

Поиск в 10000 случайно сгенерированных опций. Список виртуализирован благодаря [реагирующему окну](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Ограничения

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.