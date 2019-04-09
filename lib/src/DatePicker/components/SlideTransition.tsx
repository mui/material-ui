import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export type SlideDirection = 'right' | 'left';
interface SlideTransitionProps extends WithStyles<typeof styles> {
  transKey: React.Key;
  className?: string;
  slideDirection: SlideDirection;
  children: React.ReactChild;
}

const animationDuration = 350;
export const styles = (theme: Theme) => {
  const slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
  });

  return createStyles({
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      },
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)',
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)',
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition,
    },
    slideExit: {
      transform: 'translate(0%)',
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-200%)',
      transition: slideTransition,
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(200%)',
      transition: slideTransition,
    },
  });
};

const SlideTransition: React.SFC<SlideTransitionProps> = ({
  classes,
  className = null,
  children,
  transKey,
  slideDirection,
}) => {
  const transitionClasses = {
    enter: classes['slideEnter-' + slideDirection],
    enterActive: classes.slideEnterActive,
    exit: classes.slideExit,
    exitActive: classes['slideExitActiveLeft-' + slideDirection],
  };

  return (
    <TransitionGroup
      className={clsx(classes.transitionContainer, className)}
      childFactory={element =>
        React.cloneElement(element, {
          classNames: transitionClasses,
        })
      }
    >
      <CSSTransition
        key={transKey + slideDirection}
        mountOnEnter
        unmountOnExit
        timeout={animationDuration}
        children={children}
        classNames={transitionClasses}
      />
    </TransitionGroup>
  );
};

(SlideTransition as any).propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
  transKey: PropTypes.string.isRequired,
  innerRef: PropTypes.any,
};

export default withStyles(styles, {
  name: 'MuiPickersSlideTransition',
})(SlideTransition);
