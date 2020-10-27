/* eslint-disable no-console */
import Benchmark from 'benchmark';
import { space, color, fontFamily, fontSize, compose as compose2 } from 'styled-system';
import { spacing, palette, typography, compose } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import { styleFunction } from '@material-ui/core/Box';

const suite = new Benchmark.Suite('system', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const materialSystem = compose(palette, spacing, typography);
const styledSystem = compose2(color, space, fontFamily, fontSize);

const materialSystemTheme = createMuiTheme();

const styledSystemTheme = createMuiTheme();
styledSystemTheme.breakpoints = ['40em', '52em', '64em'];
styledSystemTheme.colors = styledSystemTheme.palette;
styledSystemTheme.fontSizes = styledSystemTheme.typography;
styledSystemTheme.fonts = styledSystemTheme.typography;

suite
  // ---
  .add('colors @material-ui/system ', () => {
    palette({
      theme: {},
      bgcolor: ['red', 'blue'],
    });
  })
  .add('colors styled-system', () => {
    color({
      theme: {},
      bg: ['red', 'blue'],
    });
  })
  // ---
  .add('spaces @material-ui/system', () => {
    spacing({
      theme: {},
      p: [1, 2, 3],
    });
  })
  .add('spaces styled-system', () => {
    space({
      theme: {},
      p: [1, 2, 3],
    });
  })
  // ---
  .add('compose @material-ui/system', () => {
    materialSystem({
      theme: materialSystemTheme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  .add('compose styled-system', () => {
    styledSystem({
      theme: styledSystemTheme,
      color: 'primary.main',
      bg: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  // ---
  .add('@material-ui/core all-inclusive', () => {
    styleFunction({
      theme: materialSystemTheme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
