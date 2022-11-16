import * as React from 'react';
import copy from 'clipboard-copy';

interface CodeCopyButtonProps {
  code: string;
}

export default function CodeCopyButton(props: CodeCopyButtonProps) {
  const { code, ...other } = props;
  const [copied, setCopied] = React.useState(false);
  // This component is designed to be wrapped in NoSsr
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const key = macOS ? '⌘' : 'Ctrl + ';

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
        event.stopPropagation();
        setCopied(true);
        await copy(code);
      }}
    >
      {/* material-ui/no-hardcoded-labels */}
      {copied ? 'Copied' : 'Copy'}&nbsp;
      <span className="MuiCode-copyKeypress">
        <span>(or</span> {key}C<span>)</span>
      </span>
    </button>
  );
}
