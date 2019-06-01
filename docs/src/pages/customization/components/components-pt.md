# Sobrescrevendo

<p class="description">Como os componentes podem ser usados em diferentes contextos, o Material-UI suporta diferentes níveis de personalização, desde os mais específicos até os mais genéricos.</p>

1. [Variação específica para uma situação única](#1-specific-variation-for-a-one-time-situation)
2. [Variação dinâmica para uma situação única](#2-dynamic-variation-for-a-one-time-situation)
3. [Variação específica de um componente](#3-specific-variation-of-a-component) reutilizado em contextos diferentes
4. [Variações do Material Design](#4-material-design-variations) tal como com o componente botão
5. [Variação do tema global](#5-global-theme-variation)

## 1. Variação específica para uma situação única

Pode ser necessário alterar o estilo de um componente em alguma implementação específica, para a qual você tem as seguintes soluções disponíveis:

### Sobrescrever usando nomes de classes

A primeira maneira de sobrescrever o estilo de um componente é usar **nomes de classe**. Cada componente provê uma propriedade `className` no qual é sempre aplicada ao elemento raiz.

Este exemplo usa o [`withStyles()`](/css-in-js/basics/#higher-order-component-api) high-order componente para injetar estilos customizados no DOM, e passar o nome da classe para o componente `ClassNames` através da propriedade `classes`. Você pode escolher [qualquer outra solução de estilo](/guides/interoperability/), ou até mesmo CSS puro para criar os estilos, mas certifique-se de considerar a [ordem de injeção do CSS](/css-in-js/advanced/#css-injection-order), como o CSS é injetado no DOM pelo Material-UI para estilizar o componente, ele tem a maior especificidade possível, uma vez que o `<link>` é injetado na parte inferior do `<head />` para garantir que os componentes sejam sempre renderizados.

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### Sobrescrever usando classes

Quando a propriedade `className` não é suficiente, e você precisa acessar elementos mais profundos, você pode tirar proveito da propriedade do tipo objeto `classes`, com ela podemos customizar todo o CSS injetado pelo Material-UI para um determinado componente. A lista de classes para cada componente está documentada na seção **API do componente**. Por exemplo, você pode dar uma olhada na [API CSS do botão](/api/button/#css). Como alternativa, você pode usar as [ferramentas de desenvolvimento do navegador](#using-the-dev-tools).

Este exemplo também usa `withStyles()` (como acima), mas aqui, `ClassesNesting` está usando a propriedade `classes` do `Botão` para fornecer um objeto que mapeia os **nomes das classes para sobrescrever** (regras de estilo) para **os nomes de classes CSS a serem aplicados** (valores). As classes existentes do componente continuarão a ser injetadas, portanto, é necessário apenas fornecer os estilos específicos que você deseja adicionar ou sobrescrever.

Observe que, além do estilo do botão, a capitalização do rótulo do botão foi alterada:

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

### Usando as ferramentas de desenvolvimento

As ferramentas de desenvolvimento do navegador podem poupar muito tempo. Os nomes das classes do Material-UI's [seguem um padrão simples](/css-in-js/advanced/#class-names) no modo de desenvolvimento: `Mui[component name]-[style rule name]-[UUID]`.

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

{{"demo": "pages/customization/overrides/ClassesShorthand.js"}}

### Estados internos

Os estados internos dos componentes, como *hover*, *focus*, *disabled* e *selected*, são estilizados com uma especificidade CSS mais alta. [Especificidade é um peso](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) que é aplicado a uma determinada declaração CSS.

Para sobrescrever os estados internos dos componentes, **você precisa aumentar a especificidade**. Aqui está um exemplo com o estado *disable* e o componente botão está usando uma **pseudo-class** (`:disabled`):

```css
.MuiButton {
  color: black;
}
/* Aumentamos a especificidade */
.MuiButton:disabled {
  color: white;
}
```

```jsx
<Button disabled className="MuiButton">
```

Às vezes, você não pode usar uma **pseudo-classe** pois o estado não existe na plataforma. Vamos pegar o componente menu item e o estado *selected* como exemplo. Além de acesssar os elementos aninhados, a propriedade `classes` pode ser usada para personilizar os estados internos dos componentes de Material-UI:

```css
.MuiMenuItem {
  color: black;
}
/* Aumentamos a especificidade */
.MuiMenuItem.selected {
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MuiMenuItem', selected: 'selected' }}>
```

#### Por que preciso aumentar a especificidade para substituir um estado do componente?

Por padrão, a especificação CSS faz com que as pseudo-classes aumentem a especificidade. Para consistência, o Material-UI aumenta a especificidade de seus estados customizados. Isso tem uma vantagem importante, é permitir que você selecione o estado que deseja customizar.

### Use `$ruleName` para referenciar uma regra local dentro da mesma folha de estilo

O plugin [jss-nested](https://github.com/cssinjs/jss-nested) (disponível por padrão) pode facilitar o processo de aumentar a especificidade.

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
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  } }
>
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### Sobrescrevendo usando estilos inline

A segunda maneira de sobrescrever o estilo de um componente é usar a abordagem de estilo **inline**. Cada componente fornece uma propriedade `style`. Essas propriedades são sempre aplicadas ao elemento raiz.

Você não precisa se preocupar com a especificidade do CSS, pois o estilo inline tem precedência sobre o CSS regular.

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[Quando devo usar o estilo inline vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. Variação dinâmica para uma situação única

Você aprendeu a substituir o estilo dos componentes do Material-UI nas seções anteriores. Agora, vamos ver como podemos tornar essas sobrescritas dinâmicas. Nós demonstraremos 5 alternativas, cada uma tem seus prós e contras.

### CSS Dinâmico

{{"demo": "pages/customization/overrides/DynamicCSS.js"}}

### Nome de classe - branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### Variáveis CSS

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### Estilo Inline

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### Aninhamento de tema

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3. Variação específica de um componente

Pode ser necessário criar uma variação de um componente e usá-lo em diferentes contextos, por exemplo, um botão colorido na página do produto, no entanto, você provavelmente desejará manter seu código sem duplicações ([*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).

A melhor abordagem é seguir a opção 1 e, em seguida, aproveitar o poder de composição do React exportando seu componente customizado para usar onde quer que você precise.

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4. Variações do Material Design

A especificação do Material Design documenta diferentes variações de determinados componentes, como a forma na qual os botões são exibidos em diferentes formas: [texto](https://material.io/design/components/buttons.html#text-button) (anteriormente "flat"), [contido](https://material.io/design/components/buttons.html#contained-button) (anteriormente "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) e mais.

Material-UI tenta implementar todas essas variações. Por favor, consulte a documentação de [Componentes Suportados](/getting-started/supported-components/), para descobrir o status atual de todos os componentes de Material Design suportados.

## 5. Variação do tema global

### Variáveis de tema

Para promover a consistência entre os componentes e gerenciar a aparência da interface com o usuário como um todo, Material-UI fornece um mecanismo para aplicar as alterações globais, ajustando as [variáveis de configuração do tema](/customization/themes/#theme-configuration-variables).

### Sobrescrita do CSS Global

Você também pode customizar todas as instâncias de um componente com CSS. Nós expomos [nomes de classes globais](/css-in-js/advanced/#with-material-ui-core) para fazer isso. É muito semelhante a como você customizaria o Bootstrap.

### Sobrescrita do tema Global

Você pode aproveitar as vantagens de `sobrescrita` da chave do `tema` para potencialmente alterar cada estilo injetado pelo Material-UI no DOM. Saiba mais sobre isso na seção [de temas](/customization/themes/#customizing-all-instances-of-a-component-type) da documentação.