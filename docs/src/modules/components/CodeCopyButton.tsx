import * as React from 'react';
import useClipboardCopy from 'docs/src/modules/utils/useClipboardCopy';

interface CodeCopyButtonProps {
  code: string;
}

export default function CodeCopyButton(props: CodeCopyButtonProps) {
  const { code, ...other } = props;
  const { copy, isCopied } = useClipboardCopy();
  // This component is designed to be wrapped in NoSsr
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const key = macOS ? '⌘' : 'Ctrl + ';

  return (
    <button
      {...other}
      aria-label="Copy the code"
      type="button"
      className="MuiCode-copy"
      onClick={async (event) => {
        event.stopPropagation();
        await copy(code);
      }}
    >
      {/* material-ui/no-hardcoded-labels */}
      {isCopied ? 'Copied' : 'Copy'}&nbsp;
      <span className="MuiCode-copyKeypress">
        <span>(or</span> {key}C<span>)</span>
      </span>
    </button>
  );
}
