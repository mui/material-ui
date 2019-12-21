---
title: Cards React Komponente
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card (karte)

<p class="description">Karten enthalten Inhalte und Aktionen zu einem bestimmten Thema.</p>

[Karten](https://material.io/design/components/cards.html) sind Oberflächen, auf denen Inhalte und Aktionen zu einem einzelnen Thema angezeigt werden.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Einfache Karte

Karten können zwar mehrere Aktionen, UI-Steuerelemente und ein Überlaufmenü unterstützen, seien Sie zurückhaltend und denken Sie daran, dass Karten Eintrittspunkte zu komplexeren und detaillierteren Informationen sind.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Komplexe Interaktion

Auf dem Desktop können Karteninhalte erweitert werden.

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Medien

Beispiel für eine Karte, die ein Bild verwendet, um den Inhalt zu verstärken.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Standardmäßig verwenden wir die Kombination aus einem `<div>`-Element und einem *Hintergrundbild*, um das Medium anzuzeigen. In manchen Situationen kann es problematisch sein. Sie möchten beispielsweise ein Video oder ein responsives Bild anzeigen. Verwenden Sie für diese Anwendungsfälle die Eigenschaft `component`:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE 11.

## Steuerelemente der Benutzeroberfläche

Ergänzende Aktionen innerhalb der Karte werden explizit mit Symbolen, Text und UI-Steuerelementen aufgerufen, die sich normalerweise unten auf der Karte befinden.

Hier ist ein Beispiel für eine Mediensteuerungskarte.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}