import { GridList, GridListTile } from '@material-ui/core';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import LinksGridList from './other';

<GridList cellHeight="auto" cols={numOfCols}>
  {items.map(({ text, href, Icon }, i) => (
    <GridListTile key={i}>
      <IconLink href={href} text={text ?? href} Icon={Icon} />
    </GridListTile>
  ))}
  <LinksGridList />
</GridList>;
