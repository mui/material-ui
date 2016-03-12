import React, {PropTypes} from 'react';
import {getMuiTheme} from '../styles';
import Paper from '../paper';

const Stepper = React.createClass({
  propTypes: {

    /**
     * The current active step index which passed by parent component.
     */
    activeStepIndex: PropTypes.number,

    /**
     * Children should be Step type.
     */
    children: PropTypes.node,

    /*
     * Override inline-style of the content container.
     */
    containerStyle: PropTypes.object,

    /**
     * Function used to create suitable icon for step base on state of the step.
     *
     * @param {node} Step component which is being updated .
     * @returns {node} - which will be shown in the left avatar.
     */
    createIcon: PropTypes.func,

    /**
     * If true, it will be horizontal stepper.
     */
    horizontal: PropTypes.bool,

    /**
     * Callback function that is fired when the header of step is touched.
     *
     * @param {number} stepIndex - The index of step is being touched.
     * @param {node} Step component which is being touched
     */
    onStepHeaderTouch: PropTypes.func,

    /**
     * Overrie inline-style of the step header wrapper.
     */
    stepHeadersWrapperStyle: PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * Callback function that is fired when re-render to update the background of left avatar.
     If not passed, it will use default theme
     *
     * @param {node}  Step component which is being updated
     * @returns {string} the background color of avatar
     */
    updateAvatarBackgroundColor: PropTypes.func,

    /**
     * Callback function that is fired  when re-render to update complete status of Step.
     *
     * @param {number} stepIndex - The step is being updated.
     * @param {node} Step component which is being updated
     * @returns {boolean} `true` if the step is completed.
     */
    updateCompletedStatusOfStep: PropTypes.func,


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
      activeStepIndex: -1,
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
    const controlButtonsGroupNode = this.refs.controlButtonsGroup;

    if (containerWrapperNode.style.height === '0px' &&
      nextProps.activeStepIndex > -1) {
      containerWrapperNode.style.height = `${(childrenWrapperNode.offsetHeight +
        controlButtonsGroupNode.offsetHeight + 40)}px`;
      childrenWrapperNode.style.transition = 'none';
    } else if (nextProps.activeStepIndex > this.getTotalSteps() - 1) {
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
      activeStepIndex,
    } = this.props;

    const itemWidth = this.state.itemWidth;
    const translateX = -activeStepIndex * itemWidth;

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
      activeStepIndex > -1 && {
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
       activeStepIndex,
       updateCompletedStatusOfStep,
    } = this.props;

    const {
      hoveredHeaderStepIndex,
    } = this.state;

    const setOfChildrens = [];
    const setOfControlButtonsGroup = [];

    const steps = React.Children.map(children, (step, index) => {
      setOfChildrens.push(step.props.children);
      setOfControlButtonsGroup.push(step.props.controlButtonsGroup);

      return React.cloneElement(step, {
        headerWidth: `${100 / this.getTotalSteps()}%`,
        key: index,
        stepIndex: index,
        isActive: activeStepIndex === index,
        isStepHeaderHovered: hoveredHeaderStepIndex === index,
        onStepHeaderTouch: onStepHeaderTouch,
        onStepHeaderHover: this._handleHeaderStepHover,
        isLastStep: index === (this.getTotalSteps() - 1),
        isFirstStep: index === 0,
        isCompleted: updateCompletedStatusOfStep(index, step),
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
              {setOfChildrens.map((children, index) =>
                <div style={{width: itemWidth}} key={index}>
                  {children}
                </div>)}
            </div>
          </div>
          <div style={{padding: 20, display: 'flex', justifyContent: 'flex-end'}} ref="controlButtonsGroup">
            {setOfControlButtonsGroup[activeStepIndex]}
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
     activeStepIndex,
     updateCompletedStatusOfStep,
   } = this.props;

    const {
      hoveredHeaderStepIndex,
    } = this.state;

    const steps = React.Children.map(children, (step, index) => {
      return React.cloneElement(step, {
        key: index,
        stepIndex: index,
        isActive: activeStepIndex === index,
        isStepHeaderHovered: hoveredHeaderStepIndex === index,
        onStepHeaderTouch: onStepHeaderTouch,
        onStepHeaderHover: this._handleHeaderStepHover,
        isLastStep: index === (this.getTotalSteps() - 1),
        isCompleted: updateCompletedStatusOfStep(index, step),
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
