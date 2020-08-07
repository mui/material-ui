---
title: Stepper React component
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Stepper（ステッパー）

<p class="description">ステッパーは、番号の付いたステップを通して進捗を伝えます。 ウィザードのようなワークフローを提供します。 ウィザードのようなワークフローを提供します。</p>

[Steppers](https://material.io/archive/guidelines/components/steppers.html)は、一連の論理ステップと番号付きステップの進行状況を表示します。 ナビゲーションにも使用できます。 ステッパーは、ステップが保存された後に一時的なフィードバックメッセージを表示する場合があります。

- **ステップのタイプ**： Editable, Non-editable, Mobile, Optional
- **ステッパーのタイプ**：Horizontal, Vertical, Linear, Non-linear

> **注：** ステッパーは [Material Design guidelines](https://material.io/)には文書化されなくなりましたが、Material-UIは引き続きそれらをサポートします。

## Horizontal Stepper

### Linear

`Stepper` は、現在のステップインデックス（ゼロベース）を `activeStep` プロパティとして渡すことで制御できます。`<code>Stepper`方向は、 `orientation`プロパティを使用して設定されます。 `Stepper`方向は、 `orientation`プロパティを使用して設定されます。

この例では、 `optional`プロパティを第2の`Step`コンポーネントに配置して、オプションの手順を使用する方法も示します。 オプションの手順がスキップされる場合の管理はユーザー次第です。 この例では、 `optional`プロパティを第2の`Step`コンポーネントに配置して、オプションの手順を使用する方法も示します。 オプションの手順がスキップされる場合の管理はユーザー次第です。 特定のステップでこれを決定したら、`completed={false}` を設定して、アクティブなステップインデックスがオプションのステップを超えていても、実際には完了していないことを示す必要があります。

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### Linear - Alternative Label

`alternativeLabel`コンポーネントで`alternativeLabel` propを設定すると、ステップアイコンの下にラベルを配置できます。

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js", "bg": true}}

### カスタマイズされたステッパー

コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/steppers/CustomizedSteppers.js", "bg": true}}

### Non-linear

Non-linearステッパーにより、ユーザーはいつでもマルチステップフローを入力できます。

この例は、ステップが `activeStep` プロパティに基づいて `disabled ={true}` 自動的に設定されることを除いて、通常の水平ステッパーに似ています。

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js", "bg": true}}

### Non-linear - Alternative Label

`Stepper`コンポーネントで`alternativeLabel`propを 設定すると、ステップアイコンの下にラベルを配置できます。

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js", "bg": true}}

### Non-linear - Error Step

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js", "bg": true}}

## 垂直ステッパー

{{"demo": "pages/components/steppers/VerticalLinearStepper.js", "bg": true}}

## モバイルステッパー

このコンポーネントは、モバイルデバイスに適したコンパクトなステッパーを実装します。 このコンポーネントは、モバイルデバイスに適したコンパクトなステッパーを実装します。 その着想については、[mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)を参照してください。

### テキスト

これは基本的に、正しく配置された戻る/次へボタンです。 テキストの説明は自分で実装する必要がありますが、参考のために例を以下に示します。

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Text with Carousel effect

このデモは前のデモとよく似ていますが、 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) ステップの遷移を行います。

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Dots

ステップ数が多くない場合はドットを使用します。

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progress

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}