import * as React from 'react';
import PropTypes from 'prop-types';
import { Global as EmotionGlobal, css } from '@emotion/react';

export default function Global(props) {
  const { styles } = props;
  return <EmotionGlobal styles={typeof styles === 'string' ? css(styles): styles} />;
}

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
