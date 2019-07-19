import React from 'react';
import PropTypes from 'prop-types';
import debounce from '../utils/debounce';
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

const TextareaAutosize = React.forwardRef(function TextareaAutosize(props, ref) {
  const { onChange, rows, rowsMax, style, value, ...other } = props;

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = React.useRef(null);
  const [state, setState] = React.useState({});

  const syncHeight = React.useCallback(() => {
    const input = inputRef.current;
    const computedStyle = window.getComputedStyle(input);

    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';

    const boxSizing = computedStyle['box-sizing'];
    const padding =
      getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    const border =
      getStyleValue(computedStyle, 'border-bottom-width') +
      getStyleValue(computedStyle, 'border-top-width');

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight - padding;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight - padding;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (rows != null) {
      outerHeight = Math.max(Number(rows) * singleRowHeight, outerHeight);
    }
    if (rowsMax != null) {
      outerHeight = Math.min(Number(rowsMax) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);

    setState(prevState => {
      // Need a large enough different to update the height.
      // This prevents infinite rendering loop.
      if (
        outerHeightStyle > 0 &&
        Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1
      ) {
        return {
          innerHeight,
          outerHeight,
          outerHeightStyle,
        };
      }

      return prevState;
    });
  }, [setState, rows, rowsMax, props.placeholder]);

  React.useEffect(() => {
    const handleResize = debounce(() => {
      syncHeight();
    });

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
        // Apply the rows prop to get a "correct" first SSR paint
        rows={rows || 1}
        style={{
          height: state.outerHeightStyle,
          // Need a large enough different to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: Math.abs(state.outerHeight - state.innerHeight) <= 1 ? 'hidden' : null,
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

TextareaAutosize.propTypes = {
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

export default TextareaAutosize;
