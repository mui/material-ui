import * as React from 'react';
import PropTypes from 'prop-types';
import { Global as EmotionGlobal, css } from '@emotion/react';

export default function Global(props) {
  const { styles } = props;
  return <EmotionGlobal styles={css(styles)} />;
}

Global.propTypes = {
  styles: PropTypes.string,
};
