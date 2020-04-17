import * as React from 'react';
import { Transition } from '@material-ui/react-transition-group';
import { useForkRef } from '../utils';
import Zoom from './Zoom';

/**
 * @ignore - internal component.
 */
const StrictModeZoom = React.forwardRef(function StrictModeZoom(props, forwardedRef) {
  const domRef = React.useRef(null);
  const ref = useForkRef(domRef, forwardedRef);

  return (
    <Zoom
      {...props}
      findDOMNode={() => domRef.current}
      ref={ref}
      TransitionComponent={Transition}
    />
  );
});

export default StrictModeZoom;
