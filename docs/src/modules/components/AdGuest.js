import * as React from 'react';
import PropTypes from 'prop-types';
import Portal from '@mui/material/Portal';
import { AdContext } from 'docs/src/modules/components/AdManager';

export default function AdGuest(props) {
  const { classSelector = '.description', children } = props;
  const ad = React.useContext(AdContext);

  if (!ad.element) {
    return null;
  }

  return (
    <Portal
      container={() => {
        const element = document.querySelector(classSelector);

        if (ad.element === element) {
          element.classList.add('ad');
        } else {
          element.classList.remove('ad');
        }

        return ad.element;
      }}
    >
      {children}
    </Portal>
  );
}

AdGuest.propTypes = {
  children: PropTypes.node,
  classSelector: PropTypes.string,
};
