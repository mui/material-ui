import React from 'react';
import {blue500, red500, greenA200} from 'material-ui/lib/styles/colors';
import SvgIcon from 'material-ui/lib/svg-icon';

const iconStyles = {
  marginRight: 24,
};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const SvgIconExampleSimple = () => (
  <div>
    <HomeIcon style={iconStyles} />
    <HomeIcon style={iconStyles} color={blue500} />
    <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
  </div>
);

export default SvgIconExampleSimple;
