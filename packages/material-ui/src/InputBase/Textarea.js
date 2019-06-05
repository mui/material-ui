import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import { useForkRef } from '../utils/reactHelpers';

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const styles = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: '0',
  },
};

/**
 * @ignore - internal component.
 *
 * To make public in v4+.
 */
const Textarea = React.forwardRef(function Textarea(props, ref) {
  const { onChange, rows, rowsMax, style, value, ...other } = props;

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef(null);
  const [state, setState] = React.useState({});
  const shadowRef = React.useRef(null);
  const handleRef = useForkRef(ref, inputRef);

  const syncHeight = React.useCallback(() => {
    const input = inputRef.current;
    const inputShallow = shadowRef.current;

    const computedStyle = window.getComputedStyle(input);
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;
    const boxSizing = computedStyle['box-sizing'];

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (rows != null) {
      outerHeight = Math.max(Number(rows) * singleRowHeight, outerHeight);
    }
    if (rowsMax != null) {
      outerHeight = Math.min(Number(rowsMax) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    if (boxSizing === 'content-box') {
      outerHeight -=
        getStyleValue(computedStyle, 'padding-bottom') +
        getStyleValue(computedStyle, 'padding-top');
    } else if (boxSizing === 'border-box') {
      outerHeight +=
        getStyleValue(computedStyle, 'border-bottom-width') +
        getStyleValue(computedStyle, 'border-top-width');
    }

    setState(prevState => {
      // Need a large enough different to update the height.
      // This prevents infinite rendering loop.
      if (innerHeight > 0 && Math.abs((prevState.innerHeight || 0) - innerHeight) > 1) {
        return {
          innerHeight,
          outerHeight,
        };
      }

      return prevState;
    });
  }, [setState, rows, rowsMax, props.placeholder]);

  React.useEffect(() => {
    const handleResize = debounce(() => {
      syncHeight();
    }, 166); // Corresponds to 10 frames at 60 Hz.

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  const handleChange = event => {
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
        style={{
          height: state.outerHeight,
          overflow: state.outerHeight === state.innerHeight ? 'hidden' : null,
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
        style={{ ...styles.shadow, ...style }}
      />
    </React.Fragment>
  );
});

Textarea.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * Minimum umber of rows to display.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.any,
};

export default Textarea;
