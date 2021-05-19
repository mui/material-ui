import * as React from 'react';
import clsx from 'clsx';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type SlideDirection = 'right' | 'left';
export interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'> {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  slideDirection: SlideDirection;
  transKey: React.Key;
}

export type PickersSlideTransitionClassKey =
  | 'root'
  | 'slideEnter-left'
  | 'slideEnter-right'
  | 'slideEnterActive'
  | 'slideEnterActive'
  | 'slideExit'
  | 'slideExitActiveLeft-left'
  | 'slideExitActiveLeft-right';

export const slideAnimationDuration = 350;
export const styles: MuiStyles<PickersSlideTransitionClassKey> = (
  theme,
): StyleRules<PickersSlideTransitionClassKey> => {
  const slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
  });

  return {
    root: {
      display: 'block',
      position: 'relative',
      overflowX: 'hidden',
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
      zIndex: 1,
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      zIndex: 1,
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
      transform: 'translate(-100%)',
      transition: slideTransition,
      zIndex: 0,
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition,
      zIndex: 0,
    },
  };
};

/**
 * @ignore - do not document.
 */
const SlideTransition: React.FC<SlideTransitionProps & WithStyles<typeof styles>> = ({
  children,
  classes,
  className,
  reduceAnimations,
  slideDirection,
  transKey,
  ...other
}) => {
  if (reduceAnimations) {
    return <div className={clsx(classes.root, className)}>{children}</div>;
  }

  const transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    enter: classes[`slideEnter-${slideDirection}` as 'slideEnter-left' | 'slideEnter-right'],
    exitActive:
      classes[
        `slideExitActiveLeft-${slideDirection}` as
          | 'slideExitActiveLeft-left'
          | 'slideExitActiveLeft-right'
      ],
  };

  return (
    <TransitionGroup
      className={clsx(classes.root, className)}
      childFactory={(element) =>
        React.cloneElement(element, {
          classNames: transitionClasses,
        })
      }
    >
      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={transKey}
        timeout={slideAnimationDuration}
        classNames={transitionClasses}
        {...other}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withStyles(styles, { name: 'PrivatePickersSlideTransition' })(SlideTransition);
