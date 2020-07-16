import Button from '@material-ui/core/Button';
import GlobalCss from './GlobalCss';

export default function App() {
  return (
    <div>
      <GlobalCss />
      <Button variant="contained" className="m-4 py-5">
        Spacings
      </Button>
      <Button
        variant="contained"
        className="m-1 py-3 bg-warning-light hover-bg-warning-dark text-warning-contrastText"
      >
        Colors
      </Button>
      {Array.from(Array(24).keys()).map((val) => (
        <Button className={`m-2 p-1 elevation-${val}`} key={val}>
          Elevation {val}
        </Button>
      ))}

      {[
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption',
        'overline',
      ].map((val) => (
        <div className={`m-2 p-1 text-${val}`} key={val}>Text {val}</div>
      ))}

      <div className="d-inline mr-1">Inline</div>
      <div className="d-inline d-print-none">Not visible when printed</div>
      <div className="position-relative p-4 mb-12">
        <div className="position-absolute p-4 top-4 left-0 bg-grey-700 text-common-white">
          Positioned
        </div>
        <div className="position-absolute p-4 top-10 left-5 zIndex-tooltip bg-primary-light text-common-white">
          zIndex tooltip
        </div>
      </div>
    </div>
  );
}
