import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import { CircularProgress } from 'material-ui/Progress';
import { green } from 'material-ui/styles/colors';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('CircularFab', () => {
  return {
    wrapper: {
      position: 'relative',
      successButton: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
    },
    progress: {
      position: 'absolute',
      top: -2,
      left: -2,
    },
  };
});

export default class CircularFab extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    loading: false,
    success: false,
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState({
        success: false,
        loading: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            loading: false,
            success: true,
          });
        }, 2000);
      });
    }
  };

  render() {
    const { loading, success } = this.state;
    const classes = this.context.styleManager.render(styleSheet);
    let buttonClass = '';

    if (success) {
      buttonClass = classes.successButton;
    }

    return (
      <div className={classes.wrapper}>
        <Button
          fab
          primary
          className={buttonClass}
          onClick={this.handleButtonClick}
        >
          <span className="material-icons">{success ? 'check' : 'save'}</span>
        </Button>
        {loading && <CircularProgress size={60} className={classes.progress} />}
      </div>
    );
  }
}

