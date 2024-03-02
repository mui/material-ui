import * as React from 'react';
import clipboardCopy from 'clipboard-copy';

export default function useClipboardCopy() {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const copy = async (text: string) => {
    try {
      setIsCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        if (mounted) {
          setIsCopied(false);
        }
      }, 1200);
      await clipboardCopy(text);
    } catch (error) {
      // ignore error
    }
  };

  return { copy, isCopied };
}
