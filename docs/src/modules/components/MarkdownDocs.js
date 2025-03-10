import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import { useColorScheme as useMuiColorScheme } from '@mui/material/styles';
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme,
  extendTheme,
  THEME_ID as JOY_THEME_ID,
} from '@mui/joy/styles';
import { Ad, AdGuest } from '@mui/docs/Ad';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useUserLanguage } from '@mui/docs/i18n';
import MuiBaseDeprecation from 'docs/src/components/productBaseUI/MuiBaseDeprecation';

const defaultJoyTheme = extendTheme();

function JoyModeObserver() {
  const { mode } = useMuiColorScheme();
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

export default function MarkdownDocs(props) {
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    /**
     * Some pages, for example Joy theme builder, should not be a nested CssVarsProvider to control its own state.
     * This config will skip the CssVarsProvider at the root of the page.
     */
    disableCssVarsProvider = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const localizedDoc = docs[userLanguage] || docs.en;

  const isBase = canonicalAs.startsWith('/base-ui/');

  const isJoy = canonicalAs.startsWith('/joy-ui/') && !disableCssVarsProvider;
  const CssVarsProvider = isJoy ? JoyCssVarsProvider : React.Fragment;

  return (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={localizedDoc.toc}
    >
      {disableAd ? null : (
        <AdGuest>
          <Ad />
        </AdGuest>
      )}
      <CssVarsProvider {...(isJoy && { theme: { [JOY_THEME_ID]: defaultJoyTheme } })}>
        {isJoy && <JoyModeObserver />}
        {isBase && (
          <MuiBaseDeprecation
            newComponentUrl={localizedDoc.headers.newUrl}
            newComponentName={localizedDoc.headers.newName}
          />
        )}
        {localizedDoc.rendered.map((renderedMarkdownOrDemo, index) => (
          <RichMarkdownElement
            key={`demos-section-${index}`}
            demoComponents={demoComponents}
            demos={demos}
            disableAd={disableAd}
            localizedDoc={localizedDoc}
            renderedMarkdownOrDemo={renderedMarkdownOrDemo}
            srcComponents={srcComponents}
          />
        ))}
      </CssVarsProvider>
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableCssVarsProvider: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
