import React from 'react';
import Button from 'material-ui/Button';

const style = {
  margin: '6px 12px 6px 0px',
};
/**
 *Raised and Flat Buttons with default color, `primary`, `secondary` and and `disabled` props applied.
 */
const ButtonExampleSimple = () => (
  <div>
    <Button style={style}>
      Default
    </Button>
    <Button primary={true} style={style}>
      Primary
    </Button>
    <Button secondary={true} style={style}>
      Secondary
    </Button>
    <Button disabled={true} style={style}>
      Disabled
    </Button>
    <br />
    <Button type="flat" style={style}>
      Default
    </Button>
    <Button type="flat" primary={true} style={style}>
      Primary
    </Button>
    <Button type="flat" secondary={true} style={style}>
      Secondary
    </Button>
    <Button type="flat" disabled={true} style={style}>
      Disabled
    </Button>
  </div>
);

export default ButtonExampleSimple;
