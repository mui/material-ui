import * as React from 'react';
import { Badge } from '@mui/base/Badge';
import { Button } from '@mui/base/Button';

export default function ComponentsGallery() {
  return (
    <div style={{ padding: '8px' }}>
      <Badge
        slotProps={{
          root: { className: 'GalleryBadge' },
          badge: { className: 'GalleryBadge--badge' },
        }}
        badgeContent={5}
      >
        <span className="GalleryBadge--content" />
      </Badge>
      <br />
      <Button className="GalleryButton">Button</Button>
      <Button className="GalleryButton" disabled>
        Disabled
      </Button>
    </div>
  );
}
