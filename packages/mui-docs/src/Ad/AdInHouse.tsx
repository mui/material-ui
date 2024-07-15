import * as React from 'react';
import PropTypes from 'prop-types';
import AdDisplay, { AdParameters } from './AdDisplay';

export default function AdInHouse(props: { ad: Omit<AdParameters, 'poweredby' | 'label'> }) {
  const { ad } = props;

  return <AdDisplay ad={{ poweredby: 'MUI', label: `in-house-${ad.name}`, ...ad }} />;
}

AdInHouse.propTypes = {
  ad: PropTypes.object.isRequired,
};
