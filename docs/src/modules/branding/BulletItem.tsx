import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckIcon from 'docs/src/modules/branding/icons/Check';

interface BulletItemProps {
  children?: React.ReactNode;
}

export default function BulletItem(props: BulletItemProps) {
  const { children, ...other } = props;
  return (
    <Grid container alignItems="center" spacing={1} {...other}>
      <Grid item xs={1}>
        <Box
          sx={{
            display: 'inline-block',
            width: 24,
            height: 24,
            background: 'rgba(255,255,255,0.4)',
            color: 'vividBlue',
            borderRadius: '50%',
          }}
        >
          <CheckIcon />
        </Box>
      </Grid>
      <Grid item xs>
        <Typography component="span">{children}</Typography>
      </Grid>
    </Grid>
  );
}
