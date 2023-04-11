---
product: material-ui
title: Componente React Assistente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'component: stepper'
materialDesign: https://m1.material.io/components/steppers.html
---

# Assistente

<p class="description">Assistentes transmitem progresso através de etapas numeradas. Ele fornece um fluxo de trabalho com etapas.</p>

[Assistentes](https://m1.material.io/components/steppers.html) exibem o progresso através de uma sequência de etapas lógicas e numeradas. Eles também podem ser usados para navegação. Assistentes podem exibir uma mensagem de feedback transiente depois que uma etapa é salva.

- **Tipos de etapas**: Editável, Somente leitura, Mobile, Opcional
- **Tipos de assistentes**: Horizontal, Vertical, Linear, Não linear

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::warning
**Note:** Steppers are no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support them.
:::

## Assistente horizontal

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

Avoid using long step names in horizontal steppers.

### Linear

A linear stepper allows the user to complete the steps in sequence.

The `Stepper` can be controlled by passing the current step index (zero-based) as the `activeStep` prop. `Stepper` orientation is set using the `orientation` prop.

This example also shows the use of an optional step by placing the `optional` prop on the second `Step` component. Note that it's up to you to manage when an optional step is skipped. Once you've determined this for a particular step you must set `completed={false}` to signify that even though the active step index has gone beyond the optional step, it's not actually complete.

{{"demo": "HorizontalLinearStepper.js"}}

### Não linear

Non-linear steppers allow the user to enter a multi-step flow at any point.

This example is similar to the regular horizontal stepper, except steps are no longer automatically set to `disabled={true}` based on the `activeStep` prop.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "HorizontalNonLinearStepper.js"}}

### Assistente customizado

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "HorizontalLinearAlternativeLabelStepper.js"}}

### Não linear

{{"demo": "HorizontalStepperWithError.js"}}

### Não Linear - Rótulo Alternativo

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSteppers.js"}}

## Assistente vertical

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

{{"demo": "VerticalLinearStepper.js"}}

### Texto

The content of a step is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent TransitionProps={{ unmountOnExit: false }} />
```

## Assistente Mobile

This component implements a compact stepper suitable for a mobile device. It has more limited functionality than the vertical stepper. See [mobile steps](https://m1.material.io/components/steppers.html#steppers-types-of-steps) for its inspiration.

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### Texto

The current step and total number of steps are displayed as text.

{{"demo": "TextMobileStepper.js", "bg": true}}

### Pontos

This demo uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to create a carousel.

{{"demo": "SwipeableTextMobileStepper.js", "bg": true}}

### Pontos

Use dots when the number of steps is small.

{{"demo": "DotsMobileStepper.js", "bg": true}}

### Progresso

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"demo": "ProgressMobileStepper.js", "bg": true}}
