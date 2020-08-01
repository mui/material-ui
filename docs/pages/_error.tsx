/* eslint-disable */
import React from 'react';
import KawaiiIcon from '_shared/svgIcons/KawaiiIcon';
import { styled } from '@material-ui/core/styles';
import { Grid, Typography, NoSsr } from '@material-ui/core';

const CenteredGrid = styled(Grid)({
  position: 'relative',
  top: '15vh',
});

const KawaiiIconWithMargin = styled(KawaiiIcon)({
  marginBottom: 65,
});

class Error extends React.Component<{ statusCode: number }> {
  static getInitialProps({ res, err }: any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <CenteredGrid container direction="row" alignItems="center" justifyContent="center">
        <NoSsr>
          <Grid item container xs={12} justifyContent="center">
            <KawaiiIconWithMargin mood={Math.random() > 0.33 ? 'sad' : 'shocked'} />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h1">
              Error {statusCode}
            </Typography>
          </Grid>
        </NoSsr>
      </CenteredGrid>
    );
  }
}

export default Error;
