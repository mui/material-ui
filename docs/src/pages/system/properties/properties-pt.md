# Propriedades

<p class="description">Esta página lista todas as propriedades de sistema customizadas, como elas estão ligadas com o tema e quais propriedades CSS eles calculam.</p>

Vamos tomar, como exemplo, a seguinte linha da  [tabela abaixo](#properties-reference-table),  exemplo:

| Grupo                       | Função de estilo do sistema | Chave(s) do sistema  | Propriedade CSS/propriedades | Mapeamento no tema                                                            |
|:--------------------------- |:--------------------------- |:-------------------- |:---------------------------- |:----------------------------------------------------------------------------- |
| [spacing](/system/spacing/) | `spacing`                   | `mb`, `marginBottom` | `margin-bottom`              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

1. A coluna <b>Grupo</b> contém links para a página da documentação onde esse grupo de propriedades é descrito; neste exemplo, a página de [espaçamento](/system/spacing/).
2. A coluna <b>Função de estilo do sistema</b> lista a função que gera as propriedades mostradas nas outras colunas, como referência para o caso de querer adicionar esta funcionalidade aos seus componentes customizados. As funções podem ser importadas de `@material-ui/system`. Você pode ver um exemplo de como usar as funções de estilo na [página avançada](/system/advanced/#using-standalone-system-utilities).

3. A coluna <b>Chave(s) do sistema</b> lista chaves(s) através da qual você pode usar com a propriedade `sx` (ou como uma função do sistema).
4. A coluna <b>Propriedade CSS</b> descreve qual propriedade CSS será gerada quando essa propriedade do sistema for usada.
5. E por último, a coluna <b>Mapeamento no tema</b> diz a você como essa propriedade é ligada com o tema - com este exemplo, qualquer valor que você possa usar, será usado como entrada para o utilitário `theme.spacing`.

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

| Grupo                             | Função de estilo do sistema | Chave(s) do sistema   | Propriedade CSS/propriedades                                                                 | Mapeamento no tema                                                                    |
|:--------------------------------- |:--------------------------- |:--------------------- |:-------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------- |
| [borders](/system/borders/)       | `border`                    | `border`              | `border`                                                                                     | `${value}px solid`                                                                    |
| [borders](/system/borders/)       | `borderBottom`              | `borderBottom`        | `border-bottom`                                                                              | `${value}px solid`                                                                    |
| [borders](/system/borders/)       | `borderColor`               | `borderColor`         | `border-color`                                                                               | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)         |
| [borders](/system/borders/)       | `borderLeft`                | `borderLeft`          | `border-left`                                                                                | `${value}px solid`                                                                    |
| [borders](/system/borders/)       | `borderRadius`              | `borderRadius`        | `border-radius`                                                                              | [`theme.shape.borderRadius*value`](/customization/default-theme/?expand-path=$.shape) |
| [borders](/system/borders/)       | `borderRight`               | `borderRight`         | `border-right`                                                                               | `${value}px solid`                                                                    |
| [borders](/system/borders/)       | `borderTop`                 | `borderTop`           | `border-top`                                                                                 | `${value}px solid`                                                                    |
| [shadows](/system/shadows/)       | `boxShadow`                 | `boxShadow`           | `box-shadow`                                                                                 | `theme.shadows[value]`                                                                |
| [display](/system/display/)       | `displayPrint`              | `displayPrint`        | `display`                                                                                    | none                                                                                  |
| [display](/system/display/)       | `displayRaw`                | `display`             | `display`                                                                                    | none                                                                                  |
| [flexbox](/system/flexbox/)       | `alignContent`              | `alignContent`        | `align-content`                                                                              | none                                                                                  |
| [flexbox](/system/flexbox/)       | `alignItems`                | `alignItems`          | `align-items`                                                                                | none                                                                                  |
| [flexbox](/system/flexbox/)       | `alignSelf`                 | `alignSelf`           | `align-self`                                                                                 | none                                                                                  |
| [flexbox](/system/flexbox/)       | `flex`                      | `flex`                | `flex`                                                                                       | none                                                                                  |
| [flexbox](/system/flexbox/)       | `flexDirection`             | `flexDirection`       | `flex-direction`                                                                             | none                                                                                  |
| [flexbox](/system/flexbox/)       | `flexGrow`                  | `flexGrow`            | `flex-grow`                                                                                  | none                                                                                  |
| [flexbox](/system/flexbox/)       | `flexShrink`                | `flexShrink`          | `flex-shrink`                                                                                | none                                                                                  |
| [flexbox](/system/flexbox/)       | `flexWrap`                  | `flexWrap`            | `flex-wrap`                                                                                  | none                                                                                  |
| [flexbox](/system/flexbox/)       | `justifyContent`            | `justifyContent`      | `justify-content`                                                                            | none                                                                                  |
| [flexbox](/system/flexbox/)       | `order`                     | `order`               | `order`                                                                                      | none                                                                                  |
| [palette](/system/palette/)       | `bgcolor`                   | `bgcolor`             | `backgroundColor`                                                                            | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)         |
| [palette](/system/palette/)       | `color`                     | `color`               | `color`                                                                                      | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)         |
| [positions](/system/positions/)   | `bottom`                    | `bottom`              | `bottom`                                                                                     | none                                                                                  |
| [positions](/system/positions/)   | `left`                      | `left`                | `left`                                                                                       | none                                                                                  |
| [positions](/system/positions/)   | `position`                  | `position`            | `position`                                                                                   | none                                                                                  |
| [positions](/system/positions/)   | `right`                     | `right`               | `right`                                                                                      | none                                                                                  |
| [positions](/system/positions/)   | `top`                       | `top`                 | `top`                                                                                        | none                                                                                  |
| [positions](/system/positions/)   | `zIndex`                    | `zIndex`              | `z-index`                                                                                    | [`theme.zIndex[value]`](/customization/default-theme/?expand-path=$.zIndex)           |
| [sizing](/system/sizing/)         | `height`                    | `height`              | `height`                                                                                     | none                                                                                  |
| [sizing](/system/sizing/)         | `maxHeight`                 | `maxHeight`           | `max-height`                                                                                 | none                                                                                  |
| [sizing](/system/sizing/)         | `maxWidth`                  | `maxWidth`            | `max-width`                                                                                  | none                                                                                  |
| [sizing](/system/sizing/)         | `minHeight`                 | `minHeight`           | `min-height`                                                                                 | none                                                                                  |
| [sizing](/system/sizing/)         | `minWidth`                  | `minWidth`            | `min-width`                                                                                  | none                                                                                  |
| [sizing](/system/sizing/)         | `width`                     | `width`               | `width`                                                                                      | none                                                                                  |
| [sizing](/system/sizing/)         | `boxSizing`                 | `boxSizing`           | `box-sizing`                                                                                 | none                                                                                  |
| [spacing](/system/spacing/)       | `spacing`                   | `m`, `margin`         | `margin`                                                                                     | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `ml`, `marginLeft`    | `margin-left`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `mr`, `marginRight`   | `margin-right`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `mt`, `marginTop`     | `margin-top`                                                                                 | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `p`, `padding`        | `padding`                                                                                    | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `pl`, `paddingLeft`   | `padding-left`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `pr`, `paddingRight`  | `padding-right`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `pt`, `paddingTop`    | `padding-top`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [spacing](/system/spacing/)       | `spacing`                   | `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)         |
| [typography](/system/typography/) | `typography`                | `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)   |
| [typography](/system/typography/) | `fontFamily`                | `fontFamily`          | `font-family`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)   |
| [typography](/system/typography/) | `fontSize`                  | `fontSize`            | `font-size`                                                                                  | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)   |
| [typography](/system/typography/) | `fontWeight`                | `fontWeight`          | `font-weight`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)   |
| [typography](/system/typography/) | `textAlign`                 | `textAlign`           | `text-align`                                                                                 | none                                                                                  |
