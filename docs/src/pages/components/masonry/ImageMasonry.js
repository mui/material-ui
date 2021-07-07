import * as React from 'react';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';
import { imgData } from './demoData';

export default function ImageMasonry() {
  return (
    <Masonry cols={5} gap={8}>
      {imgData.map((item, idx) => (
        <MasonryItem key={idx}>
          <img alt={item.title} src={item.img} />
        </MasonryItem>
      ))}
    </Masonry>
  );
}
