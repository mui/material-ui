import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };

export default function EditPage(props) {
  const { sourceLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const CROWDIN_ROOT_URL = 'https://crowdin.com/project/material-ui-docs/';
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = sourceLocation.substring(0, sourceLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
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
      size="small"
      startIcon={<GitHubIcon />}
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
      sx={(theme) => ({
        ml: { md: -1, lg: 0 },
        mb: 2,
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(12.5),
        color: 'primary.600',
        '& svg': {
          width: 14,
          height: 14,
        },
        ...theme.applyDarkStyles({
          color: 'primary.300',
        }),
      })}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  sourceLocation: PropTypes.string.isRequired,
};
