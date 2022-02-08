import * as React from 'react';
import clsx from 'clsx';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/base';
import { TransitionGroup } from 'react-transition-group';

interface FadeTransitionProps {
  children: React.ReactElement;
  className?: string;
  reduceAnimations: boolean;
  transKey: React.Key;
}

const classes = generateUtilityClasses('PrivatePickersFadeTransitionGroup', ['root']);

const animationDuration = 500;

const PickersFadeTransitionGroupRoot = styled(TransitionGroup)({
  display: 'block',
  position: 'relative',
});

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
