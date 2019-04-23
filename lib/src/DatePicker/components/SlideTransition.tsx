import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export type SlideDirection = 'right' | 'left';
interface SlideTransitionProps {
  transKey: React.Key;
  className?: string;
  slideDirection: SlideDirection;
  children: React.ReactChild;
}

const animationDuration = 350;
export const useStyles = makeStyles(
  (theme: Theme) => {
    const slideTransition = theme.transitions.create('transform', {
      duration: animationDuration,
      easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
    });

    return {
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
    };
  },
  { name: 'MuiPickersSlideTransition' }
);

const SlideTransition: React.SFC<SlideTransitionProps> = ({
  children,
  transKey,
  slideDirection,
  className = null,
}) => {
  const classes = useStyles();
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
        key={transKey + slideDirection}
        timeout={animationDuration}
        classNames={transitionClasses}
        children={children}
      />
    </TransitionGroup>
  );
};

export default SlideTransition;
