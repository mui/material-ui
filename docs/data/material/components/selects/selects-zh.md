---
product: material-ui
title: React Select（选择器）组件
components: Select, NativeSelect
githubLabel: 'component: select'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
unstyled: /base/react-select/
---

# Select 选择器

<p class="description">选择器组件能从一个选项列表中去获得用户所提供的信息。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的选择器

我们通常将菜单（Menus）放置在其所点击的元素上，这样的话能够确保当前选定的菜单项显示在点击的元素之上。

{{"demo": "BasicSelect.js"}}

## 高级功能

Select 组件的设计原理是和一个原生的 `<select>` 元素能够互相替代。

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/material-ui/react-autocomplete/). 此组件旨在改进 “react-select” 和 “downshift” 这两个包。

## 属性

The Select component is implemented as a custom `<input>` element of the [InputBase](/material-ui/api/input-base/). It extends the [text field components](/material-ui/react-text-field/) sub-components, either the [OutlinedInput](/material-ui/api/outlined-input/), [Input](/material-ui/api/input/), or [FilledInput](/material-ui/api/filled-input/), depending on the variant selected. It shares the same styles and many of the same props. 详情请参阅相应组件的 API 文档。

### Filled and standard variants

{{"demo": "SelectVariants.js"}}

### 标签和助手文本

{{"demo": "SelectLabels.js"}}

:::warning
⚠ Note that when using FormControl with the outlined variant of the Select, you need to provide a label in two places: in the InputLabel component and in the `label` prop of the Select component (see the above demo).
:::

### 自动宽度

{{"demo": "SelectAutoWidth.js"}}

### Small Size

{{"demo": "SelectSmall.js"}}

### Other props

{{"demo": "SelectOtherProps.js"}}

## 原生选择器

As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.

{{"demo": "NativeSelect.js"}}

## TextField

The `TextField` wrapper component is a complete form control including a label, input and help text. You can find an example with the select mode [in this section](/material-ui/react-text-field/#select).

## 自定义选择器

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

The first step is to style the `InputBase` component. Once it's styled, you can either use it directly as a text field or provide it to the select `input` prop to have a `select` field. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "CustomizedSelects.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/select/).

## 多重选择

The `Select` component can handle multiple selections. It's enabled with the `multiple` prop.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

### Default

{{"demo": "MultipleSelect.js"}}

### Checkmarks

{{"demo": "MultipleSelectCheckmarks.js"}}

### Chip

{{"demo": "MultipleSelectChip.js"}}

### Placeholder

{{"demo": "MultipleSelectPlaceholder.js"}}

### Native

{{"demo": "MultipleSelectNative.js"}}

## 可被控制的打开选择框

You can control the open state of the select with the `open` prop. Alternatively, it is also possible to set the initial (uncontrolled) open state of the component with the `defaultOpen` prop.

{{"demo": "ControlledOpenSelect.js"}}

## 与对话框组件（Dialog）一起使用

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "DialogSelect.js"}}

## 联动

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "GroupedSelect.js"}}

## 无障碍设计

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">年龄</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">10</MenuItem>
  <MenuItem value="20">20</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
