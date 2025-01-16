import * as React from 'react';
import type { AdParameters } from './AdDisplay';
import AdDisplay from './AdDisplay';

export default function AdInHouse(props: { ad: Omit<AdParameters, 'poweredby' | 'label'> }) {
  const { ad } = props;

  return <AdDisplay ad={{ poweredby: 'MUI', label: `in-house-${ad.name}`, ...ad }} />;
}
