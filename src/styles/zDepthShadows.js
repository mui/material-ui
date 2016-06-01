import {fade} from '../utils/colorManipulator';

export default function zDepthShadows(color) {
  return [
    'none',
    [1, 6, 0.12, 1, 4, 0.12],
    [3, 10, 0.16, 3, 10, 0.23],
    [10, 30, 0.19, 6, 10, 0.23],
    [14, 45, 0.25, 10, 18, 0.22],
    [19, 60, 0.30, 15, 20, 0.22],
  ].map((d) => (
    `0 ${d[0]}px ${d[1]}px ${fade(color, d[2])},
         0 ${d[3]}px ${d[4]}px ${fade(color, d[5])}`
  ));
}
