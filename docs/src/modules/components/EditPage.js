import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

function EditPage(props) {
  const { markdownLocation, sourceCodeRootUrl, t, userLanguage } = props;

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${sourceCodeRootUrl}${markdownLocation}`
          : 'https://translate.material-ui.com/'
      }
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
  sourceCodeRootUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  userLanguage: PropTypes.string.isRequired,
};

export default connect(state => ({
  t: state.options.t,
  userLanguage: state.options.userLanguage,
}))(EditPage);
