import TwoWheelerSharp from './TwoWheelerSharp';

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    [
      'Material-UI: MotorcycleSharp icon has been replaced with TwoWheelerSharp.',
      "Please change your import to `import MotorcycleSharp from '@material-ui/icons/TwoWheelerSharp';`",
    ].join(' '),
  );
}

export default TwoWheelerSharp;
