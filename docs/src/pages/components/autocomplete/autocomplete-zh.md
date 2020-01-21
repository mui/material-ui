---
title: React Autocomplete（自动补全）组件
components: TextField, Popper, Autocomplete
---

# Autocomplete（自动补全）

<p class="description">自动补全是一个通过一组建议选项来帮助用户输入的普通文本输入框。</p>

该组件常用于以下两个场景中的单行文本框赋值：

1. 文本框必须取值于某个预设值的集合，例如位置字段必须包含合理的位置： [组合框](#combo-box)
2. 文本框可以设置任何值，但是为用户提供可能的选项会更好，譬如搜索框可以提供近似的或者曾搜索过的选项以节省用户时间：[灵活的单文本框](#free-solo)

## 组合框

必须取值于一个预设的可选值集合

{{"demo": "pages/components/autocomplete/combox.js"}}

### 练习

下面的每个示例都是自动完成组件的一个功能点的演示。

{{"demo": "pages/components/autocomplete/Playground.js"}}

### 国家选择

在248个国家之中选一个。

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

## 自由独奏

将 `freeSolo` 设置为true，以便在文本框中输入任意值。

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

## 分组

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## 已禁用的选项

{{"demo": "pages/components/autocomplete/disabledOptions.js"}}

## `使用自动完成`

作为一种高级定制方式，我们公开了一个 `useAutocomplete()` 钩子方法。 It accepts almost the same options as the Autocomplete component minus all the props related to the rendering of JSX. Autocomplete组件内部也是使用的此钩子方法。

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5kB 已压缩的包](/size-snapshot)。

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### 自定义钩子

{{"demo": "pages/components/autocomplete/ustomizedHook.js"}}

转到[自定义自动完成](#customized-autocomplete)部分，查看使用 `Autocomplete` 组件（而不是钩子）的例子。

## 异步请求

{{"demo": "pages/components/autocomplete/disabledOptions.js"}}

### Google Maps place

A customized UI for Google Maps Places Autocomplete.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API.

> ⚠️ Before you can start using the Google Maps JavaScript API, you must sign up and create a billing account.

## Multiple values

Also known as tags, the user is allowed to enter more than one value.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Fixed options

In the event that you need to lock certain tag so that they can't be removed in the interface, you can set the chips disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Checkboxes（复选框）

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

## 尺寸

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## 定制的自动完成组件

This demo reproduces the GitHub's label picker:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## 高亮

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## 自定义筛选规则

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
  - `config.trim` (*Boolean* [optional]): 默认值为`false`。 Remove trailing spaces.

In the following demo, the options need to start with the query prefix:

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### 高级

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). 就像这样：

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## 虚拟滚动

Search within 10,000 randomly generated options. The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## 局限性

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.