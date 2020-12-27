# Propriedades

<p class="description">Esta página lista todas as propriedades de sistema customizadas, como elas estão ligadas com o tema e quais propriedades CSS eles calculam. All other regular CSS properties and selectors are supported too.</p>

## Legend

Vamos tomar, como exemplo, a seguinte linha da  [tabela abaixo](#properties-reference-table),  exemplo:

| Função de estilo do sistema   | Chave(s) do sistema  | Propriedade CSS/propriedades | Mapeamento no tema                                                            |
|:----------------------------- |:-------------------- |:---------------------------- |:----------------------------------------------------------------------------- |
| [`spacing`](/system/spacing/) | `mb`, `marginBottom` | `margin-bottom`              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

### Função de estilo do sistema

A coluna <b>Função de estilo do sistema</b> lista a função que gera as propriedades mostradas nas outras colunas, como referência para o caso de querer adicionar esta funcionalidade aos seus componentes customizados. As funções podem ser importadas de `@material-ui/system`. Você pode ver um exemplo de como usar as funções de estilo na [página avançada](/system/advanced/#using-standalone-system-utilities). The content links to the documentation page where this properties are described; in this example, the [spacing](/system/spacing/) page.

### System keys

A coluna <b>Chave(s) do sistema</b> lista chaves(s) através da qual você pode usar com a propriedade `sx` (ou como uma função do sistema).

### CSS properties

A coluna <b>Propriedade CSS</b> descreve qual propriedade CSS será gerada quando essa propriedade do sistema for usada.

### Mapeamento no tema

Lastly, the <b>Theme key</b> column tells you how this property is wired with the theme – with this example, whatever value you provide will be used as input to the `theme.spacing` helper.

Vamos dar uma olhada em um exemplo:

```jsx
<Box sx={{ mb: 3 }} />

// é equivalente a
<Box sx={{ marginBottom: theme => theme.spacing(3)}} />
```

Como o espaçamento padrão do tema é 8px, isso resultará na seguinte classe CSS:

```css
.hash-MuiBox {
  margin-bottom: 24px;
}
```

## Tabela de referências de propriedades

Note that this table only lists custom properties, all other regular CSS properties and selectors are supported.

| Função de estilo do sistema                           | Chave(s) do sistema   | Propriedade CSS/propriedades                                                                 | Mapeamento no tema                                                                      |
|:----------------------------------------------------- |:--------------------- |:-------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------------------------- |
| [`border`](/system/borders/#border)                   | `border`              | `border`                                                                                     | `${value}px solid`                                                                      |
| [`borderBottom`](/system/borders/#border)             | `borderBottom`        | `border-bottom`                                                                              | `${value}px solid`                                                                      |
| [`borderColor`](/system/borders/#border-color)        | `borderColor`         | `border-color`                                                                               | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`borderLeft`](/system/borders/#border)               | `borderLeft`          | `border-left`                                                                                | `${value}px solid`                                                                      |
| [`borderRadius`](system/borders/#border-radius)       | `borderRadius`        | `border-radius`                                                                              | [`theme.shape.borderRadius * value`](/customization/default-theme/?expand-path=$.shape) |
| [`borderRight`](/system/borders/#border)              | `borderRight`         | `border-right`                                                                               | `${value}px solid`                                                                      |
| [`borderTop`]((/system/borders/#border)               | `borderTop`           | `border-top`                                                                                 | `${value}px solid`                                                                      |
| [`boxShadow`](/system/shadows/)                       | `boxShadow`           | `box-shadow`                                                                                 | `theme.shadows[value]`                                                                  |
| [`displayPrint`](/system/display/#display-in-print)   | `displayPrint`        | `display`                                                                                    | none                                                                                    |
| [`displayRaw`](/system/display/)                      | `display`             | `display`                                                                                    | none                                                                                    |
| [`alignContent`](/system/flexbox/#align-content)      | `alignContent`        | `align-content`                                                                              | none                                                                                    |
| [`alignItems`](/system/flexbox/#align-items)          | `alignItems`          | `align-items`                                                                                | none                                                                                    |
| [`alignSelf`](/system/flexbox/#align-self)            | `alignSelf`           | `align-self`                                                                                 | none                                                                                    |
| [`flex`](/system/flexbox/)                            | `flex`                | `flex`                                                                                       | none                                                                                    |
| [`flexDirection`](/system/flexbox/#flex-direction)    | `flexDirection`       | `flex-direction`                                                                             | none                                                                                    |
| [`flexGrow`](/system/flexbox/#flex-grow)              | `flexGrow`            | `flex-grow`                                                                                  | none                                                                                    |
| [`flexShrink`](/system/flexbox/#flex-shrink)          | `flexShrink`          | `flex-shrink`                                                                                | none                                                                                    |
| [`flexWrap`](/system/flexbox/#flex-wrap)              | `flexWrap`            | `flex-wrap`                                                                                  | none                                                                                    |
| [`justifyContent`](/system/flexbox/#justify-content)  | `justifyContent`      | `justify-content`                                                                            | none                                                                                    |
| [`order`](/system/flexbox/#order)                     | `order`               | `order`                                                                                      | none                                                                                    |
| [`bgcolor`](/system/palette/#background-color)        | `bgcolor`             | `backgroundColor`                                                                            | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`color`](/system/palette/#color)                     | `color`               | `color`                                                                                      | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`bottom`](/system/positions/)                        | `bottom`              | `bottom`                                                                                     | none                                                                                    |
| [`left`](/system/positions/)                          | `left`                | `left`                                                                                       | none                                                                                    |
| [`position`](/system/positions/)                      | `position`            | `position`                                                                                   | none                                                                                    |
| [`right`](/system/positions/)                         | `right`               | `right`                                                                                      | none                                                                                    |
| [`top`](/system/positions/)                           | `top`                 | `top`                                                                                        | none                                                                                    |
| [`zIndex`](/system/positions/#z-index)                | `zIndex`              | `z-index`                                                                                    | [`theme.zIndex[value]`](/customization/default-theme/?expand-path=$.zIndex)             |
| [`height`](/system/sizing/#height)                    | `height`              | `height`                                                                                     | none                                                                                    |
| [`maxHeight`](/system/sizing/)                        | `maxHeight`           | `max-height`                                                                                 | none                                                                                    |
| [`maxWidth`](/system/sizing/)                         | `maxWidth`            | `max-width`                                                                                  | none                                                                                    |
| [`minHeight`](/system/sizing/)                        | `minHeight`           | `min-height`                                                                                 | none                                                                                    |
| [`minWidth`](/system/sizing/)                         | `minWidth`            | `min-width`                                                                                  | none                                                                                    |
| [`width`](/system/sizing/#width)                      | `width`               | `width`                                                                                      | none                                                                                    |
| [`boxSizing`](/system/sizing/)                        | `boxSizing`           | `box-sizing`                                                                                 | none                                                                                    |
| [`spacing`](/system/spacing/)                         | `m`, `margin`         | `margin`                                                                                     | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `ml`, `marginLeft`    | `margin-left`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `mr`, `marginRight`   | `margin-right`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `mt`, `marginTop`     | `margin-top`                                                                                 | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `p`, `padding`        | `padding`                                                                                    | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `pl`, `paddingLeft`   | `padding-left`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `pr`, `paddingRight`  | `padding-right`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `pt`, `paddingTop`    | `padding-top`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                         | `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`typography`](/system/typography/#variant)           | `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontFamily`](/system/typography/#font-family)       | `fontFamily`          | `font-family`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontSize`](/system/typography/#font-size)           | `fontSize`            | `font-size`                                                                                  | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontStyle`](/system/typography/#font-style)         | `fontStyle`           | `font-style`                                                                                 | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontWeight`](/system/typography/#font-weight)       | `fontWeight`          | `font-weight`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`letterSpacing`](/system/typography/#letter-spacing) | `letterSpacing`       | `letter-spacing`                                                                             | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`lineHeight`](/system/typography/#line-height)       | `lineHeight`          | `line-height`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`textAlign`](/system/typography/#text-alignment)     | `textAlign`           | `text-align`                                                                                 | none                                                                                    |
