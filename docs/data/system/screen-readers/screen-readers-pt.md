# Leitores de tela

<p class="description">Coleção de utilitários para melhorar a acessibilidade com leitores de tela.</p>

## Elementos ocultos visualmente

The visually hidden style utility provides a common mechanism for hidings elements visually, but making them available for assistive technology. It's a simple style object of type `React.CSSProperties`.

{{"demo": "VisuallyHiddenUsage.js", "defaultCodeOpen": true}}

If you don't have a strict CSP policy in place, you can also do:

```jsx
import { visuallyHidden } from '@material-ui/utils';

<div style={visuallyHidden}>about how to visually hide elements</div>;
```
