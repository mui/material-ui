/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';

export default function ImageMasonry(): JSX.Element {
  return (
    <Masonry
      cols={{ xs: 3, sm: 5, md: 7 }}
      spacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ height: 300 }}
    >
      {imgData.map((item, idx) => (
        <MasonryItem key={idx}>
          <img alt={item.title} src={item.img} />
        </MasonryItem>
      ))}
    </Masonry>
  );
}

const imgData = [
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: '1',
  },
  {
    img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '2',
  },
  {
    img: 'https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-1080x1440.jpeg',
    title: '3',
  },
  {
    img: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    title: '4',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    title: '5',
  },
  {
    img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '6',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg',
    title: '7',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
    title: '8',
  },
  {
    img: 'https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270',
    title: '9',
  },
  {
    img: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    title: '10',
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: '11',
  },
  {
    img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '12',
  },
  {
    img: 'https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-1080x1440.jpeg',
    title: '13',
  },
  {
    img: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    title: '14',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    title: '15',
  },
  {
    img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: '16',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg',
    title: '17',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
    title: '18',
  },
  {
    img: 'https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270',
    title: '19',
  },
  {
    img: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    title: '20',
  },
];
