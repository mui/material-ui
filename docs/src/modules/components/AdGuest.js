import * as React from 'react';
import PropTypes from 'prop-types';
import Portal from '@material-ui/core/Portal';
import { AdContext } from 'docs/src/modules/components/AdManager';

export default function AdGuest(props) {
  const ad = React.useContext(AdContext);

  if (!ad.portal.element) {
    return null;
  }

  return (
    <Portal
      container={() => {
        const description = document.querySelector('.description');

        if (ad.portal.element === description) {
          description.classList.add('ad');
        } else {
          description.classList.remove('ad');
        }

        return ad.portal.element;
      }}
    >
      {props.children}
    </Portal>
  );
}

AdGuest.propTypes = {
  children: PropTypes.node,
};
