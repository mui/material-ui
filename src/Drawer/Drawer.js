// @flow weak
import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../transitions/Slide';
function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  } else if (anchor === 'bottom') {
    return 'up';
  }
  return 'left';
}
let openNavEventHandler = null;
export const styleSheet = createStyleSheet('Drawer', (theme) => {
  return {
    paper: {
      overflowY: 'auto',
      // display: 'flex',
      // flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      position: 'fixed',
      top: 0,
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none',
      },
      WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    },
    docked: {
      flex: '0 0 auto',
      '& $paper': {
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
    modal: {},
  };
});
/**
 * This is a drawer.
 */
export default class Drawer extends Component {
  static propTypes = {
    anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    /**
     * The contents of the `Drawer`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If set to true, the drawer will dock itself
     * and will no longer slide in with an overlay.
     */
    docked: PropTypes.bool,
    onRequestChange: PropTypes.func,
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    
    disableSwipeToOpen: PropTypes.bool,
    swipeAreaWidth: PropTypes.number,
    width: PropTypes.number,
    paperClassName: PropTypes.string,
    zDepth: PropTypes.number,
  };
  static defaultProps = {
    disableSwipeToOpen: false,
    docked: false,
    open: false,
    swipeAreaWidth: 30,
    width: null,
    zDepth: 16,
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  
  componentWillMount() {
    this.maybeSwiping = false;
    this.touchStartX = null;
    this.touchStartY = null;
    this.swipeStartX = null;
    this.setState({
      open: (this.props.open !== null ) ? this.props.open : this.props.docked,
      swiping: null,
      transformCSS: 0
    });
  }
  
  componentDidMount() {
    this.enableSwipeHandling();
  }
  
  componentWillReceiveProps(nextProps) {
    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) {
      this.setState({
        open: nextProps.open, transformCSS: 0
      });
      // Otherwise, if docked is changed, change the open state for when uncontrolled.
    } else if (this.props.docked !== nextProps.docked) {
      this.setState({
        open: nextProps.docked, transformCSS: 0
      });
    }
  }
  
  componentDidUpdate() {
    this.enableSwipeHandling();
  }
  
  componentWillUnmount() {
    this.disableSwipeHandling();
  }
  
  handleKeyUp = (event) => {
    if (this.state.open && !this.props.docked && keycode(event) === 'esc') {
      this.close('escape');
    }
  };
  
  close(reason) {
    console.log(reason)
    this.setState({
      open: false, transformCSS: 0
    });
    // if (this.props.open === null) this.setState({ open: false });
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    /*document.body.removeEventListener('touchmove', this.onBodyTouchMove);
     document.body.removeEventListener('touchend', this.onBodyTouchEnd);
     document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);*/
    return this;
  }
  
  open(reason) {
    this.setState({
      open: true, transformCSS: this.state.transformCSS
    });
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  }
  
  getMaxTranslateX() {
    const width = this.props.width;
    return width + 10;
  }
  
  getTranslateMultiplier() {
    return this.props.openSecondary ? 1 : -1;
  }
  
  enableSwipeHandling() {
    if (!this.props.docked) {
      document.body.addEventListener('touchstart', this.onBodyTouchStart);
      if (!openNavEventHandler) {
        openNavEventHandler = this.onBodyTouchStart;
      }
    } else {
      this.disableSwipeHandling();
    }
  }
  
  disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this.onBodyTouchStart);
    if (openNavEventHandler === this.onBodyTouchStart) {
      openNavEventHandler = null;
    }
  }
  
  onBodyTouchStart = (event) => {
    console.log("starttouch")
    const swipeAreaWidth = this.props.swipeAreaWidth;
    const touchStartX = event.touches[0].pageX;
    const touchStartY = event.touches[0].pageY;
    // Open only if swiping from far left (or right) while closed
    if (swipeAreaWidth !== null && !this.state.open) {
      if (this.props.openSecondary) {
        // If openSecondary is true calculate from the far right
        if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
      } else {
        // If openSecondary is false calculate from the far left
        if (touchStartX > swipeAreaWidth) return;
      }
    }
    if (!this.state.open &&
      (openNavEventHandler !== this.onBodyTouchStart ||
      this.props.disableSwipeToOpen)
    ) {
      return;
    }
    this.maybeSwiping = true;
    this.touchStartX = touchStartX;
    this.touchStartY = touchStartY;
    document.body.addEventListener('touchmove', this.onBodyTouchMove);
    document.body.addEventListener('touchend', this.onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
  };
  
  setPosition(translateX) {
    let trans = this.getTranslateMultiplier() * translateX;
    this.setState({
      open: this.state.open,
      transformCSS: trans
    });
    // this.refs.overlay.setOpacity(1 - translateX / this.getMaxTranslateX());
    //autoPrefix.set(drawer.style, 'transform', transformCSS);
  }
  
  getTranslateX(currentX) {
    console.log(this.getTranslateMultiplier() * (currentX - this.swipeStartX))
    return Math.min(
      Math.max(
        this.state.swiping === 'closing' ?
        this.getTranslateMultiplier() * (currentX - this.swipeStartX) :
        this.getMaxTranslateX() - this.getTranslateMultiplier() * (this.swipeStartX - currentX),
        0
      ),
      this.getMaxTranslateX()
    );
  }
  
  onBodyTouchMove = (event) => {
    const currentX = event.touches[0].pageX;
    const currentY = event.touches[0].pageY;
    if (this.state.swiping) {
      event.preventDefault();
      this.setPosition(this.getTranslateX(currentX));
    } else if (this.maybeSwiping) {
      const dXAbs = Math.abs(currentX - this.touchStartX);
      const dYAbs = Math.abs(currentY - this.touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      const threshold = 10;
      if (dXAbs > threshold && dYAbs <= threshold) {
        this.setState({ swiping: this.state.open ? 'closing' : 'opening' });
        this.swipeStartX = currentX;
        this.setPosition(this.getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this.onBodyTouchEnd();
      }
    }
  };
  onBodyTouchEnd = (event) => {
    console.log(this.state.swiping)
    if (this.state.swiping) {
      const currentX = event.changedTouches[0].pageX;
      const translateRatio = this.getTranslateX(currentX) / this.getMaxTranslateX();
      this.maybeSwiping = false;
      const swiping = this.state.swiping;
      this.setState({
        swiping: null
      });
      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.1) {
        if (swiping === 'opening') {
          this.setPosition(this.getTranslateX(currentX));
        //  this.setPosition(this.getMaxTranslateX());
        } else {
          this.close('swipe');
        }
      } else {
        if (swiping === 'opening') {
          this.open('swipe');
        } else {
          this.setPosition(0);
         // this.setPosition(this.getTranslateX(currentX));
         //
        }
      }
    } else {
      this.maybeSwiping = false;
    }
    document.body.removeEventListener('touchmove', this.onBodyTouchMove);
    document.body.removeEventListener('touchend', this.onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
  };
  
  shouldShow() {
    return this.state.open || !!this.state.swiping;  // component is swiping
  }
  
  render() {
    const {
      anchor: anchorProp,
      children,
      className,
      docked,
      open,
      paperClassName,
      zDepth,
      onClick,
      onRequestChange,
      ...other
    } = this.props;
    const { theme: { dir }, render } = this.context.styleManager;
    const classes = render(styleSheet);
    const rtl = dir === 'rtl';
    const anchor = anchorProp || (rtl ? 'right' : 'left');
    const slideDirection = getSlideDirection(anchor);
    let transformCSSo;
    if (this.state.swiping !== null)
      transformCSSo = { transform: `translate(${this.state.transformCSS}px, 0)` };
    else
      transformCSSo =  { };
    
    const actevent = { pointerEvents: this.state.open ? 'auto' : 'none' };
    console.log(this.state.transformCSS)
    const drawer = (
      <Slide in={this.state.open} direction={slideDirection}
             transitionAppear
             transitionEnabled={(this.state.swiping === null)}
             onExit={()=> {
             }}
             onExited={()=> {
               console.log('end');
               this.close("exitnormal")
             }}
      >
        <Paper
          style={transformCSSo}
          transitionEnabled={this.state.swiping !== null}
          zDepth={docked ? 0 : zDepth}
          rounded={false}
          className={classNames(classes.paper, paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );
    const containerProps = {
      className: classNames(classes.modal, className),
      ...other,
    };
    if (docked) {
      return (
        <div className={classNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }
    return (
      <div>
        <EventListener target="window" onKeyUp={this.handleKeyUp}/>
        <Modal {...containerProps} show={this.state.open} onRequestClose={()=> {
          this.setState({
            open: false, transformCSS: this.state.transformCSS
          });
        }} backdropVisible={this.state.open}>
          {drawer}
        </Modal>
      </div>
    );
  }
}
