import * as React from 'react';
import { flushSync } from 'react-dom';
import {
  unstable_debounce as debounce,
  unstable_useForkRef as useForkRef,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_ownerWindow as ownerWindow,
} from '@mui/utils';
import { StyleStateProps, TextareaAutosizeProps } from './textareaAutoSize.types';

function getStyleValue(computedStyle: object, property: string): number {
  return parseInt(computedStyle[property as keyof typeof computedStyle], 10) || 0;
}

const styles = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)',
  },
};

function isEmpty(obj: object): boolean {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}


const TextareaAutosize = React.forwardRef((props: TextareaAutosizeProps, ref: React.ForwardedRef<unknown>) => {
  const { onChange, maxRows, minRows = 1, style, value, ...other } = props;

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = React.useRef<HTMLTextAreaElement>(null);
  const renders = React.useRef(0);
  const [state, setState] = React.useState({} as StyleStateProps);

  const getUpdatedState = React.useCallback(() => {
    const input: HTMLInputElement | null = inputRef.current;
    const containerWindow = ownerWindow(input || undefined);
    const computedStyle = containerWindow.getComputedStyle(input as HTMLInputElement);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === '0px') {
      return {};
    }

    const inputShallow: HTMLTextAreaElement = shadowRef.current || new HTMLTextAreaElement;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input && input.value || props.placeholder || 'x';
    if (inputShallow && inputShallow.value?.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    const boxSizing = computedStyle['box-sizing' as keyof typeof computedStyle];
    const padding =
      getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    const border =
      getStyleValue(computedStyle, 'border-bottom-width') +
      getStyleValue(computedStyle, 'border-top-width');

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    return { outerHeightStyle, overflow };
  }, [maxRows, minRows, props.placeholder]);

  const updateState = (prevState: StyleStateProps, newState: StyleStateProps) => {
    const { outerHeightStyle, overflow } = newState;
    // Need a large enough difference to update the height.
    // This prevents infinite rendering loop.
    if (
      renders.current < 20 &&
      ((outerHeightStyle && outerHeightStyle > 0 &&
        Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
        prevState.overflow !== overflow)
    ) {
      renders.current += 1;
      return {
        overflow,
        outerHeightStyle,
      };
    }
    if (process.env.NODE_ENV !== 'production') {
      if (renders.current === 20) {
        console.error(
          [
            'MUI: Too many re-renders. The layout is unstable.',
            'TextareaAutosize limits the number of renders to prevent an infinite loop.',
          ].join('\n'),
        );
      }
    }
    return prevState;
  };

  const syncHeight = React.useCallback(() => {
    const newState: StyleStateProps = getUpdatedState();

    if (isEmpty(newState)) {
      return;
    }

    setState((prevState) => {
      return updateState(prevState, newState);
    });
  }, [getUpdatedState]);

  const syncHeightWithFlushSycn = () => {
    const newState = getUpdatedState();

    if (isEmpty(newState)) {
      return;
    }

    // In React 18, state updates in a ResizeObserver's callback are happening after the paint which causes flickering
    // when doing some visual updates in it. Using flushSync ensures that the dom will be painted after the states updates happen
    // Related issue - https://github.com/facebook/react/issues/24331
    flushSync(() => {
      setState((prevState) => {
        return updateState(prevState, newState);
      });
    });
  };

  React.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;

      // If the TextareaAutosize component is replaced by Suspense with a fallback, the last
      // ResizeObserver's handler that runs because of the change in the layout is trying to
      // access a dom node that is no longer there (as the fallback component is being shown instead).
      // See https://github.com/mui/material-ui/issues/32640
      if (inputRef.current) {
        syncHeightWithFlushSycn();
      }
    });
    const containerWindow = ownerWindow(inputRef.current as HTMLInputElement);
    containerWindow.addEventListener('resize', handleResize);
    let resizeObserver: ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current as HTMLInputElement);
    }

    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  });

  useEnhancedEffect(() => {
    syncHeight();
  });

  React.useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <React.Fragment>
      <textarea
        value={value}
        onChange={handleChange}
        ref={handleRef}
        // Apply the rows prop to get a "correct" first SSR paint
        rows={minRows}
        style={{
          height: state?.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? 'hidden' : undefined,
          ...style,
        }}
        {...other}
      />
      <textarea
        aria-hidden
        className={props.className}
        readOnly
        ref={shadowRef}
        tabIndex={-1}
        style={{
          ...styles.shadow,
          ...style,
          padding: 0,
        } as React.CSSProperties}
      />
    </React.Fragment>
  );

});
export default TextareaAutosize;
export { TextareaAutosizeProps }