# z-index

<p class="description">z-indexは、コンテンツを配置するための3番目の軸を提供することでレイアウトを制御するのに役立つCSSプロパティです。</p>

いくつかのMaterial-UIコンポーネントは`z-indexを利用します` 、ドロワー、モーダル、スナックバー、ツールチップなどを適切に階層化するように設計されたMaterial-UI デフォルトのz-indexスケールを採用しています。

[これらの値](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/zIndex.js)は、競合を理想的に回避するのに十分な高さと固有性を持つ任意の数から始まります。

- mobile stepper: 1000
- speed dial: 1050
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

これらの値はいつでもカスタマイズできます。 これらの値はいつでもカスタマイズできます。 You will find them in the theme under the [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) key of the theme. 個々の値をカスタマイズすることはお勧めできません。; 1つを変更した場合は、すべてを変更する必要があります。