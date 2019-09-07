---
title: Componente React Stepper
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Assistente

<p class="description">Assistentes transmitem progresso através de etapas numeradas. Ele fornece um fluxo de trabalho com etapas.</p>

[Assistentes](https://material.io/archive/guidelines/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Elas também podem ser usadas para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

- **Types of Steps**: Editable, Non-editable, Mobile, Optional
- **Types of Steppers**: Horizontal, Vertical, Linear, Non-linear

> **Nota:** Os assistentes não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas o Material-UI continuará a suportá-los.

## Horizontal Stepper

### Linear

O assistente (`Stepper`) pode ser controlado passando o índice da etapa atual (baseado em zero) com a propriedade `activeStep`. A orientação do asisstente (`Stepper`) é definida usando a propriedade `orientation`.

Este exemplo também mostra o uso de uma etapa opcional, colocando a propriedade `optional` no segundo componente de `Step`. Observe que cabe a você gerenciar quando uma etapa opcional é ignorada. Depois de determinar isso para uma etapa específica, você deve definir `completed={false}` para indicar que, embora o índice da etapa ativa tenha ultrapassado a etapa opcional, ele não está realmente concluído.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

### Linear - Alternative Label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

### Assistente customizado

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

### Não linear

Os assistentes não lineares permitem que os usuários insiram um fluxo de várias etapas a qualquer momento.

Este exemplo é semelhante ao não linear, porém as etapas não são mais automaticamente definidas `disabled={true}` com base na propriedade `activeStep`.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

### Non Linear - Alternative Label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js"}}

### Non Linear - Error Step

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js"}}

## Assistente vertical

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

## Assistente Mobile

Este componente implementa um assistente compacto adequado para um dispositivo mobile. Veja [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) para essa inspiração.

### Text

Este é essencialmente um botão de voltar/próximo posicionado corretamente. Você deve implementar a descrição textual por conta própria, no entanto, um exemplo é fornecido abaixo para referência.

{{"demo": "pages/components/steppers/TextMobileStepper.js"}}

### Text with Carousel effect

Esta demonstração é muito similiar a anterior, a diferença é o uso de [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para fazer a transição de etapas.

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js"}}

### Dots

Use pontos quando o número de etapas não for grande.

{{"demo": "pages/components/steppers/DotsMobileStepper.js"}}

### Progresso

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js"}}