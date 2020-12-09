# Advanced 进阶

<p class="description">在这里，你可以找到如何在你的自定义组件中使用系统（system）的例子。
</p>

## 将 `sx` 属性添加到你的自定义组件

`unstable_styleFunctionSx` 工具集为你自定义的组件添加了 `sx` 的支持。 通常你会在组件树的根部使用 `@material-ui/core` 中的 `Box` 组件。 如果你想独立于 Material-UI 使用系统，这个工具集可以为你提供同样的功能，同时该捆绑包的尺寸会更小。

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## 使用独立的系统工具集

如果你在自定义组件中只需要系统中的一些元素，你可以直接使用和组合不同的风格功能，并将其作为组件属性访问。 如果你需要比使用 Box 更小的捆绑大小和更好的性能，那么可以使用这种方法，但代价是需要使用 `sx` 支持的子集和不同的 API。

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
