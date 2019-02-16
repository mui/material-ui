import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const LANGUAGES = { zh: 'zh-CN', pt: 'pt-BZ', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.material-ui.com/project/material-ui-docs/';

function EditPage(props) {
  const { markdownLocation, sourceCodeRootUrl, t, userLanguage } = props;
  const crowdInLanguage = LANGUAGES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(0, markdownLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${sourceCodeRootUrl}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLanguage}#/next${crowdInPath}`
      }
      target="_blank"
      rel="noopener"
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
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
