import React, {Component, PropTypes} from 'react';
import GridTile from './GridTile';

function getStyles(props) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: -7,
    },
    item: {
      boxSizing: 'border-box',
      padding: 15,
    },
  };
}

function getTileStyles(styles) {
    const tileSize = 80;
    const tilePadding = 30;
    const tileTitleHieght = 20;
    
  return Object.assign({}, styles.item, {        
      width: tileSize + tilePadding,        
      height: tileSize + tilePadding + tileTitleHieght,
    });
}

class GridTileList extends Component {
  static propTypes = {
    /**
     * The tile items.
     */
    tilesData: PropTypes.array,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };
  
  state = {
    selectedId: ""
  };
  
  static defaultProps = {
    cols: 2,
    padding: 10,
    cellHeight: 130,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  
   handleClick = (event, id) => {
    this.setState({
      selectedId: id
    });
  };
  

  render() {
    const {      
      tilesData,
      style,
      ...other,
    } = this.props;

    
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const mergedRootStyles = Object.assign(styles.root, style);
    return (
      <div  style={prepareStyles(mergedRootStyles)} {...other}>
         {tilesData.map((tile) => (           
           <div  key={tile.id} style={prepareStyles(getTileStyles(styles))}>
              <GridTile
                key={tile.id}  
                id={tile.id.toString()}    
                url={tile.url}      
                title={tile.title}
                selected={this.state.selectedId === tile.id.toString()}   
                onItemSelected={this.handleClick}
              >
                <img src={tile.img} />
              </GridTile>
        </div>
      ))}
      </div>
    );
  }
}

export default GridTileList;
