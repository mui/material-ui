import React, {PropTypes} from 'react';
import {getMuiTheme} from '../styles';
import Paper from '../paper';

const Stepper = React.createClass({
  propTypes: {
    /**
     * Set the active step.
     */
    activeStep: PropTypes.number,

    /**
     * Should be two or more `HorizontalStep` or `VerticalStep`.
     */
    children: PropTypes.node,

    /**
     * Override the inline-style of the content container.
     */
    containerStyle: PropTypes.object,

    /**
     * Function used to set a suitable icon for the step, based on the current state of the step.
     *
     * @param {node} Step Component that is being updated.
     * @returns {node} - Icon that will be shown for the step.
     */
    createIcon: PropTypes.func,

    /**
     * If true, it will be horizontal stepper. Should match the step type used for `children`.
     */
    horizontal: PropTypes.bool,

    /**
     * Callback function fired when the step header is touched.
     *
     * @param {number} stepIndex - The index of step is being touched.
     * @param {node} Step component that is being touched.
     */
    onStepHeaderTouch: PropTypes.func,

    /**
     * Override the inline-style of the step header wrapper.
     */
    stepHeadersWrapperStyle: PropTypes.object,

    /**
     * Override the inline-style of the root element.
     */
    style: PropTypes.object,

    /**
     * Callback function fired on re-render to set the background color of the icon.
     * If not passed, it will use the default theme.
     *
     * @param {node}  Step Component which is being updated.
     * @returns {string} The background color of the icon.
     */
    updateAvatarBackgroundColor: PropTypes.func,

    /**
     * Callback function fired on re-render to update the completed status of the step.
     *
     * @param {number} stepIndex - The step that is being updated.
     * @param {node} Step Component that is being updated.
     * @returns {boolean} `true` if the step is completed.
     */
    updateCompletedStatus: PropTypes.func,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
    createIcon: PropTypes.func,
    updateAvatarBackgroundColor: PropTypes.func,
  },

  getDefaultProps() {
    return {
      activeStep: -1,
      onStepHeaderTouch: () => {},
      updateAvatarBackgroundColor: () => null,
      style: {},
      horizontal: false,
    };
  },

  getInitialState() {
    return {
      hoveredHeaderStepIndex: -1,
      muiTheme: this.context.muiTheme || getMuiTheme(),
      itemWidth: 0,
    };
  },


  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      createIcon: this.props.createIcon,
      updateAvatarBackgroundColor: this.props.updateAvatarBackgroundColor,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.horizontal) {
      return;
    }

    const childrenWrapperNode = this.refs.childrenWrapper;
    const containerWrapperNode = this.refs.containerWrapper;
    const actionsNode = this.refs.actions;

    if (containerWrapperNode.style.height === '0px' &&
      nextProps.activeStep > -1) {
      containerWrapperNode.style.height = `${(childrenWrapperNode.offsetHeight +
        actionsNode.offsetHeight + 40)}px`;
      childrenWrapperNode.style.transition = 'none';
    } else if (nextProps.activeStep > this.getTotalSteps() - 1) {
      containerWrapperNode.style.height = '0px';
    } else {
      childrenWrapperNode.style.transition = 'all 1s';
    }
  },

  getTotalSteps() {
    return React.Children.count(this.props.children);
  },

  getStylesForHorizontalStepper() {
    const {
      stepHeadersWrapperStyle,
      containerStyle,
      style,
      activeStep,
    } = this.props;

    const itemWidth = this.state.itemWidth;
    const translateX = -activeStep * itemWidth;

    const childrenWrapper = {
      transform: `translate3d(${translateX}px, 0px, 0px)`,
      transition: 'all 1s',
    };

    const stepHeadersWrapper = Object.assign({
      display: 'flex',
      width: '100%',
      margin: '0 auto',
    }, stepHeadersWrapperStyle);

    const wrapper = Object.assign({
      overflow: 'hidden',
    },
      activeStep > -1 && {
        transition: 'all 0.5s',
      },
      style
    );


    const container = Object.assign({
      transition: 'all 0.5s',
      height: 0,
    }, containerStyle);

    return {
      wrapper: wrapper,
      container: container,
      stepHeadersWrapper: stepHeadersWrapper,
      childrenWrapper: childrenWrapper,
    };
  },

  _handleHeaderStepHover(stepIndex) {
    this.setState({
      hoveredHeaderStepIndex: stepIndex,
    });
  },

  findFurthestOptionalStep(index) {
    const {
      children,
    } = this.props;

    while (index > 0 && children[index - 1].props.optional) {
      index--;
    }
    return index;
  },

  renderHorizontalStepper() {
    const {
       children,
       onStepHeaderTouch,
       activeStep,
       updateCompletedStatus,
    } = this.props;

    const {
      hoveredHeaderStepIndex,
    } = this.state;

    const setOfChildren = [];
    const setOfActions = [];

    const steps = React.Children.map(children, (step, index) => {
      setOfChildren.push(step.props.children);
      setOfActions.push(step.props.actions);

      return React.cloneElement(step, {
        headerWidth: `${100 / this.getTotalSteps()}%`,
        key: index,
        stepIndex: index,
        isActive: activeStep === index,
        isStepHeaderHovered: hoveredHeaderStepIndex === index,
        onStepHeaderTouch: onStepHeaderTouch,
        onStepHeaderHover: this._handleHeaderStepHover,
        isLastStep: index === (this.getTotalSteps() - 1),
        isFirstStep: index === 0,
        isCompleted: updateCompletedStatus(index, step),
        previousStepOptionalIndex: this.findFurthestOptionalStep(index),
      });
    });

    const itemWidth = this.state.itemWidth;
    const styles = this.getStylesForHorizontalStepper();

    return (
      <div style={styles.wrapper} ref={
        (input) => {
          if (input !== null && !this.state.itemWidth) {
            this.setState({
              itemWidth: input.offsetWidth,
            });
          }
        }
      }
      >
        <Paper style={styles.stepHeadersWrapper}>
          {steps}
        </Paper>


        <div style={styles.container} ref="containerWrapper">
          <div style={styles.childrenWrapper} ref="childrenWrapper">
            <div style={{display: 'inline-flex'}}>
              {setOfChildren.map((children, index) =>
                <div style={{width: itemWidth}} key={index}>
                  {children}
                </div>)}
            </div>
          </div>
          <div style={{padding: 20, display: 'flex', justifyContent: 'flex-end'}} ref="actions">
            {setOfActions[activeStep]}
          </div>
        </div>
      </div>
    );
  },

  renderVerticalStepper() {
    const {
     style,
     children,
     onStepHeaderTouch,
     activeStep,
     updateCompletedStatus,
   } = this.props;

    const {
      hoveredHeaderStepIndex,
    } = this.state;

    const steps = React.Children.map(children, (step, index) => {
      return React.cloneElement(step, {
        key: index,
        stepIndex: index,
        isActive: activeStep === index,
        isStepHeaderHovered: hoveredHeaderStepIndex === index,
        onStepHeaderTouch: onStepHeaderTouch,
        onStepHeaderHover: this._handleHeaderStepHover,
        isLastStep: index === (this.getTotalSteps() - 1),
        isCompleted: updateCompletedStatus(index, step),
        previousStepOptionalIndex: this.findFurthestOptionalStep(index),
      });
    });

    return (
      <div style={style}>
        {steps}
      </div>
    );
  },

  render() {
    const {
      horizontal,
    } = this.props;

    if (horizontal) {
      return this.renderHorizontalStepper();
    }

    return this.renderVerticalStepper();
  },


});

export default Stepper;
