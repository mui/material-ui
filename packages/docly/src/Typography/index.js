import * as React from 'react';
import Typography from '../material-core/Typography';
// TODO: decide whether to extend or make our own Typography component:
// import Typography from './mui-typography';

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

export const Display1 = props => <Typography variant="h1" {...props} />;
export const Display2 = props => <Typography variant="h2" {...props} />;
export const Display3 = props => <Typography variant="h3" {...props} />;

// Docly-specific (Title1 & Title 2)
export const Title1 = props => <Typography variant="h4" {...props} />;
export const Title2 = props => <Typography variant="h5" {...props} />;

// Docly-specific
export const Subhead = props => <Typography variant="h6" {...props} />;
export const Subheading = props => <Typography variant="h6" {...props} />;

export const Intro = props => <Typography variant="subtitle1" {...props} />;

// same as Intro for now
export const Subtitle1 = props => <Typography variant="subtitle1" {...props} />;

export const Subtitle2 = props => <Typography variant="subtitle2" {...props} />;

export const Body1 = props => <Typography variant="body1" {...props} />;
export const Body2 = props => <Typography variant="body2" {...props} />;

// caption
export const Body3 = props => <Typography variant="caption" {...props} />;
export const Caption = props => <Typography variant="caption" {...props} />;
