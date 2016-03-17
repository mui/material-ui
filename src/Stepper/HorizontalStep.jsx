import React from 'react';
import TouchRipple from '../ripples/touch-ripple';
import Avatar from '../avatar';
import {getMuiTheme} from '../styles';

const HorizontalStep = React.createClass({
  propTypes: {

    /**
     * @ignore
     * The width of step header, unit is % which passed from Stepper.
     */
    headerWidth: React.PropTypes.string,

    /**
     * @ignore
     * If true, the step is active.
     */
    isActive: React.PropTypes.bool,

    /**
     * @ignore
     * If true, the step is completed.
     */
    isCompleted: React.PropTypes.bool,

    /**
     * @ignore
     * If true, the step is the first step.
     */
    isFirstStep: React.PropTypes.bool,

    /**
     * @ignore
     * If true, the step is the last step.
     */
    isLastStep: React.PropTypes.bool,

    /**
     * @ignore
     * If true, the step header is hovered.
     */
    isStepHeaderHovered: React.PropTypes.bool,

    /**
     * @ignore
     * Callback function will be called when step header is hovered.
     */
    onStepHeaderHover: React.PropTypes.func,

    /**
     * @ignore
     * Call back function will be called when step header is touched.
     */
    onStepHeaderTouch: React.PropTypes.func,

    /**
     * Override inline-style of step header wrapper.
     */
    stepHeaderWrapperStyle: React.PropTypes.object,

    /**
     * @ignore
     * The index of step in array of Steps.
     */
    stepIndex: React.PropTypes.number,

    /**
     * The label of step which be shown in step header.
     */
    stepLabel: React.PropTypes.node,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    createIcon: React.PropTypes.func,
    updateAvatarBackgroundColor: React.PropTypes.func,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },


  getStyles() {
    const {
      headerWidth,
      isActive,
      isCompleted,
      isStepHeaderHovered,
      stepHeaderWrapperStyle,
    } = this.props;

    const theme = this.state.muiTheme.stepper;

    const customAvatarBackgroundColor = this.context.updateAvatarBackgroundColor(this);
    const avatarBackgroundColor = customAvatarBackgroundColor ||
    ((isActive || isCompleted) ?
      theme.activeAvatarColor :
      isStepHeaderHovered ?
      theme.hoveredAvatarColor :
      theme.inactiveAvatarColor);

    const stepHeaderWrapper = Object.assign({
      width: headerWidth,
      display: 'table-cell',
      position: 'relative',
      padding: 24,
      color: theme.inactiveTextColor,
      cursor: 'pointer',
    },
      stepHeaderWrapperStyle,
      isStepHeaderHovered && !isActive && {
        backgroundColor: theme.hoveredHeaderColor,
        color: theme.hoveredTextColor,

      }, (isActive || (isActive && isStepHeaderHovered) || isCompleted) && {
        color: theme.activeTextColor,

      }
    );

    const avatar = {
      backgroundColor: avatarBackgroundColor,
      color: 'white',
      margin: '0 auto',
      // display: 'block',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const stepLabel = {
      marginTop: 8,
      fontSize: 14,
      fontWeight: 'normal',
      textAlign: 'center',
    };

    const connectorLine = {
      top: 36,
      height: 1,
      borderTop: '1px solid #BDBDBD',
      position: 'absolute',
    };

    const connectorLineLeft = Object.assign({
      left: 0,
      right: '50%',
      marginRight: 16,
    }, connectorLine);

    const connectorLineRight = Object.assign({
      right: 0,
      left: '50%',
      marginLeft: 16,
    }, connectorLine);

    const stepLabelWrapper = {
      margin: '0 auto',
      textAlign: 'center',
    };

    const styles = {
      stepHeaderWrapper: stepHeaderWrapper,
      avatar: avatar,
      stepLabel: stepLabel,
      connectorLineLeft: connectorLineLeft,
      connectorLineRight: connectorLineRight,
      stepLabelWrapper: stepLabelWrapper,
    };

    return styles;
  },

  handleStepHeaderTouch() {
    this.props.onStepHeaderTouch(this.props.stepIndex, this);
  },


  handleStepHeaderMouseHover() {
    this.props.onStepHeaderHover(this.props.stepIndex);
  },

  handleStepHeaderMouseLeave() {
    this.props.onStepHeaderHover(-1);
  },

  render() {
    const styles = this.getStyles();
    const {
      isFirstStep,
      isLastStep,
      stepLabel,
    } = this.props;

    const icon = this.context.createIcon(this);
    const avatarView = <Avatar size={24} style={styles.avatar} icon={icon} />;

    return (
      <div
        style={styles.stepHeaderWrapper}
        onClick={this.handleStepHeaderTouch}
        onMouseOver={this.handleStepHeaderMouseHover}
        onMouseLeave={this.handleStepHeaderMouseLeave}
      >
        <TouchRipple muiTheme={this.state.muiTheme}>
          {avatarView}
          <div style={styles.stepLabel}>{stepLabel}</div>
          {!isFirstStep && <div style={styles.connectorLineLeft}></div>}
          {!isLastStep && <div style={styles.connectorLineRight}></div>}
        </TouchRipple>
      </div>
    );
  },
});

export default HorizontalStep;
