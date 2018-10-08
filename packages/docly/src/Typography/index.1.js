import * as React from 'react';
import Typography from '@material-ui/core/Typography';
// TODO: decide whether to extend or make our own Typography component:
// import Typography from './mui-typography';

export const Display1 = props => <Typography variant="display1" {...props} />;
export const Display2 = props => <Typography variant="display2" {...props} />;
export const Display3 = props => <Typography variant="display3" {...props} />;

export const Title = props => <Typography variant="title" {...props} />;

// Docly-specific (Title1 & Title 2)
export const Title1 = props => <Typography variant="title" {...props} />;
export const Title2 = props => <Typography variant="title" {...props} />;

// Docly-specific, called "Subheading" in material-ui
export const Subhead = props => <Typography variant="subheading" {...props} />;

export const Subheading = props => (
  <Typography variant="subheading" {...props} />
);

// export const Intro = props => <Typography variant="intro" {...props} />;
export const Intro = props => <Typography variant="body1" {...props} />;

export const Body1 = props => <Typography variant="body1" {...props} />;
export const Body2 = props => <Typography variant="body2" {...props} />;
// export const Body3 = props => <Typography variant="body3" {...props} />;
export const Body3 = props => <Typography variant="body2" {...props} />;
