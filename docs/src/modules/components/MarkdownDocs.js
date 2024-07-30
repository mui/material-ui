import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import { CssVarsProvider as JoyCssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { Ad, AdGuest } from '@mui/docs/Ad';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useUserLanguage } from '@mui/docs/i18n';
import { BrandingProvider } from '@mui/docs/branding';

function JoyModeObserver({ mode }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

JoyModeObserver.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

export default function MarkdownDocs(props) {
  const theme = useTheme();
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

  const isJoy = canonicalAs.startsWith('/joy-ui/') && !disableCssVarsProvider;
  const CssVarsProvider = isJoy ? JoyCssVarsProvider : React.Fragment;
  const Wrapper = isJoy ? BrandingProvider : React.Fragment;
  const wrapperProps = {
    ...(isJoy && { mode: theme.palette.mode }),
  };

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
        <BrandingProvider>
          <AdGuest>
            <Ad />
          </AdGuest>
        </BrandingProvider>
      )}
      <CssVarsProvider>
        {isJoy && <JoyModeObserver mode={theme.palette.mode} />}
        {localizedDoc.rendered.map((renderedMarkdownOrDemo, index) => (
          <RichMarkdownElement
            key={`demos-section-${index}`}
            demoComponents={demoComponents}
            demos={demos}
            disableAd={disableAd}
            localizedDoc={localizedDoc}
            renderedMarkdownOrDemo={renderedMarkdownOrDemo}
            srcComponents={srcComponents}
            theme={theme}
            WrapperComponent={Wrapper}
            wrapperProps={wrapperProps}
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
