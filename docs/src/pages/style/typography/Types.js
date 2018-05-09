import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
  light: {
    background:
      'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAIAAAC3eAIWAAAAEklEQVR4AWP4fvkRw69fv3BhAG+IFy/ne6sFAAAAAElFTkSuQmCC)', // eslint-disable-line max-len
  },
};

function Types(props) {
  return (
    <div
      style={{
        ...styles.root,
        ...(props.theme.palette.type === 'light' ? styles.light : {}),
      }}
    >
      <Typography variant="display4" gutterBottom>
        Display 4
      </Typography>
      <Typography variant="display3" gutterBottom>
        Display 3
      </Typography>
      <Typography variant="display2" gutterBottom>
        Display 2
      </Typography>
      <Typography variant="display1" gutterBottom>
        Display 1
      </Typography>
      <Typography variant="headline" gutterBottom>
        Headline
      </Typography>
      <Typography variant="title" gutterBottom>
        Title
      </Typography>
      <Typography variant="subheading" gutterBottom>
        Subheading
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2
      </Typography>
      <Typography variant="body1" gutterBottom align="right">
        Body 1
      </Typography>
      <Typography variant="caption" gutterBottom align="center">
        Caption
      </Typography>
      <Typography gutterBottom noWrap>
        {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
      </Typography>
      <Typography variant="button" gutterBottom>
        Button
      </Typography>
    </div>
  );
}

Types.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Types);
