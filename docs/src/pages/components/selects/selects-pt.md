---
title: Componente React Seleção
components: Select, NativeSelect, SelectUnstyled, MultiSelectUnstyled, OptionUnstyled, OptionGroupUnstyled
githubLabel: 'component: select'
---

# Seleção

<p class="description">Os componentes de seleção são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Seleção Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

{{"demo": "pages/components/selects/BasicSelect.js"}}

## Recursos avançados

O componente `Select` é pensado para ser intercambiável com um elemento nativo `<select>`.

Se você estiver procurando por recursos mais avançados, como combobox, seleção múltipla, autocompletar, uso assíncrono ou com suporte de adição, vá para o [ componente `Autocomplete`](/components/autocomplete/). A ideia dessa ferramenta é ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Propriedades

O componente seleção é implementado como um elemento `<input>` personalizado do [InputBase](/api/input-base/). It extends the [text field components](/components/text-fields/) sub-components, either the [OutlinedInput](/api/outlined-input/), [Input](/api/input/), or [FilledInput](/api/filled-input/), depending on the variant selected. Ele compartilha os mesmos estilos e muitas das mesmas propriedades. Consulte a página da API do respectivo componente para obter detalhes.

### Filled and standard variants

{{"demo": "pages/components/selects/SelectVariants.js"}}

### Rótulos e texto de ajuda

{{"demo": "pages/components/selects/SelectLabels.js"}}

> ⚠ Note that when using FormControl with the outlined variant of the Select, you need to provide a label in two places: in the InputLabel component and in the `label` prop of the Select component (see the above demo).

### Largura automática

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Outras propriedades

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Campos de Texto

Como a experiência do usuário pode ser melhorada em dispositivos móveis usando a seleção nativa da plataforma, permitimos esse padrão.

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda. Você pode encontrar um exemplo de seleção [nesta seção](/components/text-fields/#select).

## Seleções customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

O primeiro passo é estilizar o componente `InputBase`. Uma vez estilizado, você pode usá-lo diretamente como um campo de texto ou fornecê-lo à propriedade `input` da seleção para ter um campo `select`. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/select/).

## Seleção Aberta Controlada

O componente `Select` pode lidar com múltiplas seleções. O componente `Select` pode lidar com múltiplas seleções.

Como na seleção única, você pode extrair o novo valor acessando `event.target.value` na chamada `onChange`. É sempre uma matriz.

### Padrão

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Marcações

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

{{"demo": "pages/components/selects/MultipleSelectChip.js"}}

### Placeholder

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### Nativo

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## Controlling the open state

You can control the open state of the select with the `open` prop. Alternatively, it is also possible to set the initial (uncontrolled) open state of the component with the `defaultOpen` prop.

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Com um diálogo

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Agrupando

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Acessibilidade

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
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

## Unstyled

The Select also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

### Unstyled component

```jsx
import SelectUnstyled from '@mui/base/SelectUnstyled';
```

#### Basic usage

{{"demo": "pages/components/selects/UnstyledSelectSimple.js"}}

The `SelectUnstyled` is a component that accepts generic props. Due to Typescript limitations, this may cause unexpected behavior when wrapping the component in `forwardRef` (or other higher-order components). In such cases, the generic argument will be defaulted to `unknown` and type suggestions will be incomplete. To avoid this, manually cast the resulting component to the correct type (as shown above).

The rest of the demos below will not use `forwardRef` for brevity.

#### Controlled select

The SelectUnstyled can be used as either uncontrolled (as shown in the demo above) or controlled component.

{{"demo": "pages/components/selects/UnstyledSelectControlled.js"}}

#### Usage with object values

The unstyled select may be used with non-string values.

{{"demo": "pages/components/selects/UnstyledSelectObjectValues.js"}}

#### Customizing the selected value appearance

It is possible to customize the selected value display by providing a function to the `renderValue` prop. The element returned by this function will be rendered inside the select's button.

{{"demo": "pages/components/selects/UnstyledSelectCustomRenderValue.js"}}

#### Customizing the options' appearance

Options don't have to be plain strings. You can include custom elements to be rendered inside the listbox.

{{"demo": "pages/components/selects/UnstyledSelectRichOptions.js"}}

#### Grouping

Options can be grouped, similarly to the how the native `select` element works. Unlike the native `select`, however, the groups can be nested.

Place the `Option` components inside `OptionGroup` to achieve this.

{{"demo": "pages/components/selects/UnstyledSelectGrouping.js"}}

#### Multiselect

To be able to select multiple options at once, use the `MultiSelectUnstyled` component.

```js
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';
```

{{"demo": "pages/components/selects/UnstyledSelectMultiple.js"}}

### useSelect hook

```js
import { useSelect } from '@mui/base/SelectUnstyled';
```

If you need to use Select's functionality in another component, you can use the `useSelect` hook. It enables maximal customizability at the cost of being low-level.

The following example shows a select that opens when hovered over or focused. It can be controlled by a mouse/touch or a keyboard.

{{"demo": "pages/components/selects/UseSelect.js"}}
