import React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { toArray } from 'lodash';

export interface MasonryProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
}

export const styles = (theme: Theme) =>
  createStyles({
    /* Styles applied to the root element. */
    root: {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: -2,
    },
    /* Style applied to each column */
    column: (props: MasonryProps) => {
      const { columns = 2, spacing = 1 } = props;
      return {
        float: 'left',
        width: `${100 / columns}%`,
        padding: theme.spacing(spacing),
      };
    },
  });

const Masonry: React.FC<MasonryProps & WithStyles<typeof styles>> = (props) => {
  const { children, columns = 2, classes } = props;

  const itemsInColumns = () => {
    const currentColumnCount = columns;
    const colArray = new Array(currentColumnCount);
    const items = toArray(children);
    for (let i = 0; i < items.length; i += 1) {
      const columnIndex = i % currentColumnCount;

      if (!colArray[columnIndex]) {
        colArray[columnIndex] = [];
      }

      colArray[columnIndex].push(items[i]);
    }

    return colArray;
  };

  const columnElements = itemsInColumns();
  return (
    <div>
      {columnElements.map((columnEl, index) => (
        <div key={`masonry-column-${index}`} className={classes.column}>
          {columnEl}
        </div>
      ))}
    </div>
  );
};
/**
 *
 * Demos:
 *
 * - [Masonry](https://material-ui.com/components/masonry/)
 *
 * API:
 *
 * - [Masonry API](https://material-ui.com/api/masonry/)
 */
export default withStyles(styles, {
  name: 'Masonry',
})(Masonry) as (props: MasonryProps) => JSX.Element;
