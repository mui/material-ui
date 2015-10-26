let React = require('react');
let { GridList, GridTile } = require('material-ui');

let StarBorder = require('svg-icons/toggle/star-border');
let IconButton = require('icon-button');

let ComponentDoc = require('../../component-doc');


class GridListPage extends React.Component {

  constructor(props) {
    super(props);

    this.code = `
{/* Basic grid list with mostly default options */}
<GridList
  cellHeight={200}
  style={{width: 320, height: 640, overflowY: 'auto'}}
  >
  {
    tilesData.map(tile => <GridTile
      title={tile.title}
      subtitle={<span>by <b>{tile.author}</b></span>}
      actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
      ><img src={tile.img} /></GridTile>)
  }
</GridList>
{/* Grid list with all possible overrides */}
<GridList
  cols={2}
  cellHeight={200}
  padding={1}
  style={{width: 320, height: 640, overflowY: 'auto'}}
  >
  {
    tilesData.map(tile => <GridTile
      title={tile.title}
      actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
      actionPosition="left"
      titlePosition="top"
      titleBackground={gradientBg}
      cols={tile.featured ? 2 : 1}
      rows={tile.featured ? 2 : 1}
      ><img src={tile.img} /></GridTile>)
  }
</GridList>
    `;

    this.desc = <p>Simple flex-box based <a
                  href="https://www.google.com/design/spec/components/grid-lists.html"
                  >Grid List</a> implementation. Support tiles with arbitrary cell size,
                  but cannot implement complex layouts (like <a
                  href="https://material.angularjs.org/latest/#/demo/material.components.gridList"
                  >Angular Material GridList</a>)
                  , is limited to flex-box limitations.</p>;

    this.componentInfo = [
      {
        name: 'GridList Props',
        infoArray: [
          {
            name: 'cols',
            type: 'number',
            header: 'optional',
            desc: 'Number of columns. Defaults to 2.',
          },
          {
            name: 'padding',
            type: 'number',
            header: 'optional',
            desc: 'Number of px for the padding/spacing between items. Defaults to 4.',
          },
          {
            name: 'cellHeight',
            type: 'number',
            header: 'optional',
            desc: 'Number of px for one cell height. Defaults to 180.',
          },
        ],
      },
      {
        name: 'GridTile Props',
        infoArray: [
          {
            name: 'title',
            type: 'string',
            header: 'optional',
            desc: 'Title to be displayed on tile.',
          },
          {
            name: 'subtitle',
            type: 'node',
            header: 'optional',
            desc: 'String or element serving as subtitle (support text).',
          },
          {
            name: 'titlePosition',
            type: '"top"|"bottom"',
            header: 'optional',
            desc: 'Position of the title bar (container of title, subtitle and action icon). Defaults to "bottom".',
          },
          {
            name: 'titleBackground',
            type: 'string',
            header: 'optional',
            desc: 'Style used for title bar background. Defaults to "rgba(0, 0, 0, 0.4)". Useful for setting custom gradients for example',
          },
          {
            name: 'actionIcon',
            type: 'element',
            header: 'optional',
            desc: 'An IconButton element to be used as secondary action target (primary action target is the tile itself).',
          },
          {
            name: 'actionPosition',
            type: '"left"|"right"',
            header: 'optional',
            desc: 'Position of secondary action IconButton. Defaults to "right".',
          },
          {
            name: 'cols',
            type: 'number',
            header: 'optional',
            desc: 'Width of the tile in number of grid cells. Defaults to 1.',
          },
          {
            name: 'rows',
            type: 'number',
            header: 'optional',
            desc: 'Height of the tile in number of grid cells. Defaults to 1.',
          },
          {
            name: 'rootClass',
            type: 'string|ReactComponent',
            header: 'optional',
            desc: 'Either a string used as tag name for the tile root element, or a ReactComponent. Defaults to "div".' +
                  'This is useful when you have, for example, a custom implementation of a navigation link (that knows' +
                  'about your routes) and you want to use it as primary tile action. In case you pass a ReactComponent' +
                  ', please make sure that it passes all props, accepts styles overrides and render it\'s children.',

          },
          {
            name: 'children',
            type: 'node',
            header: 'required',
            desc: 'Theoretically you can pass any node as children, but the main use case is to pass an img, in which' +
                  'case GridTile takes care of making the image "cover" available space (similar to background-size: cover' +
                  ' or to object-fit:cover)',
          },
        ],
      },
    ];
  }

  render() {
    let tilesData = [
      {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
        featured: true,
      },
      {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
      },
      {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
      },
      {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
      },
      {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
      },
      {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
      },
      {
        img: 'images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
      },
      {
        img: 'images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
      },
    ];

    let gradientBg = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%);';

    return (
      <ComponentDoc
        name="GridList"
        code={this.code}
        desc={this.desc}
        componentInfo={this.componentInfo}>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {/* Basic grid list with mostly default options */}
          <GridList
            cellHeight={200}
            style={{width: 320, height: 640, overflowY: 'auto', marginBottom: 24}}
            >
            {
              tilesData.map(tile => <GridTile
                title={tile.title}
                subtitle={<span>by <b>{tile.author}</b></span>}
                actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                ><img src={tile.img} /></GridTile>)
            }
          </GridList>
          {/* Grid list with all possible overrides */}
          <GridList
            cols={2}
            cellHeight={200}
            padding={1}
            style={{width: 320, height: 640, overflowY: 'auto', marginBottom: 24}}
            >
            {
              tilesData.map(tile => <GridTile
                title={tile.title}
                actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                actionPosition="left"
                titlePosition="top"
                titleBackground={gradientBg}
                cols={tile.featured ? 2 : 1}
                rows={tile.featured ? 2 : 1}
                ><img src={tile.img} /></GridTile>)
            }
          </GridList>
        </div>
      </ComponentDoc>
    );
  }

}

module.exports = GridListPage;
