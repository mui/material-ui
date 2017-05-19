// @flow

import defaultProps from 'recompose/defaultProps';
import Dialog from './Dialog';

/**
 * Confirmation dialogs require users to explicitly confirm their choice
 * before an option is committed.
 */
const Confirmation = defaultProps({
  ignoreBackdropClick: true,
  ignoreEscapeKeyUp: true,
})(Dialog);

export default Confirmation;
