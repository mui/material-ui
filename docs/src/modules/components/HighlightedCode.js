/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {
    copyButtonHidden = false,
    copyButtonProps,
    code,
    language,
    component: Component = MarkdownElement,
    ...other
  } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);
  const [copied, setCopied] = React.useState(false);
  const [key, setKey] = React.useState('Ctrl + ');
  const handlers = useCodeCopy();
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (macOS) {
        setKey('⌘');
      }
    }
  }, []);
  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [copied]);

  return (
    <Component ref={ref} {...other}>
      <div className="MuiCode-root" {...handlers}>
        <pre>
          <code
            className={`language-${language}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
        {!copyButtonHidden && (
          <button
            {...copyButtonProps}
            aria-label="Copy the code"
            type="button"
            className="MuiCode-copy"
            onClick={async () => {
              setCopied(true);
              await copy(code);
            }}
          >
            {copied ? 'Copied' : 'Copy'}&nbsp;
            <span className="MuiCode-copyKeypress">
              <span>(Or</span> {key}C<span>)</span>
            </span>
          </button>
        )}
      </div>
    </Component>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  copyButtonHidden: PropTypes.bool,
  copyButtonProps: PropTypes.object,
  language: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default HighlightedCode;
