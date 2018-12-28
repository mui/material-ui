import React from 'react';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppTheme from 'docs/src/modules/components/AppTheme';
import getIcon, { iconsByEntrywayId } from '@docly/guide-icons';

function Page() {
  return (
    <AppTheme title="Docly guide icons" description="">
      <CssBaseline />
      <main>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Guide icons
        </Typography>
        <Grid container spacing={16} alignItems="center" justify="center">
          {Object.keys(iconsByEntrywayId).map(id => {
            const Icon = getIcon(id);
            let name = '';
            try {
              name = Icon.prototype.constructor.name.replace('Svg', '');
            } catch (err) {
              // just checking
            }
            return (
              <Grid justify="center" style={{ textAlign: 'center' }} item sm={2} key={id}>
                <Icon width="56" height="56" />
                <div>
                  {id}
                  <br />
                  {name}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </main>
    </AppTheme>
  );
}
export default Page;
