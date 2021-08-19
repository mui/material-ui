import * as React from 'react';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { TransitionGroup } from 'react-transition-group';

interface FadeTransitionProps {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  transKey: React.Key;
}

const classes = generateUtilityClasses('PrivatePickersFadeTransitionGroup', ['root']);

const animationDuration = 500;

const PickersFadeTransitionGroupRoot = styled(TransitionGroup, {
  skipSx: true,
})(() => ({
  display: 'block',
  position: 'relative',
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

  return (
    <PickersFadeTransitionGroupRoot className={clsx(classes.root, className)}>
      <Fade
        appear={false}
        mountOnEnter
        unmountOnExit
        key={transKey}
        timeout={{ appear: animationDuration, enter: animationDuration / 2, exit: 0 }}
      >
        {children}
      </Fade>
    </PickersFadeTransitionGroupRoot>
  );
};

export default PickersFadeTransitionGroup;
