import * as React from 'react';
import PropTypes from 'prop-types';
import debounce from '../utils/debounce';
import { ownerWindow } from '../utils';

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll',
};

/**
 * @ignore - internal component.
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
export default function ScrollbarSize(props) {
  const { onChange, ...other } = props;
  const scrollbarHeight = React.useRef();
  const nodeRef = React.useRef(null);

  const setMeasurements = (element) => {
    scrollbarHeight.current = element.offsetHeight - element.clientHeight;
  };

  React.useEffect(() => {
    const element = nodeRef.current;
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements(element);

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });

    const containerWindow = ownerWindow(element);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);

  React.useEffect(() => {
    setMeasurements(nodeRef.current);
    onChange(scrollbarHeight.current);
  }, [onChange]);

  return <div style={styles} ref={nodeRef} {...other} />;
}

ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired,
};
