import React, {Component, PropTypes} from 'react';
import Perf from 'react-addons-perf';
import reduce from 'lodash/fp/reduce';
import find from 'lodash/fp/find';

/**
 * TimeWaster
 * WIP Component
 *
 * Currently only helps measure wasted time, but more to come soon.
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
  };

  componentWillMount() {
    this.setTestProp();
  }

  componentDidMount() {
    this.runTest().then(() => this.endTest());
  }

  setTestProp(cb = () => {}) {
    const {testProp, testFn} = this.props;
    this.setState({
      [testProp]: testFn(),
    }, cb);
  }

  runTest() {
    let i = 0;
    Perf.start();
    return new Promise((resolve) => {
      const execTest = () => {
        i++;
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
    const summaryMap = Perf.getMeasurementsSummaryMap(measurements);
    const summary = reduce((result, n) => {
      result.push({
        component: n['Owner > component'],
        wasted: n['Wasted time (ms)'],
        instances: n.Instances,
      });
      return result;
    }, [])(summaryMap);

    summary.hasWastedTime = function(component) {
      const result = find((n) => n.component.indexOf(`> ${component}`), this);
      if (result) {
        return `${result.component} wasted ${result.wasted}ms across ${result.instances} instances`;
      }
      return false;
    };

    return this.props.onComplete(summary);
  }

  render() {
    const {children, testProp} = this.props;
    const testValue = this.state[testProp];

    return React.cloneElement(children, {
      [testProp]: testValue,
    });
  }
}
