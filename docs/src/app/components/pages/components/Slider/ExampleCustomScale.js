import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const min = 0;
const max = Math.pow(10, 6);
const power = 12;

function transform(value) {
  return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
  return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

/**
 * You may find yourself needing a custom scale.
 * Here is how you would implement a [logarithmic scale](https://simple.wikipedia.org/wiki/Logarithmic_scale).
 */
export default class SliderExampleCustomScale extends Component {
  state = {
    slider: Math.pow(10, 4),
  };

  handleSlider = (event, value) => {
    this.setState({slider: transform(value)});
  };

  render() {
    return (
      <div>
        <Slider
          min={min}
          max={max}
          step={max / 100}
          value={reverse(this.state.slider)}
          onChange={this.handleSlider}
        />
        <p>
          <span>{'The value of this slider is: '}</span>
          <span>{this.state.slider}</span>
        </p>
      </div>
    );
  }
}
