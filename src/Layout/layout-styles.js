// @flow weak
import { reduce, range, flow, partialRight } from 'lodash/fp';

const baselineGrid = 8;

const generateProps = (propSetter, from, to) => flow(
  range,
  reduce((a, i) => ({
    ...a,
    ...propSetter(i),
  }), { }),
)(from, to);

const flexOrder = () => ({
  flexOrder: { order: 0 },
  ...generateProps((i) => ({ [`flexOrder${i}`]: { order: i } }), -20, 20),
});

const offset = () => ({
  ...generateProps((i) => ({ [`flexOffset${i}`]: { marginLeft: `${i * 5}%` } }), 0, 19),
  flexOffset33: { marginLeft: 'calc(100% / 3)' },
  flexOffset66: { marginLeft: 'calc(200% / 3)' },
});

const boxSizing = 'border-box';
const generateFlexProps = partialRight(generateProps, [0, 20]);
const flexProps = () => ({
  flex: { flex: 1, boxSizing },
  flexGrow: { flex: '1 1 100%', boxSizing },
  flexInitial: { flex: '0 1 auto', boxSizing },
  flexNone: { flex: '0 0 auto', boxSizing },
  flexNoshrink: { flex: '1 0 auto', boxSizing },
  flexNogrow: { flex: '0 1 auto', boxSizing },
  flex33: { flex: '1 1 calc(100%/3)', boxSizing },
  flex66: { flex: '1 1 calc(200%/3)', boxSizing },
  ...generateFlexProps((i) => {
    const val = i * 5;
    const k = `flex${val}`;
    return { [k]: { flex: `1 1 ${val}%`, boxSizing } };
  }),
});


const layoutBox = {
  boxSizing,
  display: 'flex',
};
const flexFor = (dir) => generateFlexProps((i) => {
  const val = i * 5;
  const k = `& $flex${val}`;
  const maxWidth = dir === 'row' ? `${val}%` : '100%';
  const maxHeight = dir === 'row' ? '100%' : `${val}%`;
  return { [k]: { maxWidth, maxHeight } };
});
const layout = () => ({
  layoutColumn: {
    ...layoutBox,
    flexDirection: 'column',
    '& $flex33': { maxWidth: '100%', maxHeight: 'calc(100% / 3)' },
    '& $flex66': { maxWidth: '100%', maxHeight: 'calc(200% / 3)' },
    ...flexFor('col'),
  },
  layoutRow: {
    ...layoutBox,
    flexDirection: 'row',
    '& $flex33': { maxHeight: '100%', maxWidth: 'calc(100% / 3)' },
    '& $flex66': { maxHeight: '100%', maxWidth: 'calc(200% / 3)' },
    ...flexFor('row'),
  },
});

const layoutAlign = () => ({
  justifyStart: { justifyContent: 'flex-start' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifySpaceAround: { justifyContent: 'space-around' },
  justifySpaceBetween: { justifyContent: 'space-between' },

  alignStart: { alignItems: 'flex-start', alignContent: 'flex-start' },
  alignCenter: { alignItems: 'center', alignContent: 'center', maxWidth: '100%' },
  alignEnd: { alignItems: 'flex-end', alignContent: 'flex-end' },
  alignStretch: { alignItems: 'stretch', alignContent: 'stretch' },
});

const layoutPaddingMargin = ({ breakpoints, gutterWidth = baselineGrid * 2 }) => ({
  layoutPadding: {
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
  layoutMargin: {
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
  layoutScrollX: {
    overflowX: 'auto',
  },
  layoutScrollY: {
    overflowy: 'auto',
  },
  flexWrap: { flexWrap: 'wrap' },
  flexNowrap: { flexNoWrap: 'nowrap' },
  layoutFill: {
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
