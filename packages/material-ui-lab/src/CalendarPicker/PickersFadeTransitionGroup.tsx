import * as React from 'react';
import clsx from 'clsx';
import { MuiStyles, WithStyles, withStyles, StyleRules } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface FadeTransitionProps {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  transKey: React.Key;
}

export type PickersFadeTransitionGroupClassKey =
  | 'root'
  | 'fadeEnter'
  | 'fadeEnterActive'
  | 'fadeExit'
  | 'fadeExitActive';

const animationDuration = 500;
export const styles: MuiStyles<PickersFadeTransitionGroupClassKey> = (
  theme,
): StyleRules<PickersFadeTransitionGroupClassKey> => ({
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

export default withStyles(styles, { name: 'MuiPickersFadeTransitionGroup' })(FadeTransitionGroup);
