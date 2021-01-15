---
title: Componente React Assistente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Assistente

<p class="description">Assistentes transmitem progresso através de etapas numeradas. Ele fornece um fluxo de trabalho com etapas.</p>

[Assistentes](https://material.io/archive/guidelines/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Eles também podem ser usados para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

- **Tipos de etapas**: Editável, Somente leitura, Mobile, Opcional
- **Tipos de assistentes**: Horizontal, Vertical, Linear, Não linear

> **Nota:** Os assistentes não estão mais documentados nas [diretrizes do Material Design](https://material.io/), mas o Material-UI continuará a suportá-los.

## Assistente horizontal

### Linear

O componente `Stepper` pode ser controlado passando o índice da etapa atual (baseado em zero) com a propriedade `activeStep`. A orientação do `Stepper` é definida usando a propriedade `orientation`.

Este exemplo também mostra o uso de uma etapa opcional, colocando a propriedade `optional` no segundo componente de `Step`. Observe que cabe a você gerenciar quando uma etapa opcional é ignorada. Depois de determinar isso para uma etapa específica, você deve definir `completed={false}` para indicar que, embora o índice da etapa ativa tenha ultrapassado a etapa opcional, ele não está realmente concluído.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### Linear - Rótulo Alternativo

Os rótulos podem ser colocados abaixo do ícone da etapa, definindo a propriedade `alternativeLabel` no componente `Stepper`.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js", "bg": true}}

### Assistente customizado

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js", "bg": true}}

### Não linear

Os assistentes não lineares permitem que os usuários entrem em um fluxo de várias etapas a qualquer momento.

Este exemplo é semelhante ao horizontal linear, porém as etapas não são mais automaticamente definidas para `disabled={true}` com base na propriedade `activeStep`.

O uso do `StepButton` aqui, demonstra rótulos de etapas clicáveis, além de definir a propriedade sinalizadora `completed`. No entanto, como as etapas podem ser acessadas de maneira não linear, cabe a sua própria implementação determinar quando todas as etapas são concluídas (ou mesmo se precisam ser concluídas).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js", "bg": true}}

### Não Linear - Rótulo Alternativo

Os rótulos podem ser colocados abaixo do ícone da etapa, definindo a propriedade `alternativeLabel` no componente `Stepper`.

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js", "bg": true}}

### Não Linear - Etapa de Erro

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js", "bg": true}}

## Assistente vertical

{{"demo": "pages/components/steppers/VerticalLinearStepper.js", "bg": true}}

## Assistente Mobile

Este componente implementa um assistente compacto adequado para um dispositivo mobile. Veja [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) para essa inspiração.

### Texto

Este é essencialmente um botão de voltar/próximo posicionado corretamente. Você deve implementar a descrição textual por conta própria, no entanto, um exemplo é fornecido abaixo para referência.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Texto com efeito carrossel

Esta demonstração é muito similiar a anterior, a diferença é o uso de [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para fazer a transição de etapas.

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Pontos

Use pontos quando o número de etapas não for grande.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progresso

Use uma barra de progresso quando houver muitas etapas, ou se houver etapas que precisem ser inseridas durante o processo (com base nas respostas de etapas anteriores).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}