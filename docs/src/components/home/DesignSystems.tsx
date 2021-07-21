import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';
import MoreVert from '@material-ui/icons/MoreVert';

const MaterialDesignDemo = () => {
  return (
    <Card elevation={4} sx={{ display: 'flex', p: 1.5 }}>
      <Avatar variant="rounded" sx={{ mr: 1.5 }} />
      <div>
        <Typography component="div" variant="caption" color="text.secondary">
          Today at 09:40 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography component="div" mr={0.5} mb={0.5}>
            <strong>
              Merge pull request{' '}
              <Link href="/" underline="none">
                #2021
              </Link>{' '}
              from{' '}
            </strong>
          </Typography>
          <Chip
            size="small"
            label="mui-org/master"
            color="success"
            onClick={() => {}}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Typography component="div" variant="caption" mb={1.5}>
          Committed by{' '}
          <Link href="/" underline="none">
            <b>Olivier Tassinari</b>
          </Link>
        </Typography>

        <Button variant="outlined" size="small" startIcon={<ContentCopyRounded />} sx={{ mr: 1 }}>
          i88jjd43
        </Button>
        <IconButton size="small">
          <CodeRounded fontSize="small" />
        </IconButton>
      </div>
      {/* <IconButton size="small" sx={{ alignSelf: 'flex-start', ml: 1.5 }}>
        <MoreVert fontSize="small" />
      </IconButton> */}
    </Card>
  );
};

const defaultTheme = createTheme();

const DesignSystems = () => {
  return (
    <Box bgcolor="grey.50" py={8}>
      <Container>
        <Grid container>
          <Grid item md={6} />
          <Grid item md={6}>
            <Paper
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'grey.100' }}
            >
              <Box minHeight={300} display="flex" justifyContent="center" alignItems="center">
                <ThemeProvider theme={defaultTheme}>
                  <MaterialDesignDemo />
                </ThemeProvider>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DesignSystems;
