import React from 'react';
import PropTypes from 'prop-types';
import Head from 'docs/src/modules/components/Head';

function AppTheme(props) {
  const { children, description, title } = props;
  return (
    <React.Fragment>
      <Head title={title} description={description} />
      {children}
    </React.Fragment>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AppTheme;
