import * as React from 'react';
import copy from 'clipboard-copy';

export const setupKeyboardCopy = (copyBtn: HTMLButtonElement) => {
  if (!copyBtn) {
    return;
  }
  copyBtn.addEventListener('keydown', (event) => {
    if (event.code === 'KeyC' && (!!event.metaKey || !!event.ctrlKey) && !event.shiftKey) {
      copyBtn.click();
      if (typeof window !== 'undefined' && 'ga' in window) {
        // @ts-ignore
        window.ga('send', {
          hitType: 'event',
          eventCategory: copyBtn.getAttribute('data-ga-event-category') || 'code',
          eventAction:
            // the button's `data-ga-event-action` usually is `copy-click`
            copyBtn.getAttribute('data-ga-event-action')?.replace('click', 'keyboard') ||
            'copy-keyboard',
          eventLabel: copyBtn.getAttribute('data-ga-event-label'),
        });
      }
    }
  });
  copyBtn.parentElement?.addEventListener('mouseenter', () => {
    copyBtn.focus();
  });
  copyBtn.parentElement?.addEventListener('mouseleave', () => {
    copyBtn.blur();
  });
};

/**
 * Query all buttons with a specific class to:
 * - add copy functionality on click
 * - add keyboard support to its parent when hover
 *
 * Use this approach due to server-side rendering of the markdown content(`/docs/packages/markdown/parseMarkdown.js:258`).
 */
export default function useCodeCopy() {
  React.useEffect(() => {
    const buttons = document.getElementsByClassName(
      'MuiCode-copy',
    ) as HTMLCollectionOf<HTMLButtonElement>;

    if (buttons !== null) {
      Array.from(buttons).forEach((btn) => {
        btn.addEventListener('click', async function handleClick(event) {
          const trigger = event.currentTarget as Element;
          const pre = (event.currentTarget as Element)?.previousElementSibling as Element;
          trigger.textContent = 'Copied!';
          setTimeout(() => {
            trigger.textContent = 'Copy';
          }, 2000);
          try {
            if (pre.textContent) {
              await copy(pre.textContent);
            }
            // eslint-disable-next-line no-empty
          } catch (error) {}
        });
        setupKeyboardCopy(btn);
      });
    }
  }, []);
}
