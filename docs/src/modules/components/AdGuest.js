import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AdContext } from 'docs/src/modules/components/AdManager';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';

export default function AdGuest(props) {
  const { element } = React.useContext(AdContext);

  useEnhancedEffect(() => {
    if (element != null) {
      const description = document.querySelector('.description');

      if (element === description) {
        description.classList.add('ad');
      } else {
        description.classList.remove('ad');
      }
    }
  }, [element]);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(props.children, element);
}

AdGuest.propTypes = {
  children: PropTypes.node,
};
