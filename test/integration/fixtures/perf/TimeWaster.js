// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Perf from 'react-addons-perf';
import { find } from 'src/utils/helpers';
import randomWords from 'random-words';

/**
 * TimeWaster
 * WIP Component
 */
export default class TimeWaster extends Component {
  static propTypes = {
    children: PropTypes.any,
    loops: PropTypes.number,
    onComplete: PropTypes.func,
    testFn: PropTypes.func,
    testProp: PropTypes.string,
  };

  static defaultProps = {
    loops: 100,
    testFn: () => randomWords(1)[0],
    testProp: 'data-test-prop',
  };

  state = {};

  componentWillMount() {
    this.setTestProp();
  }

  componentDidMount() {
    this.runTest().then(() => this.endTest());
  }

  setTestProp(cb = () => {}) {
    const { testProp, testFn } = this.props;
    this.setState(
      {
        [testProp]: testFn(),
      },
      cb,
    );
  }

  runTest() {
    let i = 0;
    Perf.start();
    return new Promise(resolve => {
      const execTest = () => {
        i += 1;
        setTimeout(() => {
          if (i < this.props.loops) {
            this.setTestProp(execTest);
          } else {
            Perf.stop();
            resolve(Perf);
          }
        }, 10);
      };
      execTest();
    });
  }

  endTest() {
    const measurements = Perf.getLastMeasurements();
    const wasted = Perf.getWasted(measurements);

    const summary = {};

    summary.hasWastedTime = component => {
      const result = find(wasted, n => n.key.indexOf(`> ${component}`));
      if (result) {
        return (
          `${result.key} wasted ${result.inclusiveRenderDuration}ms ` +
          `across ${result.renderCount} renders`
        );
      }
      return false;
    };

    return this.props.onComplete(summary);
  }

  render() {
    const { children, testProp } = this.props;
    const testValue = this.state[testProp];

    return React.cloneElement(React.Children.only(children), {
      [testProp]: testValue,
    });
  }
}
