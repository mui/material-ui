const React = require('react');
const { CircularProgress, LinearProgress, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('progress-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

const ProgressPage = React.createClass({

  getInitialState () {
    return {
      completed: 0,
    };
  },

  componentDidMount() {
    let self = this;

    let id = window.setInterval(() => {

      let diff = Math.random() * 10;

      self.setState({
        completed: self.state.completed + diff,
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
            desc: 'The mode of show your progress, indeterminate for when there is no value for progress. ',
          },
          {
            name: 'value',
            type: 'number',
            header: 'default: 0',
            desc: 'The value of progress, only works in determinate mode. ',
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 100',
            desc: 'The max value of progress, only works in determinate mode. ',
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The min value of progress, only works in determinate mode. ',
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 1',
            desc: 'The size of the progress.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the progress\'s root element.',
          },
        ],
      },
    ];


    return (
      <ComponentDoc
        name="Progress"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst CircularProgress = require(\'material-ui/lib/circular-progress\');\n' +
            'const LinearProgress = require(\'material-ui/lib/linear-progress\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

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
  },

});

module.exports = ProgressPage;
