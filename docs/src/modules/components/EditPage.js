import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useUserLanguage, useTranslate } from '@mui/docs/i18n';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };

export default function EditPage(props) {
  const { sourceLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  if (!sourceLocation) {
    // An empty div such that the footer layout stays unchanged.
    return <div />;
  }

  const CROWDIN_ROOT_URL = 'https://crowdin.com/project/material-ui-docs/';
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = sourceLocation.substring(0, sourceLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      size="small"
      variant="text"
      color="secondary"
      startIcon={<GitHubIcon sx={{ mr: 0.5 }} />}
      href={
        userLanguage === 'en'
          ? `${process.env.SOURCE_CODE_REPO}/edit/${process.env.SOURCE_GITHUB_BRANCH}${sourceLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/${process.env.SOURCE_CODE_ROOT_URL.replace(
              'https://github.com/mui/',
              '',
            ).replace('/blob/', '%20%2F%20')}${crowdInPath}`
      }
      target="_blank"
      rel="noopener nofollow"
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  sourceLocation: PropTypes.string.isRequired,
};
