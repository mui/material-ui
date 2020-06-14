# Density 间距

<p class="description">如何为 Material-UI 组件设置自定义的间距。</p>

## 使用 density

本节主要是讲述如何使用间距。 本节不包括潜在的用例，也不包括在应用程序中使用间距的注意事项。 Material design 规范中有一个 [全面的指南](https://material.io/design/layout/applying-density.html#typographic-density) 来详细地介绍了本章的更多内容。

## 实现间距

某些组件可以通过属性设置更大的间距。 组件页面具有至少一个使用各自的组件并具有较大间距的例子。

根据组件的不同，可以通过缩小组件间隔（spacing）或简单地减小组件的尺寸（size）来应用间距。

以下组件具有较大间距这个属性：

- [Button](/api/button/)
- [Fab](/api/fab/)
- [FilledInput](/api/filled-input/)
- [FormControl](/api/form-control/)
- [FormHelperText](/api/form-helper-text/)
- [IconButton](/api/icon-button/)
- [InputBase](/api/input-base/)
- [InputLabel](/api/input-label/)
- [ListItem](/api/list-item/)
- [OutlinedInput](/api/outlined-input/)
- [Table](/api/table/)
- [TextField](/api/text-field/)
- [Toolbar](/api/toolbar/)

## 探索主题间距

该工具允许您可以来通过间隔（spacing）属性和组件属性来应用间距。 您可以浏览一下，看看在 Material-UI 组件上使用间距之后的整体感觉如何。

如果您启用了较大的间距，那么一个自定义的主题将被应用到当前的文档中。 该主题仅为演示使用。 您 *不应该* 将此主题应用在整个应用程序中，因为这可能会对用户体验产生负面影响。 在 [Material design 规范](https://material.io/design/layout/applying-density.html#typographic-density) 的示例中，规定了什么情况下不应该使用间距。

主题配置中包含了以下选项：

```js
const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: 'small',
    },
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiFab: {
      size: 'small',
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // Adjust spacing to reach minimal touch target hitbox
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
});
```

{{"demo": "pages/customization/density/DensityTool.js", "hideToolbar": true}}