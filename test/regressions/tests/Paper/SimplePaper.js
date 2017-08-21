// @flow

import * as React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  margin: 15,
  padding: 30,
};

export default function SimplePaper() {
  return (
    <div>
      <Paper style={style} />
      <Paper style={style} square />
    </div>
  );
}
