/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

const generateCards = count => {
  const cards = [];
  for (let index = 0; index < count; index += 1) {
    const type = Math.floor(Math.random() * 4);
    const height = [100, 150, 200, 180][type];
    const image = [
      '',
      '/static/images/cards/contemplative-reptile.jpg',
      '/static/images/cards/paella.jpg',
      '/static/images/cards/live-from-space.jpg',
    ][type];
    const imageHeight = [0, 50, 100, 80][type];

    cards.push({
      title: `#${index}`,
      content: `Card content #${index}`,
      height,
      image,
      imageHeight,
    });
  }
  return cards;
};

const columnWidth = 240;
const gutterSize = 6;
const overscanByPixels = 100;
const cards = generateCards(1000);

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 500,
    height: 350,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  masonryCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  masonry: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 12,
      paddingTop: theme.spacing.unit * 2,
    },
  },
  card: {
    width: columnWidth,
  },
  media: {
    height: 50,
  },
});

class IntegrationReactVirtualizedMasonry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellWidth: this.props.cellWidth || 1,
    };
    this.masonry = null;
    this.cellPositioner = null;
    this.columnCount = 0;
    this.cache = null;
    this.width = 1;
    this.height = 1;
  }

  componentWillMount() {
    this.cellRenderer = this.cellRenderer.bind(this);
    this.initCellPositioner = this.initCellPositioner.bind(this);
    this.calculateColumnCount = this.calculateColumnCount.bind(this);
    this.resetCellPositioner = this.resetCellPositioner.bind(this);
    this.handleOnResize = this.handleOnResize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cellCount !== nextProps.cellCount) {
      if (this.cache) {
        this.cache.clearAll();
      }
      this.resetCellPositioner();
      if (this.masonry) {
        this.masonry.clearCellPositions();
      }
    }
  }

  handleOnResize(size) {
    this.width = size.width || 1;
    this.height = size.height || 1;
    this.calculateColumnCount(size.width);
    this.resetCellPositioner();
    if (this.masonry) {
      this.masonry.recomputeCellPositions();
    }
  }

  initCellPositioner() {
    if (!this.cellPositioner) {
      this.cache = new CellMeasurerCache({
        defaultHeight: this.height || 1,
        defaultWidth: this.props.cellWidth,
        fixedWidth: true,
      });
      const { cellWidth } = this.state;

      this.cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth: cellWidth,
        spacer: gutterSize,
      });
    }
  }

  calculateColumnCount(width) {
    const { cellWidth } = this.state;
    this.columnCount = Math.floor(width / (cellWidth + gutterSize));
  }

  resetCellPositioner() {
    const { cellWidth } = this.state;
    if (this.cellPositioner) {
      this.cellPositioner.reset({
        columnCount: this.columnCount,
        columnWidth: cellWidth,
        spacer: gutterSize,
      });
    }
  }

  cellRenderer = props => {
    const { cellWidth } = this.state;
    const { itemRenderer, getCellHeight, classes } = this.props;
    const width = cellWidth + gutterSize;
    const height = (getCellHeight(props.index) || 1) + gutterSize;

    if (!this.cache) {
      return null;
    }

    return (
      <CellMeasurer
        aria-label="CellMeasurer"
        cache={this.cache}
        index={props.index}
        key={props.key}
        parent={props.parent}
        className={classes.masonryCell}
      >
        <div
          style={{
            ...props.style,
            width,
            height,
            minHeight: height,
          }}
        >
          {itemRenderer(props)}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const { cellCount, classes } = this.props;
    if (cellCount === 0) {
      return null;
    }

    return (
      <AutoSizer onResize={this.handleOnResize}>
        {({ height, width }) => {
          this.calculateColumnCount(width);
          this.initCellPositioner();
          if (
            !this.cache ||
            !this.cellPositioner ||
            !this.cellRenderer ||
            height === 0 ||
            width === 0
          ) {
            return null;
          }
          return (
            <Masonry
              className={classes.masonry}
              autoHeight={false}
              cellCount={cellCount}
              cellMeasurerCache={this.cache}
              cellPositioner={this.cellPositioner}
              cellRenderer={this.cellRenderer}
              height={height}
              overscanByPixels={overscanByPixels}
              ref={node => {
                this.masonry = node;
              }}
              width={width}
              scrollingResetTimeInterval={250}
            />
          );
        }}
      </AutoSizer>
    );
  }
}

IntegrationReactVirtualizedMasonry.propTypes = {
  cellCount: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  getCellHeight: PropTypes.func.isRequired,
  gutterSize: PropTypes.number.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  overscanByPixels: PropTypes.number.isRequired,
};

class IntegrationReactVirtualized extends React.Component {
  render() {
    const { classes } = this.props;
    const getCellHeight = index => {
      return cards[index].height;
    };
    const cellRenderer = ({ index, key }) => {
      const { height, title, image, imageHeight, content } = cards[index];

      return (
        <Card
          key={key}
          className={classes.card}
          style={{
            minHeight: height,
            height,
          }}
        >
          <CardMedia
            className={classes.media}
            style={{ height: imageHeight }}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography component="p">{content}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      );
    };

    return (
      <div className={classes.root}>
        <IntegrationReactVirtualizedMasonry
          classes={classes}
          cellWidth={columnWidth}
          gutterSize={gutterSize}
          overscanByPixels={overscanByPixels}
          cellCount={cards.length}
          getCellHeight={getCellHeight}
          itemRenderer={cellRenderer}
        />
      </div>
    );
  }
}

export default withStyles(styles)(IntegrationReactVirtualized);
