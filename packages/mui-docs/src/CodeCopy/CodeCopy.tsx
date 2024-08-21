import * as React from 'react';
import { useRouter } from 'next/router';
import clipboardCopy from 'clipboard-copy';

const CodeBlockContext = React.createContext<React.MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

/**
 * How to use: spread the handlers to the .MuiCode-root
 *
 * The html structure should be:
 * <div className="MuiCode-root">
 *  <pre>...</pre>
 *  <button className="MuiCode-copy">...</button>
 * </div>
 */
export function useCodeCopy(): React.HTMLAttributes<HTMLDivElement> {
  const rootNode = React.useContext(CodeBlockContext);
  return {
    onMouseEnter: (event) => {
      rootNode.current = event.currentTarget;
    },
    onMouseLeave: (event) => {
      if (rootNode.current === event.currentTarget) {
        (rootNode.current.querySelector('.MuiCode-copy') as null | HTMLButtonElement)?.blur();
        rootNode.current = null;
      }
    },
    onFocus: (event) => {
      rootNode.current = event.currentTarget;
    },
    onBlur: (event) => {
      if (rootNode.current === event.currentTarget) {
        rootNode.current = null;
      }
    },
  };
}

function InitCodeCopy() {
  const rootNode = React.useContext(CodeBlockContext);
  const router = useRouter();
  React.useEffect(() => {
    let key = 'Ctrl + ';
    if (typeof window !== 'undefined') {
      const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (macOS) {
        key = '⌘';
      }
    }
    const codeRoots = document.getElementsByClassName(
      'MuiCode-root',
    ) as HTMLCollectionOf<HTMLDivElement>;

    if (codeRoots !== null) {
      const listeners: Array<() => void> = [];
      Array.from(codeRoots).forEach((elm) => {
        const handleMouseEnter = () => {
          rootNode.current = elm;
        };

        elm.addEventListener('mouseenter', handleMouseEnter);
        listeners.push(() => elm.removeEventListener('mouseenter', handleMouseEnter));

        const handleMouseLeave = () => {
          if (rootNode.current === elm) {
            (rootNode.current.querySelector('.MuiCode-copy') as null | HTMLButtonElement)?.blur();
            rootNode.current = null;
          }
        };
        elm.addEventListener('mouseleave', handleMouseLeave);
        listeners.push(() => elm.removeEventListener('mouseleave', handleMouseLeave));

        const handleFocusin = () => {
          // use `focusin` because it bubbles from the copy button
          rootNode.current = elm;
        };
        elm.addEventListener('focusin', handleFocusin);
        listeners.push(() => elm.removeEventListener('focusin', handleFocusin));

        const handleFocusout = () => {
          // use `focusout` because it bubbles from the copy button
          if (rootNode.current === elm) {
            rootNode.current = null;
          }
        };
        elm.addEventListener('focusout', handleFocusout);
        listeners.push(() => elm.removeEventListener('focusout', handleFocusout));

        async function handleClick(event: MouseEvent) {
          const trigger = event.currentTarget as HTMLButtonElement;
          const pre = (event.currentTarget as Element)?.previousElementSibling as Element;
          const textNode = trigger.childNodes[0];
          textNode.nodeValue = textNode.textContent?.replace('Copy', 'Copied') || null;
          trigger.dataset.copied = 'true';
          setTimeout(() => {
            if (trigger) {
              textNode.nodeValue = textNode.textContent?.replace('Copied', 'Copy') || null;
              delete trigger.dataset.copied;
            }
          }, 2000);
          try {
            if (pre.textContent) {
              await clipboardCopy(pre.textContent);
            }
            // eslint-disable-next-line no-empty
          } catch (error) {}
        }

        const btn = elm.querySelector('.MuiCode-copy') as HTMLButtonElement | null;
        if (btn) {
          const keyNode = btn.querySelector('.MuiCode-copyKeypress')?.childNodes[1];
          if (!keyNode) {
            // skip the logic if the btn is not generated from the markdown.
            return;
          }
          keyNode.textContent = keyNode?.textContent?.replace('$key', key) || null;
          btn.addEventListener('click', handleClick);
          listeners.push(() => btn.removeEventListener('click', handleClick));
        }
      });

      return () => {
        listeners.forEach((removeEventListener) => {
          removeEventListener();
        });
      };
    }

    return undefined;
  }, [rootNode, router.pathname]);
  return null;
}

function hasNativeSelection(element: HTMLTextAreaElement) {
  if (window.getSelection()?.toString()) {
    return true;
  }

  // window.getSelection() returns an empty string in Firefox for selections inside a form element.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=85686.
  // Instead, we can use element.selectionStart that is only defined on form elements.
  if (element && (element.selectionEnd || 0) - (element.selectionStart || 0) > 0) {
    return true;
  }

  return false;
}

interface CodeCopyProviderProps {
  children: React.ReactNode;
}

/**
 * Place <CodeCopyProvider> at the page level. It will check the keydown event and try to initiate copy click if rootNode exist.
 * Any code block inside the tree can set the rootNode when mouse enter to leverage keyboard copy.
 */
export function CodeCopyProvider({ children }: CodeCopyProviderProps) {
  const rootNode = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (!rootNode.current) {
        return;
      }

      // Skip if user is highlighting a text.
      if (hasNativeSelection(event.target as HTMLTextAreaElement)) {
        return;
      }

      // Skip if it's not a copy keyboard event
      if (
        !(
          (event.ctrlKey || event.metaKey) &&
          String.fromCharCode(event.keyCode) === 'C' &&
          !event.shiftKey &&
          !event.altKey
        )
      ) {
        return;
      }

      const copyBtn = rootNode.current.querySelector('.MuiCode-copy') as HTMLButtonElement;
      const initialEventAction = copyBtn.getAttribute('data-ga-event-action');
      // update the 'data-ga-event-action' on the button to track keyboard interaction
      copyBtn.dataset.gaEventAction =
        initialEventAction?.replace('click', 'keyboard') || 'copy-keyboard';
      copyBtn.click(); // let the GA setup in GoogleAnalytics.js do the job
      copyBtn.dataset.gaEventAction = initialEventAction!; // reset the 'data-ga-event-action' back to initial
    });
  }, []);
  return (
    <CodeBlockContext.Provider value={rootNode}>
      <InitCodeCopy />
      {children}
    </CodeBlockContext.Provider>
  );
}
