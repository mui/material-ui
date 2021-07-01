import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup';

interface FadeTransitionProps {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  transKey: React.Key;
}

const classes = generateUtilityClasses('PrivatePickersFadeTransitionGroup', [
  'root',
  'fadeEnter',
  'fadeEnterActive',
  'fadeExit',
  'fadeExitActive',
]);

const animationDuration = 500;

const PickersFadeTransitionGroupRoot = styled(TransitionGroup, {
  skipSx: true,
})<TransitionGroupProps>(({ theme }) => ({
  display: 'block',
  position: 'relative',
  [`& .${classes.fadeEnter}`]: {
    willChange: 'transform',
    opacity: 0,
  },
  [`& .${classes.fadeEnterActive}`]: {
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      duration: animationDuration,
    }),
  },
  [`& .${classes.fadeExit}`]: {
    opacity: 1,
  },
  [`& .${classes.fadeExitActive}`]: {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: animationDuration / 2,
    }),
  },
}));

/**
 * @ignore - do not document.
 */
const PickersFadeTransitionGroup = ({
  children,
  className,
  reduceAnimations,
  transKey,
}: FadeTransitionProps) => {
  if (reduceAnimations) {
    return children;
  }

  const transitionClasses = {
    exit: classes.fadeExit,
    enterActive: classes.fadeEnterActive,
    enter: classes.fadeEnter,
    exitActive: classes.fadeExitActive,
  };

  return (
    <PickersFadeTransitionGroupRoot
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
        timeout={{ appear: animationDuration, enter: animationDuration / 2, exit: 0 }}
        classNames={transitionClasses}
      >
        {children}
      </CSSTransition>
    </PickersFadeTransitionGroupRoot>
  );
};

export default PickersFadeTransitionGroup;
