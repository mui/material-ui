# Interoperabilidade da Biblioteca de Estilo

<p class="description">While you can use the emotion based styling solution provided by Material-UI to style your application, you can also use the one you already know and love (from plain CSS to styled-components).</p>

Este guia tem como objetivo documentar as alternativas mais populares, mas você deve descobrir que os princípios aplicados aqui podem ser adaptados para outras bibliotecas. Existem exemplos para as seguintes soluções de estilo:

- [CSS puro](#plain-css)
- [CSS global](#global-css)
- [Styled Components](#styled-components)
- [Módulos CSS](#css-modules)
- [Emotion](#emotion)

## CSS puro

Nada extravagante, apenas CSS.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-fdue7)

**PlainCssSlider.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**PlainCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import './PlainCssSlider.css';

export default function PlainCssSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

### CSS injection order ⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives Material-UI precedence over your custom styles. To remove the need for **!important**, you need to change the CSS injection order. Here's a demo of how it can be done for the default style engine - emotion:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

const head = document.getElementsByTagName('head')[0];

const emotionContainer = head.insertBefore(
  document.createElement('STYLE'),
  head.firstChild,
);

const cache = createCache({
  container: emotionContainer,
});

export default function PlainCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override Material-UI's styles. */}
    </CacheProvider>
  );
}
```

### Elementos mais profundos

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In Material-UI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following examples override the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**PlainCssSliderDeep1.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep1.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

The above demo relies on the [default `className` values](/styles/advanced/#with-material-ui-core), but you can provide your own class name with the `componentsProps` API.

**PlainCssSliderDeep2.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**PlainCssSliderDeep2.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import './PlainCssSliderDeep2.css';

export default function PlainCssSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className="slider"
        componentsProps={{ thumb: { className: 'thumb' } }}
      />
    </div>
  );
}
```

## CSS global

Fornecer explicitamente os nomes das classes ao componente é um esforço excessivo? [Você pode segmentar os nomes de classe gerados por Material-UI](/styles/advanced/#with-material-ui-core).

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-classnames-dho8k)

**GlobalCssSlider.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}
```

**GlobalCssSlider.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import './GlobalCssSlider.css';

export default function GlobalCssSlider() {
  return <Slider defaultValue={30} />;
}
```

### CSS injection order ⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives Material-UI precedence over your custom styles. To remove the need for **!important**, you need to change the CSS injection order. Here's a demo of how it can be done for the default style engine - emotion:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

const head = document.getElementsByTagName('head')[0];

const emotionContainer = head.insertBefore(
  document.createElement('STYLE'),
  head.firstChild,
);

const cache = createCache({
  container: emotionContainer,
});

export default function GlobalCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override Material-UI's styles. */}
    </CacheProvider>
  );
}
```

### Elementos mais profundos

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In Material-UI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following example overrides the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**GlobalCssSliderDeep.css**

```css
.MuiSlider-root {
  color: #20b2aa;
}

.MuiSlider-root:hover {
  color: #2e8b57;
}

.MuiSlider-root .MuiSlider-thumb {
  border-radius: 1px;
}
```

**GlobalCssSliderDeep.js**

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import './GlobalCssSliderDeep.css';

export default function GlobalCssSliderDeep() {
  return <Slider defaultValue={30} />;
}
```

## Styled Components

![estrelas](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

### Change the default styled engine

By default, Material-UI components come with emotion as their style engine. If, however, you would like to use `styled-components`, you can configure your app by following this [example project](https://github.com/mui-org/material-ui/blob/next/examples/create-react-app-with-styled-components). Following this approach reduces the bundle size, and removes the need to configure the CSS injection order.

After the style engine is configured properly, you can use the `experimentalStyled()` utility from `@material-ui/core/styles` and have direct access to the theme.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return <CustomizedSlider defaultValue={30} />;
}
```

### Elementos mais profundos

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In Material-UI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following examples override the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": false}}

```jsx
import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}
```

The above demo relies on the [default `className` values](/styles/advanced/#with-material-ui-core), but you can provide your own class name with the `componentsProps` API.

```jsx
import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/SliderStyled';

const CustomizedSlider = styled((props) => (
  <Slider componentsProps={{ thumb: { className: 'thumb' } }} {...props} />
))`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </div>
  );
}
```

### Tema

By using the Material-UI theme provider, the theme will be available in the theme context of the styled engine too (emotion or styled-components, depending on your configuration).

> ⚠️ If you are **already** using a custom theme with styled-components or emotion, it might not be compatible with Material-UI's theme specification. If it's not compatible, you need to render Material-UI's ThemeProvider <b>first</b>. This will ensure the theme structures are isolated. This is ideal for the progressive adoption of Material-UI's components in the codebase.

You are encouraged to share the same theme object between Material-UI and the rest of your project.

```jsx
const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portais

TODO: fill this section after the portal is implemented with the new styled engine.

## Módulos CSS

![estrelas](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

É difícil saber a participação de mercado [nesta solução de estilo](https://github.com/css-modules/css-modules), pois é dependente da solução de empacotamento que as pessoas estão usando.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-nuyg8)

**CssModulesSlider.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}
```

**CssModulesSlider.js**

```jsx
import React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSlider.module.css';

export default function CssModulesSlider() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

### CSS injection order ⚠️

**Note:** Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>`, which gives Material-UI precedence over your custom styles. To remove the need for **!important**, you need to change the CSS injection order. Here's a demo of how it can be done for the default style engine - emotion:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

const head = document.getElementsByTagName('head')[0];

const emotionContainer = head.insertBefore(
  document.createElement('STYLE'),
  head.firstChild,
);

const cache = createCache({
  container: emotionContainer,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override Material-UI's styles. */}
    </CacheProvider>
  );
}
```

### Elementos mais profundos

If you attempt to style the Slider, you will likely need to affect some of the Slider's child elements, for example the thumb. In Material-UI, all child elements have an increased specificity of 2: `.parent .child {}`. When writing overrides, you need to do the same.

The following examples override the slider's `thumb` style in addition to the custom styles on the slider itself.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideToolbar": true}}

**CssModulesSliderDeep1.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .MuiSlider-thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep1.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep1.module.css';
import Slider from '@material-ui/lab/SliderStyled';

export default function CssModulesSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className={styles.slider} />
    </div>
  );
}
```

The above demo relies on the [default `className` values](/styles/advanced/#with-material-ui-core), but you can provide your own class name with the `componentsProps` API.

**CssModulesSliderDeep2.module.css**

```css
.slider {
  color: #20b2aa;
}

.slider:hover {
  color: #2e8b57;
}

.slider .thumb {
  border-radius: 1px;
}
```

**CssModulesSliderDeep2.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesSliderDeep2.module.css';
import Slider from '@material-ui/lab/SliderStyled';

export default function CssModulesSliderDeep2() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className={styles.slider}
        componentsProps={{ thumb: { className: styles.thumb } }}
      />
    </div>
  );
}
```

## Emotion

![estrelas](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### A propriedade `css`

O método **css()** do Emotion funciona perfeitamente com Material-UI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "hideToolbar": true}}

[![Botão editar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/emotion-interoperability-idymy)

```jsx
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Slider from '@material-ui/lab/SliderStyled';

export default function EmotionCSS() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        css={css`
          color: #20b2aa;

          :hover {
            color: #2e8b57;
          }
        `}
      />
    </div>
  );
}
```

### Tema

Funciona exatamente como styled components. Você pode [usar o mesmo guia](/guides/interoperability/#styled-components).

### A API `styled()`

Funciona exatamente como styled components. Você pode [usar o mesmo guia](/guides/interoperability/#styled-components).
