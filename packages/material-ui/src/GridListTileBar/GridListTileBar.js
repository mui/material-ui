// @inheritedComponent GridListTileBar

import React from 'react';
import warning from 'warning';
import ImageListTileBar from '../ImageListTileBar';

/**
 * Deprecated, use ImageListTileBar instead.
 */
export default function GridListTileBar(props) {
  warning(
    false,
    [
      'Material-UI: the GridListTileBar component is deprecated.',
      'The component was renamed to ImageListTileBar.',
    ].join('\n'),
  );
  return <ImageListTileBar {...props} />;
}
