import { ImageList, ImageListItem } from '@material-ui/core';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import LinksGridList from './other';

<ImageList cellHeight="auto" cols={numOfCols}>
  {items.map(({ text, href, Icon }, i) => (
    <ImageListItem key={i}>
      <IconLink href={href} text={text ?? href} Icon={Icon} />
    </ImageListItem>
  ))}
  <LinksGridList />
</ImageList>;
