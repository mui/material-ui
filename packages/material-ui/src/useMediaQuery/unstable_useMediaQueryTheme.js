/* eslint-disable camelcase */

import { useTheme } from '@material-ui/styles';
import useMediaQuery from './unstable_useMediaQuery';
import getThemeProps from '../styles/getThemeProps';

function unstable_useMediaQueryTheme(query, options) {
  const theme = useTheme();
  const props = getThemeProps({
    theme,
    name: 'MuiUseMediaQuery',
    props: {},
  });

  return useMediaQuery(query, { ...props, ...options });
}

export default unstable_useMediaQueryTheme;
