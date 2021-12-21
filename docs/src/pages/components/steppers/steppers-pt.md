---
title: Componente React Assistente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'component: Stepper'
materialDesign: https://material.io/archive/guidelines/components/steppers.html
---

# Assistente

<p class="description">Assistentes transmitem progresso através de etapas numeradas. Ele fornece um fluxo de trabalho com etapas.</p>

[Assistentes](https://material.io/archive/guidelines/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Eles também podem ser usados para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

- **Tipos de etapas**: Editável, Somente leitura, Mobile, Opcional
- **Tipos de assistentes**: Horizontal, Vertical, Linear, Não linear

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** Steppers are no longer documented in the [Material Design guidelines](https://material.io/), but MUI will continue to support them.

## Assistente horizontal

Assistente horizontal é ideal quando o conteúdo de uma etapa depende de uma etapa anterior.

Avoid using long step names in horizontal steppers.

### Linear

Os rótulos podem ser colocados abaixo do ícone da etapa, definindo a propriedade `alternativeLabel` no componente `Stepper`.

O assistente (`Stepper`) pode ser controlado passando o índice da etapa atual (baseado em zero) com a propriedade `activeStep`. A orientação do asisstente (`Stepper`) é definida usando a propriedade `orientation`.

Este exemplo também mostra o uso de uma etapa opcional, colocando a propriedade `optional` no segundo componente de `Step`. Observe que cabe a você gerenciar quando uma etapa opcional é ignorada. Depois de determinar isso para uma etapa específica, você deve definir `completed={false}` para indicar que, embora o índice da etapa ativa tenha ultrapassado a etapa opcional, ele não está realmente concluído.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

### Não linear

Os assistentes não lineares permitem que os usuários insiram um fluxo de várias etapas a qualquer momento.

Este exemplo é semelhante ao não linear, porém as etapas não são mais automaticamente definidas `disabled={true}` com base na propriedade `activeStep`.

O uso do `StepButton` aqui, demonstra rótulos de etapas clicáveis, além de definir a propriedade sinalizadora `completed`. No entanto, como as etapas podem ser acessadas de maneira não linear, cabe a sua própria implementação determinar quando todas as etapas são concluídas (ou mesmo se precisam ser concluídas).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

### Assistente customizado

Os rótulos podem ser colocados abaixo do ícone da etapa, definindo a propriedade `alternativeLabel` no componente `Stepper`.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

### Não linear

{{"demo": "pages/components/steppers/HorizontalStepperWithError.js"}}

### Não Linear - Rótulo Alternativo

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Assistente vertical

Assistentes verticais são projetados para telas com tamanhos estreitos. Eles são ideais para dispositivos móveis. Todas as características do assistente vertical podem ser implementadas.

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

### Performance

The content of a step is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent TransitionProps={{ unmountOnExit: false }} />
```

## Assistente Mobile

Este componente implementa um assistente compacto adequado para um dispositivo mobile. Tem funcionalidades mais limitadas do que o assistente vertical. Veja [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) para essa inspiração.

O assistente mobile suporta três variantes para mostrar progresso através das etapas disponíveis: texto, pontos e progresso.

### Texto

Use pontos quando o número de etapas não for grande.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Texto

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Pontos

Use pontos quando o número de etapas for pequeno.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progress

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}
