---
title: React Autocomplete（自动补全）组件
components: TextField, Popper, Autocomplete
---

# Autocomplete 自动补全

<p class="description">自动补全是一个通过一组建议选项来帮助用户输入的普通文本输入框。</p>

该组件常用于以下两个场景中的单行文本框赋值：

1. 文本框必须取值于某个预设值的集合，例如位置字段必须包含合理的位置： [组合框](#combo-box)
2. 文本框可以设置任何值，但是为用户提供可能的选项会更好，譬如搜索框可以提供近似的或者曾搜索过的选项以节省用户时间：[灵活的单文本框](#free-solo)

It's meant to be an improved version of the "react-select" and "downshift" packages.

## 组合框

必须取值于一个预设的可选值集合

{{"demo": "pages/components/autocomplete/combox.js"}}

### 练习

下面的每个示例都是自动完成组件的一个功能点的演示。

{{"demo": "pages/components/autocomplete/Playground.js"}}

### 国家选择

Choose one of the 248 countries.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

## 免费工具

将 `freeSolo` 设置为true，以便在文本框中输入任意值。 Prop的设计是为了覆盖搜索框的主要用例，并提出建议，例如谷歌搜索。

然而，仍然存在着这种情况。 如果您打算将它用于一个 [组合框](#combo-box) (一个强化的选定元素版本)，我们建议设置 `selectOnFocus` (它帮助用户清除选定的值)。

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### 帮助信息

有时您想要向用户显示他/她可以添加自己想要的任何值。 以下的演示增加了一个最新的操作方式：`添加“你的搜索”`

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

您也可以在用户想要添加一个新的值时显示一个对话框

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

## 分组

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## 已禁用的选项

{{"demo": "pages/components/autocomplete/disabledOptions.js"}}

## `使用自动完成`

作为一种高级定制方式，我们公开了一个 `useAutocomplete()` 钩子方法。 它接受几乎与Autocomplete组件相同的参数，辅以与JSX渲染有关的所有参数。 Autocomplete组件内部也是使用的此钩子方法。

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

### 谷歌地图位置

A customized UI for Google Maps Places Autocomplete.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

对于这个演示，我们需要加载 [谷歌地图JavaScript](https://developers. google. com/maps/documentation/javascript/tutorial) API。

> 在你开始使用谷歌地图javascript API之前，你需要创建一个帐户 (用于使用谷歌地图api).

## Multiple values（多重值）

这也称为标签，允许用户输入多个值。

{{"demo": "pages/components/autocomplete/Tags.js"}}

### 固定选项

In the event that you need to lock certain tag so that they can't be removed in the interface, you can set the chips disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### 复选框

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

## 尺寸

想要使用外观看起来比较小的输入框吗？ Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## 定制的自动完成组件

该演示再现了GitHub的标签选择器：

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

### `createFilterOptions(config) => filterOptions`

#### 参数

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
  - `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Lowercase everything.
  - `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
  - `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
  - `config.trim` (*Boolean* [optional]): 默认值为`false`。 Remove trailing spaces.
  - `config.limit` (*Number* [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.

#### 返回结果

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

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

### autocomplete/autofill

The browsers have heuristics to help the users fill the form inputs. However, it can harm the UX of the component.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

However, in addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). In the event you want the avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. If you leave the id empty, the component uses a random id.
- Set `autoComplete="new-password"`: 
        jsx
        <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        />

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

### TypeScript

To fully take advantage of type inference, you need to set the `multiple` prop to `undefined`, `false` or `true`. See [this discussion](https://github.com/mui-org/material-ui/pull/18854#discussion_r364215153) for more details. TypeScript might solve this bug in the future.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.