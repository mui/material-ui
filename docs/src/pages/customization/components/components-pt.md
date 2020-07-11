# Customizando componentes

<p class="description">Você pode customizar facilmente a aparência de um componente do Material-UI.</p>

Como os componentes podem ser usados em diferentes contextos, existem várias abordagens para isso. Indo da abordagem mais precisa a mais abrangente, são elas:

1. [Variação específica para uma situação única](#1-specific-variation-for-a-one-time-situation)
2. [Variação dinâmica para uma situação única](#2-dynamic-variation-for-a-one-time-situation)
3. [Variação específica de um componente](#3-specific-variation-of-a-component) reutilizado em contextos diferentes
4. [Variações do Material Design](#4-material-design-variations) tal como com o componente botão
5. [Variação do tema global](#5-global-theme-variation)

## 1. Variação específica para uma situação única

Pode ser necessário alterar o estilo de um componente em alguma implementação específica, para a qual você tem as seguintes soluções disponíveis:

### Sobrescrevendo estilos com nomes de classe

A primeira maneira de sobrescrever o estilo de um componente é usar **nomes de classe**. Cada componente provê uma propriedade `className` no qual é sempre aplicada ao elemento raiz.

Este exemplo usa o [`withStyles()`](/styles/basics/#higher-order-component-api) high-order componente para injetar estilos customizados no DOM, e passar o nome da classe para o componente `ClassNames` através da propriedade `classes`. Você pode escolher [qualquer outra solução de estilo](/guides/interoperability/), ou até mesmo CSS puro para criar os estilos, mas certifique-se de considerar a [ordem de injeção do CSS](/styles/advanced/#css-injection-order), como o CSS é injetado no DOM pelo Material-UI para estilizar o componente, ele tem a maior especificidade possível, uma vez que o `<link>` é injetado na parte inferior do `<head />` para garantir que os componentes sejam sempre renderizados.

{{"demo": "pages/customization/components/ClassNames.js"}}

### Sobrescrevendo estilos com classes

Quando a propriedade `className` não é suficiente, e você precisa acessar elementos mais profundos, você pode tirar proveito da propriedade do tipo objeto `classes`, com ela podemos customizar todo o CSS injetado pelo Material-UI para um determinado componente.

A lista de classes para cada componente está documentada na página da API do componente, você deve consultar a coluna **seção CSS** e **coluna rule name**. Por exemplo, você pode dar uma olhada na [API CSS do botão](/api/button/#css). Como alternativa, você pode usar as [ferramentas de desenvolvimento do navegador](#using-the-dev-tools).

Este exemplo também usa `withStyles()` (como acima), mas aqui, `ClassesNesting` está usando a propriedade `classes` do `Botão` para fornecer um objeto que mapeia os **nomes das classes para sobrescrever** (regras de estilo) para **os nomes de classes CSS a serem aplicados** (valores). As classes existentes do componente continuarão a ser injetadas, portanto, é necessário apenas fornecer os estilos específicos que você deseja adicionar ou sobrescrever.

Observe que, além do estilo do botão, a capitalização do rótulo do botão foi alterada:

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### Sobrescrevendo estilos por nomes de classes globais

[Siga esta seção](/styles/advanced/#with-material-ui-core).

### Usando as ferramentas de desenvolvimento

As ferramentas de desenvolvimento do navegador podem poupar muito tempo. Os nomes das classes do Material-UI [seguem um padrão simples](/styles/advanced/#class-names) no modo de desenvolvimento: `Mui[component name]-[style rule name]-[UUID]`.

Vamos voltar para a demonstração acima. Como você pode substituir o rótulo do botão?

![dev-tools](/static/images/customization/dev-tools.png)

Usando as ferramentas de desenvolvimento, você sabe que precisa direcionar a regra de estilo do componente `Button` e `label`:

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### Forma abreviada

O exemplo acima pode ser condensado usando **a mesma API CSS** com o componente filho. Neste exemplo, o componente de ordem superior `withStyles()` está injetando a propriedade `classes` que é usada pelo [componente `Button`](/api/button/#css).

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### Pseudo-classes

Os estados especiais dos componentes, como *hover*, *focus*, *disabled* e *selected*, são estilizados com uma especificidade CSS mais alta. [Especificidade é um peso](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) que é aplicado a uma determinada declaração CSS.

Para sobrescrever os estados especiais dos componentes, **você precisa aumentar a especificidade**. Aqui está um exemplo com o estado *disable* e o componente botão está usando uma **pseudo-class** (`:disabled`):

```css
.Button {
  color: black;
}
.Button:disabled { /* Aumenta a especificidade */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

Às vezes, você não pode usar uma **pseudo-classe** pois o estado não existe na plataforma. Vamos pegar o componente menu item e o estado *selected* como exemplo. Além de acessar os elementos aninhados, a propriedade `classes` pode ser usada para customizar os estados especiais dos componentes do Material-UI:

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* Aumenta a especificidade */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### Por que preciso aumentar a especificidade para sobrescrever um estado do componente?

Por padrão, a especificação CSS faz com que as pseudo-classes aumentem a especificidade. Para consistência, o Material-UI aumenta a especificidade de suas pseudo-classes customizadas. Isso tem uma vantagem importante, permitir que você escolha o estado que deseja customizar.

#### Posso usar uma API diferente que requer menos configuração?

Em vez de fornecer valores para a propriedade `classes` da API, você pode utilizar os [nomes de classes globais](/styles/advanced/#with-material-ui-core) gerados pelo Material-UI. Ele implementa todas essas pseudo-classes personalizadas:

| Chave classes | Nome da classe global |
|:------------- |:--------------------- |
| checked       | Mui-checked           |
| disabled      | Mui-disabled          |
| error         | Mui-error             |
| focused       | Mui-focused           |
| focusVisible  | Mui-focusVisible      |
| required      | Mui-required          |
| expanded      | Mui-expanded          |
| selected      | Mui-selected          |


```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* Aumenta a especificidade */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### Use `$ruleName` para referenciar uma regra local dentro da mesma folha de estilo

O plugin [jss-nested](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-nested) (disponível por padrão) pode facilitar o processo de aumento da especificidade.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

compila para:

```css
.root-x.disable-x {
  color: white;
}
```

⚠️ Você precisa aplicar os dois nomes de classes gerados (`root` & `disabled`) no DOM, para que funcione corretamente.

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // nome da classe, p.ex. `root-x`
    disabled: classes.disabled, // nome da classe, p.ex. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### Sobrescrevendo com estilos em linha

A segunda maneira de sobrescrever o estilo de um componente é usar a abordagem de **estilo em linha**. Cada componente fornece uma propriedade `style`. Essas propriedades são sempre aplicadas ao elemento raiz.

Você não precisa se preocupar com a especificidade do CSS, pois o estilo em linha tem precedência sobre o CSS regular.

{{"demo": "pages/customization/components/InlineStyle.js"}}

[Quando devo usar o estilo em linha vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-css)

## 2. Variação dinâmica para uma situação única

Você aprendeu como sobrescrever o estilo dos componentes do Material-UI nas seções anteriores. Agora, vamos ver como podemos tornar essas sobrescritas dinâmicas. Aqui estão cinco alternativas; Cada um tem os seus prós e contras.

### CSS Dinâmico

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### Nome de classe derivada

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### Variáveis CSS

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### Estilos em linha

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### Aninhamento de tema

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. Variação específica de um componente

Pode ser necessário criar uma variação de um componente e usá-lo em diferentes contextos, por exemplo, um botão colorido na página do produto, no entanto, você provavelmente desejará manter seu código sem duplicações ([*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).

A melhor abordagem é seguir a opção 1 e, em seguida, aproveitar o poder de composição do React exportando seu componente customizado para usar onde quer que você precise.

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Variações do Material Design

A especificação do Material Design documenta diferentes variações de determinados componentes, como a forma na qual os botões são exibidos em diferentes formas: [texto](https://material.io/design/components/buttons.html#text-button) (anteriormente "flat"), [contido](https://material.io/design/components/buttons.html#contained-button) (anteriormente "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) e mais.

Material-UI tenta implementar todas essas variações. Por favor, consulte a documentação de [Componentes Suportados](/getting-started/supported-components/), para descobrir o status atual de todos os componentes de Material Design suportados.

## 5. Variação do tema global

A fim de promover a consistência entre os componentes e gerenciar a aparência da interface do usuário como um todo, o Material-UI fornece um mecanismo para aplicar mudanças globais.

As demonstrações desta seção abordam como alterar o tamanho da fonte do botão.

### Variáveis de tema

Você pode ajustar [as variáveis de configuração do tema](/customization/theming/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### Sobrescrita do CSS Global

Você também pode customizar todas as instâncias de um componente com CSS. Componentes expõe [nomes de classe globais](/styles/advanced/#with-material-ui-core) para habilitar isso. É muito semelhante a como você customizaria o Bootstrap.

```jsx
const GlobalCss = withStyles({
  // @global é manipulado pelo jss-plugin-global.
  '@global': {
    // Você deve direcionar [class*="MuiButton-root"] em vez de aninhar temas.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### Sobrescrita do tema Global

Você pode aproveitar as vantagens de `sobrescrita` da chave do `tema` para potencialmente alterar cada estilo injetado pelo Material-UI no DOM. Saiba mais sobre isso na [seção de temas](/customization/globals/#css) da documentação.

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}