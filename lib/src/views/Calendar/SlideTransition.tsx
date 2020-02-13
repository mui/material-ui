import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type SlideDirection = 'right' | 'left';
interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'> {
  transKey: React.Key;
  className?: string;
  reduceAnimations: boolean;
  slideDirection: SlideDirection;
  children: React.ReactElement;
}

export const slideAnimationDuration = 350;
export const useStyles = makeStyles(
  theme => {
    const slideTransition = theme.transitions.create('transform', {
      duration: slideAnimationDuration,
      easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
    });

    return {
      transitionContainer: {
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
    };
  },
  { name: 'MuiPickersSlideTransition' }
);

const SlideTransition: React.SFC<SlideTransitionProps> = ({
  children,
  transKey,
  reduceAnimations,
  slideDirection,
  className = undefined,
  ...other
}) => {
  const classes = useStyles();
  if (reduceAnimations) {
    return <div className={className}>{children}</div>;
  }

  const transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    // @ts-ignore
    enter: classes['slideEnter-' + slideDirection],
    // @ts-ignore
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
        mountOnEnter
        unmountOnExit
        key={transKey}
        timeout={slideAnimationDuration}
        classNames={transitionClasses}
        children={children}
        {...other}
      />
    </TransitionGroup>
  );
};

export default SlideTransition;
