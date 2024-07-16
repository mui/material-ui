import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/PigmentStack';
import { styled } from '@mui/material-pigment-css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function StackPage() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Stack</h2>
        <div className="demo-container">
          <Stack spacing={2}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
          </Stack>
        </div>
      </section>
      <section>
        <h2> Divider Stack</h2>
        <div className="demo-container">
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
          </Stack>
        </div>
      </section>
      <section>
        <h2> Responsive Stack</h2>
        <div className="demo-container">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
          </Stack>
        </div>
      </section>
    </React.Fragment>
  );
}
