---
components: Link
---
# Links

<p class="description">Mit der Link-Komponente kannst du Ankerelemente auf einfache Weise an deine Designfarben und Typografiestile anpassen.</p>

## Einfache Links

Die Link-Komponente wird auf der [Typography](/api/typography/) Komponente aufgebaut. Sie können diese Eigenschaften nutzen.

{{"demo": "pages/style/links/Links.js"}}

Der Link hat jedoch andere Standardeigenschaften als die Typografie: - `color = "primary"` da der Link hervorstechen muss. - `variant = "inherit"` da ein Link meistens als untergeordnetes Element einer Typograpy-Komponente verwendet wird.

## Barrierefreiheit

- Vermeide generische Beschreibungen wie "Hier klicken" oder "Gehe zu" beim Erstellen eines Links. Verwende stattdessen [spezifische Beschreibungen](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- Für eine optimale Benutzererfahrungen sollten Links aus dem Text der Seite hervorgehoben werden.
- Wenn ein Link keinen sinnvollen href hat, [sollte ein `<button>` Element verwendet werden](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/style/links/ButtonLink.js"}}

## Sicherheit

Wenn du Links mit `target="_blank"` verwendest und auf Drittanbieter- Inhalte verweist, ist es [empfohlen](https://developers.google.com/web/tools/lighthouse/audits/noopener), immer `rel="noopener"` oder `rel="noreferrer"` zu verwenden.

- `rel="noopener"` verhindert den Zugriff der Seite auf das window.opener Attribut und stellt sicher, dass sie in einem eigenen Process läuft. Andernfalls kann die Ziel- Seite potentiell eine Weiterleitung zu einer schädlichen URL durchführen.
- `rel="noreferrer""` hat die gleichen Auswirkungen, verhindert jedoch zusätzlich, dass der *Referer* Header zu der neuen Seite gesendet wird. ⚠️ Das entfernen des Referrer Headers kann Auswirkungen auf Analytics haben.

## Drittanbieter-Routing Bibliothek

Ein häufiger Anwendungsfall besteht darin, die Navigation nur clientseitig durchzuführen, ohne einen .html-Roundtrip mit dem Server durchzuführen. Die `Link`- Komponente bietet eine Eigenschaft für diesen Anwendungsfall: `component`.

```jsx
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

<Link component={RouterLink} to="/open-collective">
  Link
</Link>
```

oder wenn Sie die Kollision von Eigenschaften vermeiden möchten:

```jsx
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

const MyLink = props => <RouterLink to="/open-collective" {...props} />

<Link component={MyLink}>
  Link
</Link>
```

*Merke: Das Erstellen von `MyLink` ist notwendig um unerwünschtes Unmounting zu verhindern. Weitere Informationen dazu finden Sie in unserem [Komponenten-Guide](/guides/composition/#component-property).*