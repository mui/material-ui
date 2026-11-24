import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import { Ad, AdGuest } from '@mui/internal-core-docs/Ad';
import { RichMarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { AppLayoutDocs, HEIGHT as AppFrameHeight } from '@mui/internal-core-docs/AppLayout';

export default function MarkdownDocsV2(props) {
  const {
    disableAd = false,
    disableToc = false,
    wideLayout,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const localizedDoc = docs.en;

  return (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      wideLayout={wideLayout}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={localizedDoc.toc}
      disableLayout
    >
      <div style={{ '--MuiDocs-header-height': `${AppFrameHeight}px` }}>
        {disableAd ? null : (
          <AdGuest>
            <Ad />
          </AdGuest>
        )}
        {localizedDoc.rendered.map((renderedMarkdownOrDemo, index) => (
          <RichMarkdownElement
            key={`common-elements-${index}`}
            demoComponents={demoComponents}
            demos={demos}
            disableAd={disableAd}
            localizedDoc={localizedDoc}
            renderedMarkdownOrDemo={renderedMarkdownOrDemo}
            srcComponents={srcComponents}
          />
        ))}
      </div>
    </AppLayoutDocs>
  );
}

MarkdownDocsV2.propTypes = {
  wideLayout: PropTypes.bool,
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsV2.propTypes = exactProp(MarkdownDocsV2.propTypes);
}
