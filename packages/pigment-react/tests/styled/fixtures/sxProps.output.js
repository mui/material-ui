import { SliderRail } from './styled.input';
function App() {
  return <SliderRail sx={"s1ne1757"} />;
}
function App2(props) {
  return <SliderRail sx={props.variant === 'secondary' ? {
    className: "s1novky8",
    vars: {
      "s1novky8-0": [props.isRed ? 'red' : 'blue', false]
    }
  } : "s1dedx85"} />;
}
function App3(props) {
  return <SliderRail sx={props.variant === 'secondary' && {
    className: "s37rrrj",
    vars: {
      "s37rrrj-0": [props.isRed ? 'red' : 'blue', false]
    }
  }} />;
}
function App4(props) {
  return <SliderRail sx={"swjt3r4"} />;
}
