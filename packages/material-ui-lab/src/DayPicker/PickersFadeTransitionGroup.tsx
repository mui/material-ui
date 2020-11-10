import * as React from 'react';
import clsx from 'clsx';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface FadeTransitionProps {
  transKey: React.Key;
  className?: string;
  reduceAnimations: boolean;
  children: React.ReactElement;
}

const animationDuration = 500;
export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
      position: 'relative',
    },
    fadeEnter: {
      willChange: 'transform',
      opacity: 0,
    },
    fadeEnterActive: {
      opacity: 1,
      transition: theme.transitions.create('opacity', {
        duration: animationDuration,
      }),
    },
    fadeExit: {
      opacity: 1,
    },
    fadeExitActive: {
      opacity: 0,
      transition: theme.transitions.create('opacity', {
        duration: animationDuration / 2,
      }),
    },
  });

export type PickersFadeTransitionGroupClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - do not document.
 */
const FadeTransitionGroup: React.FC<FadeTransitionProps & WithStyles<typeof styles>> = ({
  classes,
  children,
  className,
  reduceAnimations,
  transKey,
}) => {
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
        timeout={{ appear: animationDuration, enter: animationDuration / 2, exit: 0 }}
        classNames={transitionClasses}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withStyles(styles, { name: 'MuiPickersFadeTransition' })(FadeTransitionGroup);
