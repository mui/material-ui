---
title: Componente React Stepper
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Assistente

<p class="description">Assistentes representam progresso através de etapas numeradas. Ele fornece um fluxo de trabalho de passo a passo.</p>

[Assistentes](https://material.io/archive/guidelines/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Elas também podem ser usadas para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

**Tipos de etapa**

- Editável
- Não editável
- Mobile
- Opcional

**Tipos de assistentes**

- Horizontal
- Vertical
- Linear
- Não linear

> **Nota:** Os assistentes não estão documentados na documentação do Material Design.

## Horizontal Linear

O assistente (`Stepper`) pode ser controlado passando o índice da etapa atual (baseado em zero) com a propriedade `activeStep`. A orientação do asisstente (`Stepper`) é definida usando a propriedade `orientation`.

Este exemplo também mostra o uso de uma etapa opcional, colocando a propriedade `optional` no segundo componente de `Step`. Observe que cabe a você gerenciar quando uma etapa opcional é ignorada. Depois de determinar isso para uma etapa específica, você deve definir `completed={false}` para indicar que, embora o índice da etapa ativa tenha ultrapassado a etapa opcional, ele não está realmente concluído.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

## Horizontal não linear

Os assistentes não lineares permitem que os usuários insiram um fluxo de várias etapas a qualquer momento.

Este exemplo é semelhante ao não linear, porém as etapas não são mais automaticamente definidas `disabled={true}` com base na propriedade `activeStep`.

Nós usamos um `StepButton` aqui para demonstrar rótulos de etapa clicáveis, bem como definindo o flag `completed`, porque etapas podem ser acessadas de forma não-linear, e pode até implementar sua própria lógica para determinar quando todas as etapas forem concluídas (ou mesmo se elas precisam ser completadas).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

## Horizontal Linear - Rótulo Alternativo

Os rótulos podem ser colocados abaixo do ícone da etapa, definindo a propriedade `alternativeLabel` no componente `Stepper`.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

## Horizontal Não Linear - Rótulo Alternativo

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js"}}

## Horizontal não linear - Etapa com erro

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js"}}

## Assistente vertical

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

## Assistente customizado

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescrita](/customization/components/).

Este componente usa um elemento `StepConnector` customizado que altera a cor da borda com base nos estados `active` e `completed`.

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Assistente Mobile

Este componente implementa um assistente compacto adequado para um dispositivo mobile. Veja [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) para essa inspiração.

### Assistente Mobile - Texto

Este é essencialmente um botão voltar/próximo posicionado corretamente. Você deve implementar a descrição textual por conta própria, no entanto, um exemplo é fornecido abaixo para referência.

{{"demo": "pages/components/steppers/TextMobileStepper.js"}}

### Assistente Mobile - Texto com efeito Carrossel

Esta demonstração é muito similiar a anterior, a diferença é o uso de [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para fazer a transição de etapas.

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js"}}

### Assistente Mobile - Pontos

Use pontos quando o número de etapas não for grande.

{{"demo": "pages/components/steppers/DotsMobileStepper.js"}}

### Assistente Mobile - Progresso

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js"}}