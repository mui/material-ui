import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppTheme from 'docs/src/modules/components/AppTheme';
import SignInSide from 'docs/src/pages/getting-started/page-layout-examples/sign-in-side/SignInSide';

function Page(props) {
  return (
    <AppTheme
      title="Sign In side page layout example - Material-UI"
      description={props.t('signInSideDescr')}
    >
      <SignInSide />
    </AppTheme>
  );
}

Page.propTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(state => ({ t: state.options.t }))(Page);
