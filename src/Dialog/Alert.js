// @flow

import defaultProps from 'recompose/defaultProps';
import Dialog from './Dialog';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user
 * about a situation.
 */
const Alert = defaultProps({
  ignoreBackdropClick: true,
  ignoreEscapeKeyUp: true,
})(Dialog);

export default Alert;
