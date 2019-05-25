---
title: React Icon Component
components: Icon, SvgIcon
---

# Iconos

<p class="description">Guía y sugerencias para usar iconos con Material-UI.</p>

Un [icono de sistema](https://material.io/design/iconography/system-icons.html) o icono de IU, representa una acción, un archivo, un dispositivo o un directorio. Los iconos del sistema también se usan para representar acciones comunes como borrar, imprimir y guardar, y comúnmente se encuentran en los appbar, barras de herramientas, botones y listas. Google ha proporcionado un conjunto de [Material icons](https://material.io/tools/icons/?style=baseline) que van conformes a estas normas.

Material-UI proporciona dos componentes para renderizar iconos de sistema: `SvgIcon` para renderizar vectores SVG, e `Icon` para renderizar iconos de fuente.

## Iconos SVG

El componente `SvgIcon` usa un elemento SVG `path` como su hijo y lo convierte en un componente React que muestra el vector, y permite que el icono sea personalizado y que responda a eventos del mouse. La escala de los elementos SVG se debe modificar para estar conformes a un área de 24x24px.

El icono que se produce puede ser usado tal como es, o incluido como un hijo de otros componentes de Material-UI que usan iconos. Por defecto, un Icono heredará el color del texto actual. Opcionalmente, se puede cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### Iconos Material SVG

Es interesante tener los cimientos para implementar iconos personalizados, pero ¿qué hay de los iconos predeterminados? Nosotros proporcionamos un paquete npm a parte, [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons), que incluye más de mil [Material icons](https://material.io/tools/icons/?style=baseline) oficiales convertidos en componentes `SvgIcon`.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Iconos material oficiales" style="width: 566px" />
</a>

#### Implementación

Se puede usar [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) para encontrar un icono específico. Al importar un icono, sa ha de tener presente que los nombres de los iconos son en forma `PascalCase`, por ejemplo:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) está disponible como `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) está disponible como `@material-ui/icons/DeleteForever`

Para iconos con *"tema"*, adjunta el nombre del tema al nombre del icono. Por ejemplo

- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) Outlined (contorneado) está disponible como `@material-ui/icons/DeleteOutlined`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) Rounded (redondeado) está disponible como `@material-ui/icons/DeleteRounded`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) Two Tone (duotono) está disponible como `@material-ui/icons/DeleteTwoTone`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) Sharp (recto) está disponible como `@material-ui/icons/DeleteSharp`

Hay tres excepciones a esta regla:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) está disponible como `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) está disponible como `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) está disponible como `@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Importaciones

- Si el entorno de trabajo no soporta tree-shaking, la forma **recomendada** para importar los iconos es la siguiente:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Si, por el contrario, si que soporta tree-shaking, se pueden importar los iconos de esta manera:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Nota: Importar exports nombrados de este modo dará lugar a que el código para *cada icono* sea incluido en el proyecto, por lo que no se recomienda a menos que se configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/). También puede afectar al rendimiento del módulo Hot Reload.

### Más iconos SVG

¿Buscando aún más iconos SVG? Hay una gran cantidad de proyectos ahí fuera, pero [https://materialdesignicons.com](https://materialdesignicons.com/) proporciona más de 2.000 iconos oficiales y ofrecidos por la comunidad. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) empaqueta estos iconos como SvgIcons de Material-UI, del mismo modo que [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) hace con los iconos oficiales.

## Iconos de fuente

El componente `Icon` mostrará iconos de cualquier fuente compatible con ligaduras. Como requisito previo, se debe incluir una, como la [fuente de iconos Material](http://google.github.io/material-design-icons/#icon-font-for-the-web) en el proyecto, por ejemplo, vía Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`icono` establecerá el nombre de clase correcto para la fuente de icono de Material. Para otras fuentes, debe proporcionar el nombre de la clase utilizando la propiedad `className` del componente Icon.

Para usar un icono, simplemente se envuelve el nombre del icono (ligadura de la fuente) con el componente `Icono`, por ejemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por defecto, un Icono heredará el color del texto actual. Opcionalmente, se puede cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

### Fuente de iconos Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) se puede utilizar con el componente `Icon` siguiente manera:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Fuente vs SVG. ¿Qué enfoque utilizar?

Ambos enfoques funcionan bien, sin embargo, existen algunas diferencias sutiles, especialmente en términos de rendimiento y calidad de representación. Siempre que sea posible, se prefiere SVG, ya que permite la división de código, admite más iconos, se procesa más rápido y mejor.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accesibilidad

Los iconos pueden transmitir todo tipo de información significativa, por lo que es importante que alcancen a la mayor cantidad de personas posible. Hay dos casos de uso que se podrían considerar: - **Los Iconos Decorativos** solo se usan para refuerzo visual o de marca. Si se eliminaran de la página, los usuarios aún entenderían y podrían usar su página. - **Los Iconos Semánticos** son los que se usan para transmitir un significado, en lugar de una decoración pura. Esto incluye iconos, sin texto junto a ellos, utilizados como controles interactivos — botones, elementos de formularios, conmutadores, etc.

### Iconos SVG Decorativos

Si los iconos necesitados son puramente decorativos, ¡ya está hecho! Agregamos el atributo `aria-hidden=true` para que los iconos sean debidamente accesibles (invisibles).

### Iconos SVG Semánticos

Si el icono tiene un significado semántico, todo lo que se necesita hacer es usar la propiedad `titleAccess="meaning"`. Se añade el atributo `role="img"` y el elemento `<title>` para que los iconos sean correctamente accesibles.

En el caso delos elementos interactivos a los que se puede hacer foco, como cuando se usa con un botón icono, se puede utilizar la propiedad `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Iconos de Fuente Decorativos

Si los iconos necesitados son puramente decorativos, ¡ya está hecho! Agregamos el atributo `aria-hidden=true` para que los iconos sean debidamente accesibles (invisibles).

### Iconos de Fuente Semánticos

Si los iconos tienen significado semántico, se necesita proporcionar una alternativa de texto sólo visible a las tecnologías de asistencia.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Crear ususario</Typography>
```

### Referencia

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/