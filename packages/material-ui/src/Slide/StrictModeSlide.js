import * as React from 'react';
import { Transition } from '@material-ui/react-transition-group';
import { useForkRef } from '../utils';
import Slide from './Slide';

/**
 * @ignore - internal component.
 */
const StrictModeSlide = React.forwardRef(function StrictModeSlide(props, forwardedRef) {
  const domRef = React.useRef(null);
  const ref = useForkRef(domRef, forwardedRef);

  return (
    <Slide
      {...props}
      findDOMNode={() => domRef.current}
      ref={ref}
      TransitionComponent={Transition}
    />
  );
});

export default StrictModeSlide;
