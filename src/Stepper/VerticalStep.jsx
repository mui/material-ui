import React, {PropTypes} from 'react';

import TouchRipple from '../ripples/touch-ripple';
import Avatar from '../avatar';

import {getMuiTheme} from '../styles';

const Step = React.createClass({
  propTypes: {
    /**
     * An array of nodes for handling moving or canceling steps.
     */
    actions: PropTypes.arrayOf(PropTypes.node),

    /**
     * Override the inline-style of the div which contains the actions.
     */
    actionsWrapperStyle: PropTypes.object,

    children: PropTypes.node,

    /**
     * Override the inline-style of the div which contains all the children, including control button groups.
     */
    childrenWrapperStyle: PropTypes.object,

    /**
     * Override the inline-style of the connector line.
     */
    connectorLineStyle: PropTypes.object,

    /**
     * @ignore
     * If true, the step is active.
     */
    isActive: PropTypes.bool,

    /**
     * @ignore
     * If true, the step is completed.
     */
    isCompleted: PropTypes.bool,

    /**
     * @ignore
     * If true, the step is the last one.
     */
    isLastStep: PropTypes.bool,

    /**
     * @ignore
     * If true, the header of step is hovered.
     */
    isStepHeaderHovered: PropTypes.bool,

    /**
     * @ignore
     * Callback function fired when the header of step is hovered.
     */
    onStepHeaderHover: PropTypes.func,

    /**
     * @ignore
     * Callback function fired when the header of step is touched.
     */
    onStepHeaderTouch: PropTypes.func,

    /**
     * @ignore
     * The index of the furthest optional step.
     */
    previousStepOptionalIndex: PropTypes.number,

    /**
     * Override the inline-style of step container, which contains connector line and children.
     */
    stepContainerStyle: PropTypes.object,

    /**
     * Override the inline-style of step header (not including left avatar).
     */
    stepHeaderStyle: PropTypes.object,

    /**
     * Override the inline-style of step header wrapper, including left avatar.
     */
    stepHeaderWrapperStyle: PropTypes.object,

    /**
     * @ignore
     * The index of step in array of Steps.
     */
    stepIndex: PropTypes.number,

    /**
     * Customize the step label.
     */
    stepLabel: PropTypes.node,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
    createIcon: PropTypes.func,
    updateAvatarBackgroundColor: PropTypes.func,
  },

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

  componentDidMount() {
    const {
      isActive,
    } = this.props;

    if (isActive) {
      const childrenWrapperNode = this.refs.childrenWrapper;
      childrenWrapperNode.style.opacity = 1;

      const containerWrapper = this.refs.containerWrapper;
      containerWrapper.style.height = `${childrenWrapperNode.children[0].offsetHeight}px`;

      setTimeout(() => {
        containerWrapper.style.height = 'auto';
        childrenWrapperNode.style.height = 'auto';
      }, 300);
    }
  },

  componentWillReceiveProps(nextProps) {
    const {
      isActive,
    } = this.props;

    if (!isActive && nextProps.isActive) {
      const childrenWrapperNode = this.refs.childrenWrapper;
      childrenWrapperNode.style.opacity = 1;

      const containerWrapper = this.refs.containerWrapper;
      containerWrapper.style.height = `${childrenWrapperNode.children[0].offsetHeight}px`;

      setTimeout(() => {
        containerWrapper.style.height = 'auto';
        childrenWrapperNode.style.height = 'auto';
      }, 300);
    }

    if (isActive && !nextProps.isActive) {
      const childrenWrapperNode = this.refs.childrenWrapper;
      childrenWrapperNode.style.opacity = '0';
      childrenWrapperNode.style.height = '100%';

      const containerWrapper = this.refs.containerWrapper;
      containerWrapper.style.height = '32px';
    }
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


  getStyles() {
    const {
      isActive,
      isCompleted,
      isStepHeaderHovered,

      stepHeaderStyle,
      stepHeaderWrapperStyle,
      connectorLineStyle,
      stepContainerStyle,
      actionsWrapperStyle,
      childrenWrapperStyle,
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
      cursor: 'pointer',
      color: theme.inactiveTextColor,
      paddingLeft: 24,
      paddingTop: 24,
      paddingBottom: 24,
      marginTop: -32,
      position: 'relative',

    },

    stepHeaderWrapperStyle,

    isStepHeaderHovered && !isActive && {
      backgroundColor: theme.hoveredHeaderColor,
      color: theme.hoveredTextColor,

    }, (isActive || (isActive && isStepHeaderHovered) || isCompleted) && {
      color: theme.activeTextColor,

    }, this.props.stepIndex === 0 && {
      marginTop: 0,
    });

    const stepContainer = Object.assign({
      paddingLeft: 36,
      position: 'relative',
      height: 32,
      transition: 'height 0.2s',

    },

    stepContainerStyle,

    isActive && {
      paddingBottom: 36 + 24,
      marginBottom: 8,
      marginTop: -8,
    });

    const connectorLine = Object.assign({
      borderLeft: '1px solid',
      borderLeftColor: theme.connectorLineColor,
      height: '100%',
      position: 'absolute',
      marginTop: -16,

    },

    connectorLineStyle,

    isActive && {
      marginTop: -8,
    });

    const actionsWrapper = Object.assign({
      marginTop: 16,
    }, actionsWrapperStyle);

    const childrenWrapper = Object.assign({
      paddingLeft: 24,
      transition: 'height 0.05s',
      opacity: 0,
      overflow: 'hidden',
    }, childrenWrapperStyle);

    const stepHeader = Object.assign({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }, stepHeaderStyle);

    return {
      avatar: {
        backgroundColor: avatarBackgroundColor,
        fontSize: 12,
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      stepHeaderWrapper: stepHeaderWrapper,
      stepContainer: stepContainer,
      connectorLine: connectorLine,
      actionsWrapper: actionsWrapper,
      childrenWrapper: childrenWrapper,
      stepHeader: stepHeader,
    };
  },

  render() {
    const {
      children,
      stepLabel,
      actions,
      isLastStep,
    } = this.props;


    const styles = this.getStyles();

    const icon = this.context.createIcon(this);

    const avatarView = <Avatar size={24} style={styles.avatar} icon={icon} />;

    return (
      <div>
        <div
          style={styles.stepHeaderWrapper}
          onClick={this.handleStepHeaderTouch}
          onMouseOver={this.handleStepHeaderMouseHover}
          onMouseLeave={this.handleStepHeaderMouseLeave}
        >
          <TouchRipple muiTheme={this.state.muiTheme}>
            <div style={styles.stepHeader}>
              {avatarView}
              {stepLabel}
            </div>
          </TouchRipple>
        </div>
        <div style={styles.stepContainer} ref="containerWrapper">
          {!isLastStep && <div style={styles.connectorLine}></div>}
          {<div style={styles.childrenWrapper} ref="childrenWrapper">
            <div>
              <div>
                  {children}
              </div>
              <div style={styles.actionsWrapper}>
                  {actions}
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  },


});

export default Step;
