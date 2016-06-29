import React from 'react';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  margin: '6px 12px 6px 0px',
};

/**
 * Floating Action Button examples.
 */
const ButtonExampleFab = () => (
  <div>
    <Button
      type="fab"
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      mini={true}
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      primary={true}
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      mini={true}
      primary={true}
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      secondary={true}
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      mini={true}
      secondary={true}
      style={style}
    >
      <ContentAdd color="red" />
    </Button>

    <Button
      type="fab"
      disabled={true}
      style={style}
    >
      <ContentAdd />
    </Button>

    <Button
      type="fab"
      mini={true}
      disabled={true}
      style={style}
    >
      <ContentAdd />
    </Button>
  </div>
);

export default ButtonExampleFab;
