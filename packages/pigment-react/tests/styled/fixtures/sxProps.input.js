import { SliderRail } from './styled.input';

function App() {
  return <SliderRail sx={{ color: 'red' }} />;
}

function App2(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary'
          ? { color: props.isRed ? 'red' : 'blue' }
          : { backgroundColor: 'blue', color: 'white' }
      }
    />
  );
}

function App3(props) {
  return (
    <SliderRail sx={props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' }} />
  );
}

const textAlign = 'center';
const styles4 = {
  mb: 1,
  textAlign,
};

function App4(props) {
  return <SliderRail sx={styles4} />;
}
