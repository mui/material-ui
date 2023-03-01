import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, gap: 1, mt: 1 }}>
      <Checkbox checked={checked[0]} onChange={handleChange2} label="Child 1" />
      <Checkbox checked={checked[1]} onChange={handleChange3} label="Child 2" />
    </Box>
  );

  return (
    <div>
      <Checkbox
        label="Parent"
        checked={checked[0] && checked[1]}
        indeterminate={checked[0] !== checked[1]}
        onChange={handleChange1}
      />
      {children}
    </div>
  );
}
