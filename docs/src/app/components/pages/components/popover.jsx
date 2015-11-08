let React = require('react');
let { Popover, RadioButton, RaisedButton, SelectField, TextField } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let Code = require('popover-code');
let CodeExample = require('../../code-example/code-example');


let PopoverPage = React.createClass({
  getInitialState() {
    return {
      selectValue:'1',
      textValue:'here is a value',
      activePopover:'none',
      anchorOrigin:{horizontal:'left', vertical:'bottom'},
      targetOrigin:{horizontal:'left', vertical:'top'},
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
            desc: 'If true, the popover will apply transitions when added it gets added to the DOM.',
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
            desc: 'If true, the popover (potentially) ignores targetOrigin and anchorOrigin to make itself fit on screen,' +
            'which is useful for mobile devices.',
          },
          {
            name: 'open',
            type: 'bool',
            header: 'default: false',
            desc: 'Controls the visibility of the popover.',
          },
          {
            name: 'onRequestClose',
            type: 'func',
            header: 'default: no-op',
            desc: 'This is a callback that fires when the popover thinks it should close. (e.g. click-away or scroll off-screen)',
          },
          {
            name: 'zDepth',
            type: 'oneOf [0,1,2,3,4,5]',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.',
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
          <RaisedButton onClick={this.show.bind(this, "pop")} label="Click on me to show a popover" />
          <br/>
          <br/>

          <em>Note that in this version, the select field causes nasty scrolling,
          an upcoming PR will fix, which updates SelectField to use the popover for itself!</em>
          <br/>
          <h2>Position Options</h2>
          <p>Use the settings below to toggle the positioning of the popovers above</p>
          <strong>Current Settings</strong>
          <br/>
          <pre>
            anchorOrigin: {JSON.stringify(this.state.anchorOrigin)}
            <br/>
            targetOrigin: {JSON.stringify(this.state.targetOrigin)}
          </pre>
          <h3>Anchor Origin</h3>
          <div style={{float:'left'}}>
            <strong>Vertical</strong>
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'top')} label="Top" checked={this.state.anchorOrigin.vertical === "top"} />
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'center')} label="Center" checked={this.state.anchorOrigin.vertical === "center"} />
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'bottom')} label="Bottom" checked={this.state.anchorOrigin.vertical === "bottom"} />
          </div>
          <div style={{float:'left'}}>
            <strong>Horizontal</strong>
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'left')} label="Left" checked={this.state.anchorOrigin.horizontal === "left"} />
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'middle')} label="Middle" checked={this.state.anchorOrigin.horizontal === "middle"} />
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'right')} label="Right" checked={this.state.anchorOrigin.horizontal === "right"} />
          </div>
          <br style={{clear:'both'}} />
          <br style={{clear:'both'}} />

          <h3>Target Origin</h3>
          <div style={{float:'left'}}>
            <strong>Vertical</strong>
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'top')} label="Top" checked={this.state.targetOrigin.vertical === "top"} />
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'center')} label="Center" checked={this.state.targetOrigin.vertical === "center"} />
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'bottom')} label="Bottom" checked={this.state.targetOrigin.vertical === "bottom"} />
          </div>
          <div style={{float:'left'}}>
            <strong>Horizontal</strong>
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'left')} label="Left" checked={this.state.targetOrigin.horizontal === "left"} />
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'middle')} label="Middle" checked={this.state.targetOrigin.horizontal === "middle"} />
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'right')} label="Right" checked={this.state.targetOrigin.horizontal === "right"} />
          </div>

          <Popover open={this.state.activePopover === 'pop'}
            anchorEl={this.state.anchorEl}
            anchorOrigin={this.state.anchorOrigin}
            targetOrigin={this.state.targetOrigin}
            onRequestClose={this.closePopover.bind(this, 'pop')} >
            <div style={{padding:20}}>
              <h2>Here is an arbitrary popover</h2>
              <p>Hi - here is some content</p>
              <RaisedButton primary={true} label="Here is a button"/>
            </div>
          </Popover>
        </CodeExample>
      </ComponentDoc>
    );
  },

  show(key, e) {
    this.setState({
      activePopover:key,
      anchorEl:e.currentTarget,
    });
  },

  closePopover(key) {
    if (this.state.activePopover !== key)
      return
    this.setState({
      activePopover:'none',
    });
  },

  setAnchor(positionElement, position, e) {
    let {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
        anchorOrigin:anchorOrigin,
    });
  },

  setTarget(positionElement, position, e) {
    let {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
        targetOrigin:targetOrigin,
    });
  },

});

module.exports = PopoverPage;
