---
title: React Autocomplete 自动补全组件
components: TextField, Popper, Autocomplete
---

# Autocomplete 自动补全组件

<p class="description">自动补全是一个普通文本输入框，它通过一组建议的选项来帮助用户输入。</p>

该组件常用于以下两个场景中的单行文本框赋值：

1. 文本框必须取值于某个预设好的，例如：一个位置域必须包含一个有效的位置名称： [组合框](#combo-box)。
2. 文本框也可以是任何值，但最好能够为用户提供可能的选项，譬如搜索框可以提供近似的或者曾搜索过的选项以节省用户时间：[灵活的单文本框](#free-solo)。

此组件旨在改进 “react-select” 和 “downshift” 这两个包。

## Combo box 组合框

必须取值于一个预设的可选数据源。

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### 练习

以下每个示例演示了自动补全组件的单项功能。

{{"demo": "pages/components/autocomplete/Playground.js"}}

### 选择一个国家

从248个国家中选择一个。

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### 可控的状态

此组件有两种可控的状态：

1. 一种状态是“value”，它是 `value`/`onChange` 属性的组合。
2. 还有一种状态是 “input value”，它则是 `inputValue`/`onInputChange` 这两个属性的组合。

> ⚠️ 以上两种状态互不干涉，它们应该被单独控制着。

## 免费工具

将 `freeSolo` 设置为true，以便在文本框中输入任意值。 Prop的设计是为了覆盖搜索框的主要用例，并提出建议，例如谷歌搜索。

然而，仍然存在着这种情况。 如果您打算将它用于一个 [组合框](#combo-box) (一个强化的选定元素版本)，我们建议设置 `selectOnFocus` (它帮助用户清除选定的值)。

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### 帮助信息

有时您想要向用户显示他/她可以添加自己想要的任何值。 以下的演示增加了一个最新的操作方式：`添加“你的搜索”`

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

您也可以在用户想要添加一个新的值时显示一个对话框。

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## 分组

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## 失效的选项

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

对于那些更高级的定制用例，我们公开了一个 `useAutocomplete()` hook。 它接受的参数与 Autocomplete 组件接受的大同小异，但是不包括与 JSX 渲染相关的所有属性。 Autocomplete 组件的内部也使用了此 hook。

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5kB 的压缩包](/size-snapshot)。

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### 自定义的 hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

你也可以转到[定制的自动补全组件](#customized-autocomplete)章节，查看一下使用 `自动补全（Autocomplete）` 组件的自定义例子，而不是使用 hook。

## 异步请求

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### 谷歌地图位置

一个为谷歌地图位置自动补全功能设计的 UI。

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

在这个例子里，我们加载了[Google Maps JavaScript](https://developers. google. com/maps/documentation/javascript/tutorial) API。

> ⚠️在你开始使用 Google Maps JavaScript API 之前，你必须注册并且创建一个可支付的账户。

## 多个值

这也称为标签，允许用户输入多个值。

{{"demo": "pages/components/autocomplete/Tags.js"}}

### 固定的选项

有时候你需要锁定某个标签，这样他们不会被从界面中移除，这时你可以将 chips 设置为禁用。

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### 复选框

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### 限制标签数量

当没有聚焦时，你可以使用 `limitTags` 属性来限制显示选项的数量。

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## 尺寸

想要使用外观看起来比较小的输入框吗？ 您可以使用 `size` 属性。

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## 自定义的自动补全组件

该演示再次生成了 GitHub 的标签选择器：

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

你也可以转到[自定义 hook](#customized-hook) 章节，查看一下使用 `useAutocomplete` hook 的自定义例子，而不是使用自动补全组件（Autocomplete）。

## 高亮显示

以下的例子通过 [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight) 这个小型（1 kB）的插件来实现自动推荐和自动补全组件中的高亮文字。

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## 自定义筛选

此组件提供了一个工厂来构建一个筛选的方法，供给 `filerOption` 属性使用。 用此你可以更改默认的筛选行为。

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### 参数

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): 默认值为` true `。 移除字母的变音符号。
  - `config.ignoreCase` (*Boolean* [optional]): 默认值为` true `。 所有字母都小写。
  - `config.limit` (*Number* [optional]): 默认值为 null。 显示限定数量的建议选项。 譬如，如果 `config.limit` 为 `100`，那么只显示前`100` 个匹配的选项。 如果存在很多选项匹配，并且虚拟化设置还没建立成时，这样的限制是非常有效的。
  - `config.matchFrom` (*'any' | 'start'* [optional]): 默认值为 `'any'`。
  - `config.startAfter`(*Number* [optional]): 默认值为 `0`。 只在定量的字母之后显示建议选项。
  - `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
  - `config.trim` (*Boolean* [optional]): 默认值为`false`。 Remove trailing spaces.

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