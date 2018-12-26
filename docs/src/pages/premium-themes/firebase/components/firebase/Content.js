import React from 'react';
import { css } from 'react-emotion';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Search from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import Subject from '@material-ui/icons/Subject';
import Notification from '@material-ui/icons/Notifications';
import Info from '@material-ui/icons/Info';

const Content = () => {
  return (
    <div
      className={css({
        padding: '40px 56px',
      })}
    >
      <Paper className={'paper--of-hidden'}>
        <AppBar
          position="static"
          color={'default'}
          className={'app-bar--shaded'}
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <Search color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Add user
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <Refresh color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Divider />
        <Table>
          <TableHead>
            <TableRow className={'table__row--narrow table__row--shaded'}>
              <TableCell>Identifier</TableCell>
              <TableCell numeric>Providers</TableCell>
              <TableCell numeric>Created</TableCell>
              <TableCell numeric>Signed-in</TableCell>
              <TableCell numeric>
                <Tooltip title="Sort" placement={'bottom-end'} enterDelay={300}>
                  <TableSortLabel active direction={'desc'}>
                    User UID
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell numeric />
            </TableRow>
          </TableHead>
        </Table>
        <div className={css({ padding: '80px 0' })}>
          <Grid container spacing={32} wrap={'nowrap'} justify={'center'}>
            <Grid item>
              <img
                style={{ maxWidth: 192 }}
                alt={'authen-sticker'}
                src={
                  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/zerostate/2x/auth.png'
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant={'h6'}
                style={{ fontWeight: 400, marginTop: 24 }}
              >
                Authenticate and manage users from a variety of providers
                without server-side code
              </Typography>
              <Typography className={'text--icon text--link text--inline'}>
                <Notification className={'icon--small'} />
                Learn more
              </Typography>
              <Typography
                className={
                  'text--icon text--link text--inline text--indented-lg'
                }
              >
                <Subject className={'icon--small'} />
                View the docs
              </Typography>
              <div
                className={css({
                  backgroundColor: '#eceff1',
                  color: '#546e7a',
                  marginTop: 24,
                  display: 'flex',
                  padding: 8,
                })}
              >
                <Info color={'inherit'} />
                <Typography className={'text--inline text--indented'} color={'inherit'}>
                  To manage Authentication, ask a project owner for the
                  necessary permissions
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

Content.propTypes = {};
Content.defaultProps = {};

export default Content;
