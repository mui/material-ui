import * as React from 'react';
import { Transition } from '@material-ui/react-transition-group';
import { useForkRef } from '../utils';
import Fade from './Fade';

/**
 * @ignore - internal component.
 */
const StrictModeFade = React.forwardRef(function StrictModeFade(props, forwardedRef) {
  const domRef = React.useRef(null);
  const ref = useForkRef(domRef, forwardedRef);

  return (
    <Fade
      {...props}
      findDOMNode={() => domRef.current}
      ref={ref}
      TransitionComponent={Transition}
    />
  );
});

export default StrictModeFade;
