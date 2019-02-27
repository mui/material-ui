import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Album from 'docs/src/pages/getting-started/page-layout-examples/album/Album';

function Page(props) {
  return (
    <AppTheme title="Album page layout - Material-UI" description={props.t('albumDescr')}>
      <Album />
    </AppTheme>
  );
}

Page.propTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(state => ({ t: state.options.t }))(Page);
