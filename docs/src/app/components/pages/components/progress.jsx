let React = require('react');
let { CircularProgress, LinearProgress } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let Code = require('progress-code');
let CodeExample = require('../../code-example/code-example');


let ProgressPage = React.createClass({

  getInitialState () {
    return {
      completed: 0
    };
  },

  componentDidMount() {
    let self = this;

    let id = window.setInterval(() => {

      let diff = Math.random() * 10;

      self.setState({
        completed: self.state.completed + diff
      });

      if (self.state.completed > 100) {
        window.clearInterval(id);
      }
    }, 1000);
  },

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'mode',
            type: 'one of: determinate, indeterminate',
            header: 'default: indeterminate',
            desc: 'The mode of show your progress, indeterminate for when there is no value for progress. '
          },
          {
            name: 'value',
            type: 'number',
            header: 'default: 0',
            desc: 'The value of progress, only works in determinate mode. '
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 100',
            desc: 'The max value of progress, only works in determinate mode. '
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The min value of progress, only works in determinate mode. '
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 1',
            desc: 'The size of the progress.'
          }
        ]
      },
    ];


    return (
      <ComponentDoc
        name="Progress"
        componentInfo={componentInfo}>
        <CodeExample code={Code}>
          <h2>Linear Progress</h2>
          <p>
            Determinate
          </p>
          <LinearProgress mode="determinate" value={this.state.completed} />
          <p>
            Indeterminate
          </p>
          <LinearProgress mode="indeterminate"  />

          <br/><br/>
          <h2>Circular Progress</h2>
          <p>
            Determinate
          </p>
          <CircularProgress mode="determinate" value={this.state.completed} />
          <CircularProgress mode="determinate" value={this.state.completed} size={1.5} />
          <CircularProgress mode="determinate" value={this.state.completed} size={2} />
          <p>
            Indeterminate
          </p>
          <CircularProgress mode="indeterminate"  />
          <CircularProgress mode="indeterminate" size={1.5} />
          <CircularProgress mode="indeterminate" size={2} />
        </CodeExample>
      </ComponentDoc>
    );
  }

});

module.exports = ProgressPage;
