import React from 'react';
import PropTypes from 'prop-types';

let savedScrollTop = null;

export default function PersistScroll(props) {
  const { children } = props;
  const rootRef = React.useRef();

  React.useEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentNode : null;
    const activeElement = document.querySelector('.drawer-active');

    if (!parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    const activeBox = activeElement.getBoundingClientRect();

    if (savedScrollTop === null || activeBox.top - savedScrollTop < 0) {
      // Center the selected item in the list container.
      activeElement.scrollIntoView();
      // Fix a Chrome issue, reset the tabbable ring back to the top of the document.
      document.body.scrollIntoView();
    } else {
      parent.scrollTop = savedScrollTop;
    }

    return () => {
      savedScrollTop = parent.scrollTop;
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node,
};
