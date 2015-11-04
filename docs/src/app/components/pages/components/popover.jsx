let React = require('react');
let { Popover, RaisedButton, SelectField, TextField } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let Code = require('popover-code');
let CodeExample = require('../../code-example/code-example');


let PopoverPage = React.createClass({
  getInitialState() {
    return {
      selectValue:'1',
      textValue:'here is a value',
    }
  },

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'anchorOrigin',
            type: 'origin object',
            header: 'optional',
            desc:
              'This is the point on the anchor where the popover targetOrigin will stick to.\n' +
              'Options:\n'+
              'vertical: [top, middle, bottom]\n' +
              'horizontal: [left, center, right]\n',
          },
          {
            name: 'targetOrigin',
            type: 'origin object',
            header: 'optional',
            desc:
              'This is the point on the popover which will stick to the anchors origin.' +
              'Options:'+
              'vertical: [top, middle, bottom]' +
              'horizontal: [left, center, right]',
          },
          {
            name: 'animated',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the popover will apply transitions when added it gets added to the DOM. In order for transitions ' +
              'to work, wrap the popover inside a ReactTransitionGroup.',
          },
          {
            name: 'autoCloseWhenOffScreen',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, the popover will hide when the anchor scrolls off the screen',
          },
          {
            name: 'canAutoPosition',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, the popover (potentially) ignore targetOrigin and anchorOrigin to make itself fit on screen,' +
            'which is useful for mobile devices.',
          },
          {
            name: 'childContextTypes',
            type: 'object',
            header: 'default: true',
            desc: 'React 0.13 hack to allow contexts to be passed through to the popover.  This is necessary because it' +
            'renders outside the owner in the DOM.',
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'show',
            header: 'Popover.show(anchor)',
            desc: 'Show the popover adjacent or over the anchor.',
          },
          {
            name: 'hide',
            header: 'Popover.hide()',
            desc: 'Hide the popover.',
          },
          {
            name: 'toggle',
            header: 'Popover.toggle(anchor)',
            desc: 'Show or hide the popover adjacent or over the anchor.',
          },
        ],
      },
    ];

    let menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    return (
      <ComponentDoc
        name="Popover"
        componentInfo={componentInfo}>
        <CodeExample code={Code}>
          <a onClick={this.show.bind(this, "pop")}>
            Click on me to show a popover
          </a>
          <br/>

          <a onClick={this.show.bind(this, "pop2")}>
            Click on me to show a with a nested popover (SelectField)
          </a>

          <Popover ref="pop"
            anchorEl={this.anchorEl}>
            <div style={{padding:20}}>
              <h2>Here is an arbitrary popover</h2>
              <p>Hi - here is some content</p>
              <RaisedButton primary={true} label="Here is a button"/>
            </div>
          </Popover>
          <Popover ref="pop2"
            anchorEl={this.anchorEl}>
            <div style={{padding:20}}>
              <h2>Here is an arbitrary popover</h2>
              <p>Hi - here is some content</p>
              <SelectField menuItems={menuItems} onChange={this.onChangeSelect} value={this.state.selectValue} />
              <TextField onChange={this.onChangeText} value={this.state.textValue} />
            </div>
          </Popover>
        </CodeExample>
      </ComponentDoc>
    );
  },

  show(ref, e) {
    this.refs[ref].show(e.currentTarget);
  },

  onChangeSelect(e) {
    this.setState({selectValue:e.target.value});
  },
  onChangeText(e) {
    this.setState({textValue:e.target.value});
  },


});

module.exports = PopoverPage;
