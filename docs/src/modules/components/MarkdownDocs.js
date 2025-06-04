import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import { Ad, AdGuest } from '@mui/docs/Ad';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useUserLanguage } from '@mui/docs/i18n';
import { useRouter } from 'next/router';
import { DemoPageThemeProvider } from 'docs/src/theming';
import useScopedDemo from '../utils/useScopedDemo';

const isBrowser = typeof window !== 'undefined';

export default function MarkdownDocs(props) {
  const {
    disableAd = false,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
    enableOpenInNewTab = false,
  } = props;

  const userLanguage = useUserLanguage();
  const localizedDoc = docs[userLanguage] || docs.en;

  const router = useRouter();
  const scopedDemo = useScopedDemo();

  if (scopedDemo) {
    if (isBrowser) {
      document.body.style.visibility = 'initial';
    }
    const canonicalAs = router.asPath || '';
    const isJoy = canonicalAs.startsWith('/joy-ui/');
    return (
      <DemoPageThemeProvider hasJoy={isJoy}>
        <div style={{ width: '100%', height: '100vh', padding: '4px' }}>
          <RichMarkdownElement
            demoComponents={demoComponents}
            demos={demos}
            disableAd={disableAd}
            localizedDoc={localizedDoc}
            srcComponents={srcComponents}
            renderedMarkdownOrDemo={{
              demo: scopedDemo,
              hideToolbar: true,
              bg: false,
            }}
          />
        </div>
      </DemoPageThemeProvider>
    );
  }

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
      {localizedDoc.rendered.map((renderedMarkdownOrDemo, index) => (
        <RichMarkdownElement
          key={`demos-section-${index}`}
          demoComponents={demoComponents}
          demos={demos}
          disableAd={disableAd}
          localizedDoc={localizedDoc}
          renderedMarkdownOrDemo={renderedMarkdownOrDemo}
          srcComponents={srcComponents}
          enableOpenInNewTab={enableOpenInNewTab}
        />
      ))}
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  enableOpenInNewTab: PropTypes.bool,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
