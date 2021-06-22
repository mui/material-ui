# Espacement

<p class="description">Une large gamme de classes utilitaires de marge réactive et de remplissage pour modifier l'apparence d'un élément.</p>

## Notation

L'utilitaire space convertit les marges abrégées et les accessoires de remplissage en déclarations CSS de marge et de remplissage. Les accessoires sont nommés au format `{property}{sides}`.

Où *propriété* correspond à :

- `m` - pour les classes qui définissent une *marge*
- `p` - pour les classes qui définissent le *padding*

Où *côtés* est l'un des :

- `t` - pour les classes qui définissent *margin-top* ou *padding-top*
- `b` - pour les classes qui définissent *margin-bottom* ou *padding-bottom*
- `l` - pour les classes qui définissent *margin-left* ou *padding-left*
- `r` - pour les classes qui définissent *margin-right* ou *padding-right*
- `x` - pour les classes qui définissent à la fois **-left* et **-right*
- `y` - pour les classes qui définissent à la fois **-top* et **-bottom*
- vide - pour les classes qui définissent une marge ou un remplissage sur les 4 côtés de l'élément

## Transformation

En fonction de l'entrée et de la configuration du thème, la transformation suivante est appliquée :

- entrée : `numéro` & theme : `nombre` : la propriété est multipliée par la valeur du thème.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- entrée : `numéro` & thème : `tableau` : la propriété est la valeur est utilisée comme index du tableau.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- entrée : `numéro` & thème : `fonction` : la fonction est appelée avec la valeur de la propriété.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input : `string` : la propriété est passée en tant que valeur CSS brute.

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## Exemple

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## Centrage horizontal

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Nom d'importation | Prop | Propriété CSS                   | Clé du thème                                                     |
|:----------------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`         | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |


*Certaines personnes trouvent le raccourci de prop déroutant, vous pouvez utiliser la version complète si vous préférez :*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```