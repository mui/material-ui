import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

export default function EditPage(props) {
  const { markdownLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
  const CROWDIN_ROOT_URL = 'https://translate.material-ui.com/project/material-ui-docs/';
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(0, markdownLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${process.env.SOURCE_CODE_ROOT_URL}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging${crowdInPath}`
      }
      target="_blank"
      rel="noopener nofollow"
      size="small"
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
};
