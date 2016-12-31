// @flow weak

import React from 'react';
import Text from 'material-ui/Text';

const style = {
  background: '#fff',
};

export default function TextStypes() {
  return (
    <div style={style}>
      <Text type="display4" component="h1" gutterBottom>
        Display 4
      </Text>
      <Text type="display3" component="h2" gutterBottom>
        Display 3
      </Text>
      <Text type="display2" component="h3" gutterBottom>
        Display 2
      </Text>
      <Text type="display1" component="h4" gutterBottom>
        Display 1
      </Text>
      <Text type="headline" component="h5" gutterBottom>
        Headline
      </Text>
      <Text type="title" component="h6" gutterBottom>
        Title
      </Text>
      <Text type="subheading" gutterBottom>
        Subheading
      </Text>
      <Text type="body2" gutterBottom>
        Body 2
      </Text>
      <Text type="body1" gutterBottom>
        Body 1
      </Text>
      <Text type="caption" gutterBottom align="center">
        Caption
      </Text>
    </div>
  );
}
