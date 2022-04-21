/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { setupKeyboardCopy } from 'docs/src/modules/utils/useCodeCopy';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {
    analytics,
    code,
    language,
    component: Component = MarkdownElement,
    enableCodeCopy,
    ...other
  } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);
  const [copied, setCopied] = React.useState(false);
  const btnRef = React.useRef(null);
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
  React.useEffect(() => {
    setupKeyboardCopy(btnRef.current);
  }, []);

  return (
    <Component ref={ref} enableCodeCopy={enableCodeCopy} {...other}>
      <div className="MuiCode-root">
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
            ref={btnRef}
            aria-label="Copy the code"
            type="button"
            className="MuiCode-copy"
            onClick={async (event) => {
              event.stopPropagation();
              setCopied(true);
              await copy(code);
            }}
          >
            {copied ? 'Copied' : 'Copy'}
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
