---
title: React Typography component
components: Typographie
---

# Typography

<p class="description">Utilisez la typographie pour présenter votre design et votre contenu aussi clairement et efficacement que possible.</p>

Trop de types de formats et de styles à la fois peuvent gâcher n'importe quelle mise en page. Une [échelle typographique](https://material.io/design/typography/#type-scale) a un ensemble limité de tailles de type qui fonctionnent bien ensemble avec la grille de mise en page.

## Général

La police *Roboto* ne sera **pas** automatiquement chargée par Material-UI. Le développeur est responsable du chargement de toutes les polices utilisées dans leur application. Roboto Font a quelques moyens faciles pour commencer. Pour une configuration plus avancée, consultez [la section de personnalisation du thème](/customization/typography/).

## Roboto Font CDN

Afficher ci-dessous est un exemple de balisage de lien utilisé pour charger la police Roboto à partir d'un CDN :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Installer via npm

Vous pouvez [l'installer](https://www.npmjs.com/package/fontsource-roboto) en tapant la commande ci-dessous dans votre terminal :

`npm install fontsource-roboto`

Ensuite, vous pouvez l'importer dans votre point d'entrée.

```js
import 'fontsource-roboto';
```

For more info check out [Fontsource](https://github.com/DecliningLotus/fontsource/blob/master/packages/roboto/README.md).

⚠️ Soyez prudent lorsque vous utilisez cette approche. Make sure your bundler doesn't eager load all the font variations (100/300/400/500/700/900, italic/regular, SVG/woff). Fontsource can be configured to load specific subsets, weights and styles. Inlining all the font files can significantly increase the size of your bundle. Material-UI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## Composant

{{"demo": "pages/components/typography/Types.js"}}

## Thème

In some situations you might not be able to use the `Typography` component. Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Changing the semantic element

The Typography component uses the `variantMapping` property to associate a UI variant with a semantic element. It’s important to realize that the style of a typography is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
Heading
</Typography> {/* There is already an h1 in the page, let's not duplicate it. {/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1.
```

- You can change the mapping [globally using the theme](/customization/globals/#default-props):

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```

## Accessibilité

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).