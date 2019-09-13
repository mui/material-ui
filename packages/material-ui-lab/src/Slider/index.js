import React from 'react';
import Slider from '@material-ui/core/Slider';

export default React.forwardRef(function DeprecatedSlider(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        'Material-UI: the Slider component was moved from the lab to the core.',
        '',
        'Yay, the component is stable! 🎉',
        '',
        "You should use `import { Slider } from '@material-ui/core'`",
        "or `import Slider from '@material-ui/core/Slider'`",
      ].join('\n'),
    );
  }

  return <Slider ref={ref} {...props} />;
});
