import * as React from 'react';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';
import { divData } from './demoData';

export default function BasicMasonry(): JSX.Element {
  return (
    <Masonry cols={4} gap={10}>
      {divData.map((item, idx) => (
        <MasonryItem key={idx}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: item.height,
              border: '1px solid black',
              backgroundColor: 'white',
            }}
          >
            {idx + 1}
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}
