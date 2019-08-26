import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);

  return (
    <Box bgcolor="white" borderRadius={4}>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <CheckIcon />
      </ToggleButton>
    </Box>
  );
}
