---
title: Componente React para Ícones
components: Icon, SvgIcon
---

# Ícones

<p class="description">Orientação e sugestões para usar ícones com o Material-UI.</p>

Material-UI fornece suporte de ícones de três maneiras:

1. Ícones padronizados [Material Design](#material-icons) exportados como componentes do React (ícones SVG).
1. Com o componente [SvgIcon](#svgicon), um wrapper React para ícones SVG personalizados.
1. Com o componente [Icon](#icon-font-icons), um wrapper React para ícones de fonte personalizados.

## Ícones Material

O Material Design padronizou mais de 1.000 ícones oficiais, cada um em cinco "temas" diferentes (veja abaixo). Para cada ícone SVG, exportamos o respectivo componente React do pacote `@material-ui/icons`. Você pode pesquisar a lista completa desses ícones em nossa [página de pesquisa incorporada](/components/material-icons/).

### Utilização

Instale `@material-ui/icons`. Importe ícones usando uma destas duas opções:

- Opção 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Opção 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

O mais seguro é a Opção 1, mas a Opção 2 pode proporcionar uma melhor experiência para o desenvolvedor. Certifique-se de seguir o guia [minimizando o tamanho do pacote](/guides/minimizing-bundle-size/#option-2) antes de usar a segunda abordagem. A configuração de um plugin Babel é recomendada.

Cada ícone possui também um "tema": `Filled` (padrão), `Outlined`, `Rounded`, `Two tone` e `Sharp`. Se você deseja importar o componente do ícone com um "tema" diferente do padrão, acrescente o nome do "tema" ao nome do ícone. Por exemplo, para usar o ícone `@material-ui/icons/Delete`, temos:

- "Tema" `Filled` (preenchido) (padrão) é exportado como `@material-ui/icons/Delete`,
- "Tema" `Outlined` (contornado) é exportado como `@material-ui/icons/DeleteOutlined`,
- "Tema" `Rounded` (arredondado) é exportado como `@material-ui/icons/DeleteRounded`,
- "Tema" `Two tone` (dois tons) é exportado como `@material-ui/icons/DeleteTwoTone`,
- "Tema" `Sharp` (pontiagudo) é exportado como `@material-ui/icons/DeleteSharp`.

Nota: A especificação Material Design nomeia os ícones usando a nomeação "snake_case" (por exemplo, `delete_forever`, `add_a_photo`), enquanto `@material-ui/icons` exporta os respectivos ícones usando a nomeação "PascalCase" (por exemplo `DeleteForever`, `AddAPhoto`). Há três exceções a essa regra de nomenclatura: `3d_rotation` exportado como `ThreeDRotation`, `4k` exportado como `FourK`e `360` exportado como `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## Ícones SVG

If you need a custom SVG icon (not available in Material Icons) you should use the `SvgIcon` wrapper. The `SvgIcon` component takes the SVG `path` element as its child and converts it to a React component that displays this SVG icon, and allows the icon to be styled and respond to mouse events. SVG elements should be scaled for a 24x24px viewport.

The resulting icon can be used as is, or included as a child for other Material-UI components that use icons. Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### Libraries

#### Material Design (recommended)

Material Design has standardized over [1,000 official icons](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

O componente `Icon` exibirá um ícone de qualquer fonte de ícone que suporte ligadura tipográfica (ligatures). Como pré-requisito, você deve incluir a fonte [Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) no seu projeto, por exemplo, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` definirá o nome correto da classe para a fonte do ícone Material. Para outras fontes, você deve fornecer o nome da classe usando a propriedade `className` do componente ícone.

Para usar um ícone, simplesmente coloque o nome do ícone (font ligature) com o componente `Icon`, por exemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

### Fonte Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Fonte Awesome](https://fontawesome.com/icons) pode ser usada com o componente `Icon` da seguinte forma:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Fonte vs SVG. Qual abordagem usar?

Ambas as abordagens funcionam bem, no entanto, existem algumas diferenças sutis, especialmente em termos de desempenho e qualidade de renderização. Sempre que possível, utlize o SVG, pois permite a divisão do código, suporta mais ícones, renderiza mais rápido e melhor.

Para maiores detalhes, você pode conferir [porque o GitHub migrou ícones de fonte para ícones SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Os ícones podem transmitir todos os tipos de informações significativas, por isso é importante que eles alcancem a maior quantidade possível de pessoas. Há dois casos de uso que você deve considerar:
- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Ícones SVG Decorativos

Se seus ícones são puramente decorativos, você já terminou! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Ícones SVG Semânticos

Se o seu ícone tiver significado semântico, tudo o que você precisa fazer é configurar a propriedade `titleAccess="significado"`. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

No caso de elementos interativos focalizáveis, como quando usado com um botão de ícone, você pode usar a propriedade `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="deletar">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Ícones de Fonte Decorativos

Se seus ícones são puramente decorativos, você já terminou! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Ícones de Fonte Semânticos

Se os seus ícones tiverem significado semântico, você precisará fornecer uma alternativa em texto visível apenas para tecnologias visuais.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Criar usuário</Typography>
```

### Referência

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
