import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function EditPage(props) {
  const { markdownLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
  const CROWDIN_ROOT_URL = 'https://translate.mui.com/project/material-ui-docs/';
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(0, markdownLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${process.env.SOURCE_CODE_ROOT_URL}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/${process.env.SOURCE_CODE_ROOT_URL.replace(
              'https://github.com/mui/',
              '',
            ).replace('/blob/', '%20%2F%20')}${crowdInPath}`
      }
      target="_blank"
      rel="noopener nofollow"
      size="small"
      startIcon={<EditRoundedIcon />}
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
  markdownLocation: PropTypes.string.isRequired,
};
