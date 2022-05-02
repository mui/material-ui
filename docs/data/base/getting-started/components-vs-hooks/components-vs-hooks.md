# Components vs. hooks

<p class="description">Components vs. hooks</p>

The Base package has two kinds of building blocks:

- unstyled components
- hooks

Most of the unstyled components are implemented with the help of a hook (where it makes sense). Hooks encapsulate logic, while components provide structure.

When creating custom components based on the unstyled ones, you can use either unstyled components or hooks.

With components, you will usually be able to write less code, but with hooks you have the ultimate control over the structure of the rendered HTML.
However, to make the resulting component accessible, you need to create the components the hook expects and apply props returned by the hook.
Concrete examples are provided in each hook's documentation.