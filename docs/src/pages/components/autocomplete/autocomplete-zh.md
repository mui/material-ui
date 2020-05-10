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

1. “value” 状态，使用 `value`/`onChange` 属性组合。 这个状态表示用户选择的值，例如，当按 <kbd>Enter</kbd> 键时.
2. “input value” 状态，使用 `inputValue`/`onInputChange` 属性组合。 这个状态表示展示在文本框中的值。

> ⚠️ 以上两种状态互不干涉，它们应该被单独控制着。

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## 免费工具

将 `freeSolo` 设置为true，以便在文本框中输入任意值。

### Search input

The prop is designed to cover the primary use case of a **search input** with suggestions, e.g. Google search or react-autowhatever.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

If you intend to use this mode for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting:

- `selectOnFocus` to helps the user clear the selected value.
- `clearOnBlur` to helps the user to enter a new value.
- `handleHomeEndKeys` to move focus inside the popup with the <kbd>Home</kbd> and <kbd>End</kbd> keys.
- A last option, for instance `Add "YOUR SEARCH"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

您也可以在用户想要添加一个新的值时显示一个对话框

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## 分组

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## 失效的选项

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

作为一种高级定制方式，我们公开了一个 `useAutocomplete()` 钩子方法。 它接受几乎与Autocomplete组件相同的参数，辅以与JSX渲染有关的所有参数。 Autocomplete组件内部也是使用的此钩子方法。

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5kB 的压缩包](/size-snapshot)。

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### 自定义钩子

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

转到[自定义自动完成](#customized-autocomplete)部分，查看使用 `Autocomplete` 组件（而不是钩子）的例子。

## 异步请求

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### 谷歌地图位置

一个为谷歌地图位置自动补全功能设计的 UI。

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

对于这个演示，我们需要加载 [谷歌地图JavaScript](https://developers. google. com/maps/documentation/javascript/tutorial) API。

> ⚠️在你开始使用 Google Maps JavaScript API 之前，你必须注册并且创建一个可支付的账户。

## 多个值

这也称为标签，允许用户输入多个值。

{{"demo": "pages/components/autocomplete/Tags.js"}}

### 固定选项

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

该演示再现了GitHub的标签选择器：

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

你也可以转到[自定义 hook](#customized-hook) 章节，查看一下使用 `useAutocomplete` hook 的自定义例子，而不是使用自动补全组件（Autocomplete）。

## 高亮显示

以下的例子通过 [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight) 这个小型（1 kB）的插件来实现自动推荐和自动补全组件中的高亮文字。

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## 自定义筛选

此组件提供了一个工厂来构建一个筛选的方法，供给 `filterOptions` 属性使用。 用此你可以更改默认的筛选行为。

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
  - `config.stringify` (*Func* [optional]): 控制如何将一个选项转换成一个字符串，这样，选项就能够和输入文本的片段相匹配。
  - `config.trim` (*Boolean* [optional]): 默认值为`false`。 删除尾随空格。

#### 返回结果

`过滤选项`: 返回的过滤器方法可以直接提供给`自动补全` 组件的 ` filterOptions ` 属性， 或者可以传给 hook 的同名参数。

以下的例子中，选项必须有一个查询的前缀：

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### 高级

对于更复杂的过滤机制，譬如模糊匹配（fuzzy matching），我们推荐您看一下 [match-sorter](https://github.com/kentcdodds/match-sorter)。 就像这样：

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## 可视化

在 10000个随机生成的选项中搜索。 多亏了[react-window](https://github.com/bvaughn/react-window)，这个列表得以可视化。

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## 局限性

### autocomplete/autofill

浏览器会有启发性的帮助用户填写表格。 然而，这样的功能会削弱的组件用户体验。

默认情况下，组件通过 `autoComplete="off"` 这个属性，禁用了 **autocomplete** 功能（请注意用户可能在之前已经在给定域输入内容）。

然而，除了记住过去已经输入的值，浏览器可能也会给出 **自动填充（autofill）** 的建议（譬如有保存的登录信息，地址，或者支付方式等）。 若您不需要自动填充，您可以尝试以下的方式：

- 给输入框一个不同的名字，这样不会泄露任何信息给浏览器使用。 例如：`id="field1"` 而不是 `id="country"`。 若你不填写 id，该组件则会使用一个随机的 id。
- 设置为 `autoComplete="new-password"`： 
        jsx
        <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        />

### iOS VoiceOver

iOS Safari 中的 VoiceOver 对 `aria-owns` 属性的支持并不是很到位。 你可以用 `disablePortal` 属性来解决这个问题。

### TypeScript

若想完全利用 type inference，您则需要把 `multiple` 属性设置为 `undefined`，`false` 或者 `true` 之一。 请在[这个讨论区中](https://github.com/mui-org/material-ui/pull/18854#discussion_r364215153)查看更多信息。 TypeScript 可能在将来会解决这个问题。

### ListboxComponent

若你提供一共自定义的 `ListboxComponent` 属性，请保证需要滚动功能的容器将 `role` 属性设置为 `listbox`。 这能保证滚动功能在一些情况下，例如当用键盘切换的时候，仍然能够正常显示。

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

我们鼓励用户在 textbox 中使用标签。 组件带入了 WAI-ARIA 授权的一些标准。