---
title: Cards React Komponente
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Karten (Cards)

<p class="description">Karten enthalten Inhalte und Aktionen zu einem bestimmten Thema.</p>

[Karten](https://material.io/design/components/cards.html) sind Oberflächen, auf denen Inhalte und Aktionen zu einem einzelnen Thema angezeigt werden.

Sie sollten leicht nach relevanten und umsetzbaren Informationen durchsucht werden können. Elemente wie Text und Bilder sollten so platziert werden, dass die Hierarchie deutlich erkennbar ist.

## Einfache Karte

Karten können zwar mehrere Aktionen, UI-Steuerelemente und ein Überlaufmenü unterstützen, seien Sie zurückhaltend und denken Sie daran, dass Karten Eintrittspunkte zu komplexeren und detaillierteren Informationen sind.

{{"demo": "pages/components/cards/SimpleCard.js"}}

## Komplexe Interaktion

Auf dem Desktop können Karteninhalte erweitert werden.

{{"demo": "pages/components/cards/RecipeReviewCard.js"}}

## Medien

Beispiel für eine Karte, die ein Bild verwendet, um den Inhalt zu verstärken.

{{"demo": "pages/components/cards/MediaCard.js"}}

Standardmäßig verwenden wir die Kombination aus einem `<div>`-Element und einem *Hintergrundbild*, um das Medium anzuzeigen. In manchen Situationen kann es problematisch sein. Sie möchten beispielsweise ein Video oder ein responsives Bild anzeigen. Verwenden Sie für diese Anwendungsfälle die Eigenschaft `component`:

{{"demo": "pages/components/cards/ImgMediaCard.js"}}

> ⚠️ Wenn `component="img"` gesetzt ist, verlässt sich CardMedia auf `object-fit` zum Zentrieren des Bildes. Es wird nicht von IE 11 unterstützt.

## Steuerelemente der Benutzeroberfläche

Ergänzende Aktionen innerhalb der Karte werden explizit mit Symbolen, Text und UI-Steuerelementen aufgerufen, die sich normalerweise unten auf der Karte befinden.

Hier ist ein Beispiel für eine Mediensteuerungskarte.

{{"demo": "pages/components/cards/MediaControlCard.js"}}