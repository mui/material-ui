import * as React from 'react';
import * as icons from '@material-ui/icons';

export default function AllIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(icons).map(([name, Component]) => {
        return <Component key={name} style={{ fontSize: '2.5rem' }} />;
      })}
    </div>
  );
}
