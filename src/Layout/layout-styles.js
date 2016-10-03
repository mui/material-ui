// @flow weak
import { reduce, range, flow } from 'lodash/fp';

const baselineGrid = 8;

const flexOrder = () => {
  const names = flow(
    range,
    reduce((a, i) => ({
      ...a,
      [`flex-order${i}`]: { order: i },
    }), {})
  )(-20, 20);
  return {
    'flex-order': { order: 0 },
    ...names,
  };
};

const offset = () => {
  const offsets = flow(
    range,
    reduce((a, i) => ({
      ...a,
      [`flex-offset${i}`]: { marginLeft: `${i * 5}%` },
    }), {})
  )(0, 19);

  return {
    ...offsets,
    'flex-offset33': { marginLeft: 'calc(100% / 3)' },
    'flex-offset66': { marginLeft: 'calc(200% / 3)' },
  };
};

const flexProps = () => ({
  flex: { flex: 1, boxSizing: 'border-box' },
  'flex-grow': { flex: '1 1 100%', boxSizing: 'border-box' },
  'flex-initial': { flex: '0 1 auto', boxSizing: 'border-box' },
  'flex-none': { flex: '1 1 auto', boxSizing: 'border-box' },
  'flex-noshrink': { flex: '1 0 auto', boxSizing: 'border-box' },
  'flex-nogrow': { flex: '0 1 auto', boxSizing: 'border-box' },
});

const flexPropsFor = ({ row, col }) => {
  const flex = {
    '& > .flex-33': {
      flex: '1 1 calc(100% / 3)',
      maxWidth: row ? 'calc(100% / 3)' : '100%',
      maxHeight: col ? 'calc(100% / 3)' : '100%',
      boxSizing: 'border-box',
    },
    '& > .flex-66': {
      flex: '1 1 calc(200% / 3)',
      maxWidth: row ? 'calc(200% / 3)' : '100%',
      maxHeight: col ? 'calc(200% / 3)' : '100%',
      boxSizing: 'border-box',
    },
  };
  return flow(
    range,
    reduce((a, i) => {
      const val = i * 5;
      const k = `flex${val}`;
      return {
        ...a,
        [`& > .${k}`]: {
          flex: `1 1 ${val}%`,
          maxWidth: `${row ? val : 100}%`,
          maxHeight: `${col ? val : 100}%`,
          boxSizing: 'border-box',
        },
      };
    }, flex)
  )(0, 20);
};

const layout = () => {
  const layoutBox = {
    boxSizing: 'border-box',
    display: 'flex',
  };
  return {
    'layout-column': {
      ...layoutBox,
      flexDirection: 'column',
      ...flexPropsFor({ col: true }),
    },
    'layout-row': {
      ...layoutBox,
      flexDirection: 'row',
      ...flexPropsFor({ row: true }),
    },
  };
};

const layoutAlign = () => ({
  'justify-start': { justifyContent: 'flex-start' },
  'justify-center': { justifyContent: 'center' },
  'justify-end': { justifyContent: 'flex-end' },
  'justify-spaceAround': { justifyContent: 'space-around' },
  'justify-spaceBetween': { justifyContent: 'space-between' },

  'align-start': { alignItems: 'flex-start', alignContent: 'flex-start' },
  'align-center': { alignItems: 'center', alignContent: 'center', maxWidth: '100%' },
  'align-end': { alignItems: 'flex-end', alignContent: 'flex-end' },
  'align-stretch': { alignItems: 'stretch', alignContent: 'stretch' },
});

const layoutPaddingMargin = ({ breakpoints, gutterWidth = baselineGrid * 2 }) => ({
  'layout-padding': {
    '& > *': { padding: gutterWidth },
    [breakpoints.down('sm')]: {
      '& > *': { padding: gutterWidth / 4 },
    },
    [breakpoints.between('sm', 'md')]: {
      '& > *': { padding: gutterWidth / 4 },
    },
    [breakpoints.between('md', 'lg')]: {
      '& > *': { padding: gutterWidth / 2 },
    },
  },
  'layout-margin': {
    '& > *': { margin: gutterWidth },
    [breakpoints.down('sm')]: {
      '& > *': { margin: gutterWidth / 4 },
    },
    [breakpoints.between('sm', 'md')]: {
      '& > *': { margin: gutterWidth / 4 },
    },
    [breakpoints.between('md', 'lg')]: {
      '& > *': { margin: gutterWidth / 2 },
    },
  },
  'layout-scrollx': {
    overflowX: 'auto',
  },
  'layout-scrolly': {
    overflowy: 'auto',
  },
  'flex-wrap': { flexWrap: 'wrap' },
  'flex-nowrap': { flexNoWrap: 'nowrap' },
  'layout-fill': {
    margin: 0,
    width: '100%',
    minHeight: '100%',
    height: '100%',
  },
});

export default function layoutStyles(theme) {
  return {
    ...flexOrder(),
    ...offset(),
    ...flexProps(),
    ...layout(),
    ...layoutAlign(),
    ...layoutPaddingMargin(theme),
  };
}
