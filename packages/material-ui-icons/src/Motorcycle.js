import TwoWheeler from './TwoWheeler';

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    [
      'Material-UI: Motorcycle icon has been replaced with TwoWheeler.',
      "Please change your import to `import Motorcycle from '@material-ui/icons/TwoWheeler';`",
    ].join(' '),
  );
}

export default TwoWheeler;
