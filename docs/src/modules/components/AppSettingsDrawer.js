import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import { getCookie, pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import NoSsr from '@mui/material/NoSsr';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.mui.com/project/material-ui-docs/';

const Heading = styled(Typography)(({ theme }) => ({
  margin: '20px 0 10px',
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
}));

const IconToggleButton = styled(ToggleButton)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  '& > *': {
    marginRight: '8px',
  },
});

function AppSettingsDrawer(props) {
  const { onClose, open = false, ...other } = props;
  const t = useTranslate();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const userLanguage = useUserLanguage();
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);

  React.useEffect(() => {
    const initialMode = getCookie('paletteMode') || 'system';
    setMode(initialMode);
  }, [preferredMode]);

  const handleChangeThemeMode = (event, paletteMode) => {
    if (paletteMode === null) {
      return;
    }

    setMode(paletteMode);

    if (paletteMode === 'system') {
      document.cookie = `paletteMode=;path=/;max-age=31536000`;
      changeTheme({ paletteMode: preferredMode });
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
      changeTheme({ paletteMode });
    }
  };

  const handleChangeDirection = (event, direction) => {
    if (direction === null) {
      direction = theme.direction;
    }

    changeTheme({ direction });
  };

  const handleLanguageClick = (language) => () => {
    document.cookie = `userLanguage=${language.code};path=/;max-age=31536000`;
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 0,
        sx: { width: { xs: 310, sm: 360 }, borderRadius: '10px 0px 0px 10px' },
      }}
      {...other}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="body1" fontWeight="500">
          {t('settings.settings')}
        </Typography>
        <IconButton color="inherit" onClick={onClose} edge="end">
          <CloseIcon color="primary" fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ pl: 2, pr: 2 }}>
        <Heading gutterBottom id="settings-mode">
          {t('settings.mode')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={mode}
          color="primary"
          onChange={handleChangeThemeMode}
          aria-labelledby="settings-mode"
          fullWidth
        >
          <IconToggleButton
            value="light"
            aria-label={t('settings.light')}
            data-ga-event-category="settings"
            data-ga-event-action="light"
          >
            <LightModeIcon fontSize="small" />
            {t('settings.light')}
          </IconToggleButton>
          <IconToggleButton
            value="system"
            aria-label={t('settings.system')}
            data-ga-event-category="settings"
            data-ga-event-action="system"
          >
            <SettingsBrightnessIcon fontSize="small" />
            {t('settings.system')}
          </IconToggleButton>
          <IconToggleButton
            value="dark"
            aria-label={t('settings.dark')}
            data-ga-event-category="settings"
            data-ga-event-action="dark"
          >
            <DarkModeOutlinedIcon fontSize="small" />
            {t('settings.dark')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom id="settings-direction">
          {t('settings.direction')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={theme.direction}
          onChange={handleChangeDirection}
          aria-labelledby="settings-direction"
          color="primary"
          fullWidth
        >
          <IconToggleButton
            value="ltr"
            aria-label={t('settings.light')}
            data-ga-event-category="settings"
            data-ga-event-action="ltr"
          >
            <FormatTextdirectionLToRIcon fontSize="small" />
            {t('settings.ltr')}
          </IconToggleButton>
          <IconToggleButton
            value="rtl"
            aria-label={t('settings.system')}
            data-ga-event-category="settings"
            data-ga-event-action="rtl"
          >
            <FormatTextdirectionRToLIcon fontSize="small" />
            {t('settings.rtl')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom>{t('settings.language')}</Heading>
        <NoSsr defer>
          <List>
            {LANGUAGES_LABEL.map((language) => (
              <ListItemButton
                component="a"
                divider
                data-no-markdown-link="true"
                href={language.code === 'en' ? canonicalAs : `/${language.code}${canonicalAs}`}
                key={language.code}
                onClick={handleLanguageClick(language)}
                selected={userLanguage === language.code}
                lang={language.code}
                hrefLang={language.code}
              >
                {language.text}
              </ListItemButton>
            ))}
            <ListItemButton
              component="a"
              href={
                userLanguage === 'en'
                  ? `${CROWDIN_ROOT_URL}`
                  : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging`
              }
              rel="noopener nofollow"
              target="_blank"
              key={userLanguage}
              lang={userLanguage}
              hrefLang="en"
            >
              {t('appFrame.helpToTranslate')}
            </ListItemButton>
          </List>
        </NoSsr>
        <Heading gutterBottom>{t('settings.color')}</Heading>
        <Button
          component="a"
          href="/material-ui/customization/color/#playground"
          data-ga-event-category="settings"
          data-ga-event-action="colors"
          size="small"
          variant="outlined"
          sx={{
            width: '100%',
            mx: 0,
            py: 1,
            fontWeight: 500,
            border: `1px solid  ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[200]
            }`,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[500],
            '&:hover': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.grey[300],
              background:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primaryDark[700], 0.4)
                  : theme.palette.grey[50],
            },
          }}
        >
          {t('settings.editWebsiteColors')}
        </Button>
      </Box>
    </Drawer>
  );
}

AppSettingsDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default AppSettingsDrawer;
