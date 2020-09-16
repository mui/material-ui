---
title: Componente React para Assistente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel:
  component: Assistente
materialDesign: https://material.io/archive/guidelines/components/steppers.html
---

# Assistente

<p class="description">Assistentes transmitem progresso através de etapas numeradas. Ele fornece um fluxo de trabalho com etapas.</p>

[Assistentes](https://material.io/archive/guidelines/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Eles também podem ser usados para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

- **Tipos de etapas**: Editável, Somente leitura, Mobile, Opcional
- **Tipos de assistentes**: Horizontal, Vertical, Linear, Não linear

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Nota:** Os assistentes não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas o Material-UI continuará a suportá-los.

## Assistente horizontal

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

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

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Assistente vertical

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

## Assistente Mobile

Este componente implementa um assistente compacto adequado para um dispositivo mobile. IT has more limited functionality than the vertical stepper. Veja [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) para essa inspiração.

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### Texto

Use pontos quando o número de etapas não for grande.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Texto

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Pontos

Use dots when the number of steps is small.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progresso

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}
