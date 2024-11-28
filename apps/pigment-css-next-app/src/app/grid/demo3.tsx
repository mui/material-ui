'use client';
import * as React from 'react';
import Grid from '@pigment-css/react/Grid';
import { styled } from '@pigment-css/react';

const Item = styled.div`
  background-color: #fff;
  border: 1px solid #ced7e0;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
`;

export default function GridDemo3() {
  const [spacing, setSpacing] = React.useState(2);
  return (
    <div sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Grid container spacing={spacing} sx={{ justifyContent: 'center' }}>
        {[0, 1, 2].map((value) => (
          <Grid key={value}>
            <Item
              sx={{
                height: 140,
                width: 100,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid size={'auto'}>Spacing:</Grid>
        {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
          <Grid key={value} size={'auto'}>
            <label>
              <input
                type="radio"
                name="radio"
                value={value}
                checked={value === spacing}
                onChange={(event) => setSpacing(parseFloat(event.target.value))}
              />
              {value}
            </label>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
