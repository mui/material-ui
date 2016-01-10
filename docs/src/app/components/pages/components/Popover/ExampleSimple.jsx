import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
import RadioButton from 'material-ui/lib/radio-button';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  popover: {
    padding: 20,
  },
  h3: {
    marginTop: 20,
    fontWeight: 400,
  },
  block: {
    display: 'flex',
  },
  block2: {
    margin: 10,
  },
};

export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  setAnchor = (positionElement, position) => {
    const {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin,
    });
  };

  setTarget = (positionElement, position) => {
    const {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Click on me to show a popover"
        />
        <h3 style={styles.h3}>Current Settings</h3>
        <pre>
          anchorOrigin: {JSON.stringify(this.state.anchorOrigin)}
          <br/>
          targetOrigin: {JSON.stringify(this.state.targetOrigin)}
        </pre>
        <h3 style={styles.h3}>Position Options</h3>
        <p>Use the settings below to toggle the positioning of the popovers above</p>
        <h3 style={styles.h3}>Anchor Origin</h3>
        <div style={styles.block}>
          <div style={styles.block2}>
            <span>Vertical</span>
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'top')}
              label="Top" checked={this.state.anchorOrigin.vertical === 'top'} />
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'center')}
              label="Center" checked={this.state.anchorOrigin.vertical === 'center'} />
            <RadioButton onClick={this.setAnchor.bind(this, 'vertical', 'bottom')}
              label="Bottom" checked={this.state.anchorOrigin.vertical === 'bottom'} />
          </div>
          <div style={styles.block2}>
            <span>Horizontal</span>
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'left')}
              label="Left" checked={this.state.anchorOrigin.horizontal === 'left'} />
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'middle')}
              label="Middle" checked={this.state.anchorOrigin.horizontal === 'middle'} />
            <RadioButton onClick={this.setAnchor.bind(this, 'horizontal', 'right')}
              label="Right" checked={this.state.anchorOrigin.horizontal === 'right'} />
          </div>
        </div>
        <h3 style={styles.h3}>Target Origin</h3>
        <div style={styles.block}>
          <div style={styles.block2}>
            <span>Vertical</span>
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'top')}
              label="Top" checked={this.state.targetOrigin.vertical === 'top'} />
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'center')}
              label="Center" checked={this.state.targetOrigin.vertical === 'center'} />
            <RadioButton onClick={this.setTarget.bind(this, 'vertical', 'bottom')}
              label="Bottom" checked={this.state.targetOrigin.vertical === 'bottom'} />
          </div>
          <div style={styles.block2}>
            <span>Horizontal</span>
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'left')}
              label="Left" checked={this.state.targetOrigin.horizontal === 'left'} />
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'middle')}
              label="Middle" checked={this.state.targetOrigin.horizontal === 'middle'} />
            <RadioButton onClick={this.setTarget.bind(this, 'horizontal', 'right')}
              label="Right" checked={this.state.targetOrigin.horizontal === 'right'} />
          </div>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <div style={styles.popover}>
            <RaisedButton primary={true} label="Here is a button"/>
          </div>
        </Popover>
      </div>
    );
  }
}
