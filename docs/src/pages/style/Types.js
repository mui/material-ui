import React from 'react';
import Typography from 'material-ui/Typography';

const style = {
  width: '100%',
  maxWidth: 500,
  background:
    'transparent url(data:image/png;base64,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)', // eslint-disable-line max-len
};

export default function Types() {
  return (
    <div style={style}>
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
