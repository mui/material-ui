import React from 'react';
import PropTypes from 'prop-types';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContent from 'docs/src/modules/components/AppContent';
import Head from 'docs/src/modules/components/Head';

function ComponentApi(props) {
  return (
    <React.Fragment>
      {/* TODO: component name + desc */}
      <Head description="API for AppBar component" title="AppBar API - Material-UI" />
    </React.Fragment>
  );
}

ComponentApi.propTypes = {
  api: PropTypes.object.isRequired,
};

function Index() {
  return (
    <React.Fragment>
      <h1>Material-UI Component-API</h1>
      <p>Hello, Dave!</p>
    </React.Fragment>
  );
}

function ApiPage(props) {
  const { api, componentSlug } = props;

  // TODO suggestions if slug given but API not found
  const content = api === undefined ? <Index /> : <ComponentApi api={api} />;

  return (
    <AppFrame>
      <AppContent>{content}</AppContent>
    </AppFrame>
  );
}

ApiPage.getInitialProps = async ({ ctx }) => {
  const { query } = ctx;
  return { api: {}, componentSlug: query.component };
};

ApiPage.propTypes = {
  componentSlug: PropTypes.string,
};

export default ApiPage;
