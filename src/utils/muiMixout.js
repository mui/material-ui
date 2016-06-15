import {PropTypes} from 'react';
import mixout, {remix, combine} from 'react-mixout';
import pure from 'react-mixout-pure';
import forwardContext from 'react-mixout-forward-context';

export {mixout, remix, combine, pure, forwardContext};

export const forwardTheme = forwardContext('muiTheme', {
  validator: PropTypes.object.isRequired,
});

export const muiMixout = combine(pure, forwardTheme);
