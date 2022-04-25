import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {
    analytics,
    code,
    language,
    component: Component = MarkdownElement,
    enableCodeCopy,
    ...other
  } = props;
  const t = useTranslate();
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);
  const [copied, setCopied] = React.useState(false);
  const handlers = useCodeCopy();
  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [copied]);

  return (
    <Component ref={ref} enableCodeCopy={enableCodeCopy} {...other}>
      <div className="MuiCode-root" {...handlers}>
        <pre>
          <code
            className={`language-${language}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
        {enableCodeCopy && (
          <button
            {...analytics}
            aria-label={t('clickToCopy')}
            type="button"
            className="MuiCode-copy"
            onClick={async (event) => {
              event.stopPropagation();
              setCopied(true);
              await copy(code);
            }}
          >
            {copied ? t('copied') : t('clickToCopy')}
          </button>
        )}
      </div>
    </Component>
  );
});

HighlightedCode.propTypes = {
  analytics: PropTypes.object,
  code: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  enableCodeCopy: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default HighlightedCode;
