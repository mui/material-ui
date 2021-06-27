---
title: React Grid composant
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">Le composant responsive Grid de Material Design s'adapte à la taille et à l'orientation de l'écran, garantissant ainsi la cohérence entre les différents agencements.</p>

Le [Grid](https://material.io/design/layout/responsive-layout-grid.html) créé une cohérence visuelle entre les éléments tout en permettant une certaine flexibilité à travers une grande variété de mise en page. L’UI responsive de Material Design est basée sur un Grid de 12 colonnes.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> ⚠️ Le composant `Grid` ne doit pas être confondu avec une grille de données ; il est plus proche d'une grille de mise en page. Pour une grille de données dirigez-vous vers [le composant `DataGrid`](/components/data-grid/).

## Comment ça marche

Le système de grille est implémenté avec le composant `Grid`:

- Cela utilise [le module flexible de CSS](https://www.w3.org/TR/css-flexbox-1/) pour une grande flexibilité.
- Il y a deux types de mise en page : *conteneurs* et *éléments*.
- La largeur d'un élément est définie en pourcentage, cela veut dire qu'ils sont toujours souples et dimensionnés par rapport à leur élément parent.
- Les éléments ont un rembourrage (padding) pour créer l'espacement entre les éléments individuels.
- Il existe cinq points de rupture de grille: xs, sm, md, lg et xl.
- Les valeurs type nombre peuvent être données à chaque points de rupture indiquant combien de colonnes parmi les 12 colonnes disponibles sont occupées par le composant lorsque la largeur de la zone d’affichage a assez des [contraintes de point de rupture](/customization/breakpoints/#default-breakpoints).

Si vous êtes **nouveau ou peu familiers avec FlexBox**, nous vous encourageons à lire ce guide [CSS-Tricks FlexBox ](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Les grilles fluides

Les grilles fluides utilisent des colonnes qui mettent à l'échelle et redimensionnent le contenu. La mise en page d'une grille fluide peut utiliser des breakpoints pour déterminer si la mise en page doit changer radicalement.

### Grille de base

Les largeurs de colonnes sont des valeurs entières entre 1 et 12 ; elles s'appliquent à n'importe quel breakpoint et indiquent combien de colonnes sont occupées par le composant.

Une valeur donnée à un breakpoint s'applique à tous les autres breakpoints plus larges que lui (sauf si surchargé, comme vous pouvez le lire plus tard dans cette page). Par exemple, `xs={12}` dimensionne un composant pour occuper toute la largeur de la fenêtre d'affichage, quelle que soit sa taille.

{{"demo": "pages/components/grid/BasicGrid.js", "bg": true}}

### Grid avec plusieurs breakpoints

Plusieurs colonnes ont plusieurs largeurs définies, ce qui entraîne une modification de la présentation au point de rupture défini. Les valeurs de largeur données aux breakpoints plus grands remplacent celles données aux breakpoints plus petits.

Par exemple, `xs={12} sm={6}` dimensionne un composant pour occuper la moitié de la largeur de la fenêtre (6 colonnes) lorsque la largeur de la fenêtre est de [600 pixels ou plus](/customization/breakpoints/#default-breakpoints). Pour les affichages plus petits, le composant remplit les 12 colonnes disponibles.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Ecartement

Pour contrôler l'espace entre les enfants, utilisez la propriété `spacing`. La valeur d'espacement peut être n'importe quel nombre positif, y compris les décimales et n'importe quelle chaîne. La propriété est convertie en une propriété CSS en utilisant le helper [`theme.spacing()`](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Responsive values

Vous pouvez changer la valeur des propriétés en fonction du breakpoint actif. Par exemple, nous pouvons implémenter la grille de mise en page responsive ["recommandée"](https://material.io/design/layout/responsive-layout-grid.html) de Material Design.

{{"demo": "pages/components/grid/ResponsiveGrid.js", "bg": true}}

Les valeurs responsives sont prises en charge par:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- toutes les [autres propriétés](#system-props) du système

> ⚠️ Lors de l'utilisation d'une propriété de `colonnes` responsive, chaque élément de la grille a besoin de son breakpoint correspondant. Par exemple, cela ne fonctionne pas. La valeur `md` manque à l'élément de la grille:
> 
> ```jsx
> <Grid container columns={{ xs: 4, md: 12 }}>
>    <Grid item xs={2} />
> > </Grid>
> ```

### Marge négative

Les propriétés `rowSpacing` et `columnSpacing` permettent de spécifier les écarts de lignes et de colonnes de manière indépendante. C'est similaire aux propriétés `row-gap` et `column-gap` de [grille CSS](/system/grid/#row-gap-amp-column-gap).

{{"demo": "pages/components/grid/RowAndColumnSpacing.js", "bg": true}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels des différents paramètres:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Mise en page automatique

The Auto-layout makes the *items* equitably share the available space. That also means you can set the width of one *item* and the others will automatically resize around it.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grille complexe

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grille imbriquée

The `container` and `item` properties are two independent booleans. They can be combined.

> Un **container** flex est la boîte générée par un élément avec un affichage calculé de `flex` ou `inline-flex`. Les enfants entrants d'un conteneur flex sont appelés éléments** flex **et sont disposés à l'aide du modèle d'agencement Flex.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "pages/components/grid/ColumnsGrid.js", "bg": true}}

## Limites

### Marge négative

Il existe une limitation à la marge négative utilisée pour mettre en œuvre l'espacement entre les éléments. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap;

La configuration initiale sur les éléments flex est `min-width: auto`. Cela provoque un conflit de positionnement lorsque les enfants utilisent `white-space : nowrap;`. Vous pouvez rencontrer le problème avec :

```jsx
<Grid item xs>
  <Typography noWrap>
```

Pour que l'élément reste dans le conteneur, vous devez définir `min-width: 0`. In order for the item to stay within the container you need to set `min-width: 0`.

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## Disposition de la grille CSS

The `Grid` component is using CSS flexbox internally. But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}

## Propriétés du système

As a CSS utility component, the `Grid` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a padding:

```jsx
<Grid item p={2}>
```
