import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup';

export type SlideDirection = 'right' | 'left';
export interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'> {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  slideDirection: SlideDirection;
  transKey: React.Key;
}

const classes = generateUtilityClasses('PrivatePickersSlideTransition', [
  'root',
  'slideEnter-left',
  'slideEnter-right',
  'slideEnterActive',
  'slideEnterActive',
  'slideExit',
  'slideExitActiveLeft-left',
  'slideExitActiveLeft-right',
]);

export const slideAnimationDuration = 350;

const PickersSlideTransitionRoot = styled(TransitionGroup, { skipSx: true })<TransitionGroupProps>(
  ({ theme }) => {
    const slideTransition = theme.transitions.create('transform', {
      duration: slideAnimationDuration,
      easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
    });
    return {
      display: 'block',
      position: 'relative',
      overflowX: 'hidden',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      },
      [`& .${classes['slideEnter-left']}`]: {
        willChange: 'transform',
        transform: 'translate(100%)',
        zIndex: 1,
      },
      [`& .${classes['slideEnter-right']}`]: {
        willChange: 'transform',
        transform: 'translate(-100%)',
        zIndex: 1,
      },
      [`& .${classes.slideEnterActive}`]: {
        transform: 'translate(0%)',
        transition: slideTransition,
      },
      [`& .${classes.slideExit}`]: {
        transform: 'translate(0%)',
      },
      [`& .${classes['slideExitActiveLeft-left']}`]: {
        willChange: 'transform',
        transform: 'translate(-100%)',
        transition: slideTransition,
        zIndex: 0,
      },
      [`& .${classes['slideExitActiveLeft-right']}`]: {
        willChange: 'transform',
        transform: 'translate(100%)',
        transition: slideTransition,
        zIndex: 0,
      },
    };
  },
);

/**
 * @ignore - do not document.
 */
const PickersSlideTransition = ({
  children,
  className,
  reduceAnimations,
  slideDirection,
  transKey,
  ...other
}: SlideTransitionProps) => {
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
    <PickersSlideTransitionRoot
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
    </PickersSlideTransitionRoot>
  );
};

export default PickersSlideTransition;
