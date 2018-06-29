import React from 'react';
import createSvgIcon from './utils/createSvgIcon';

export default createSvgIcon(
  <g>    <defs>
            </defs>
    <clipPath id="b">
        <use  overflow="visible" />
    </clipPath>
    <path clip-path="url(#b)" d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
</g>
, 'DragHandle');
