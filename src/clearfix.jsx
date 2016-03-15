import React, {PropTypes} from 'react';
import BeforeAfterWrapper from './before-after-wrapper';

const styles = {
  before: {
    content: "' '",
    display: 'table',
  },
  after: {
    content: "' '",
    clear: 'both',
    display: 'table',
  },
};

const ClearFix = ({style, children, ...other}) => (
  <BeforeAfterWrapper
    {...other}
    beforeStyle={styles.before}
    afterStyle={styles.after}
    style={style}
  >
    {children}
  </BeforeAfterWrapper>
);

ClearFix.displayName = 'ClearFix';

ClearFix.propTypes = {
  children: PropTypes.node,

  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

export default ClearFix;
