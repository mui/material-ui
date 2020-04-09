import * as React from 'react';
import { Transition } from '@material-ui/react-transition-group';
import { useForkRef } from '../utils';
import Collapse from './Collapse';

/**
 * @ignore - internal component.
 */
const StrictModeCollapse = React.forwardRef(function StrictModeCollapse(props, forwardedRef) {
  const domRef = React.useRef(null);
  const ref = useForkRef(domRef, forwardedRef);

  return (
    <Collapse
      {...props}
      findDOMNode={() => domRef.current}
      ref={ref}
      TransitionComponent={Transition}
    />
  );
});

export default StrictModeCollapse;
