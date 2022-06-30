/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';

const CodeCopyButton = React.forwardRef(function CodeCopyButton(props, ref) {
  const { code, ...other } = props;
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
    <button
      {...other}
      aria-label="Copy the code"
      type="button"
      className="MuiCode-copy"
      onClick={async (event) => {
        event.stopPropagation()
        setCopied(true);
        await copy(code);
      }}
    >
      {copied ? 'Copied' : 'Copy'}&nbsp;
      <span className="MuiCode-copyKeypress">
        <span>(Or</span> {key}C<span>)</span>
      </span>
    </button>
  );
});

CodeCopyButton.propTypes = {
  code: PropTypes.string.isRequired,
};

export default CodeCopyButton;
