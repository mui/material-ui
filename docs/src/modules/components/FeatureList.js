import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconImage from 'docs/src/components/icon/IconImage';
import { styled } from '@mui/material/styles';

const ListRoot = styled('ul')({
  padding: 0,
  margin: 0,
  marginBottom: 16,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export default function FeatureList(props) {
  const { features } = props;

  return (
    <ListRoot>
      {features.map((feature, item) => (
        <Stack
          key={item}
          component="li"
          direction="row"
          alignItems="center"
          spacing={1.5}
          useFlexGap
        >
          <IconImage name="pricing/yes" />
          <Typography color="text.secondary">{feature}</Typography>
        </Stack>
      ))}
    </ListRoot>
  );
}

FeatureList.propTypes = {};
