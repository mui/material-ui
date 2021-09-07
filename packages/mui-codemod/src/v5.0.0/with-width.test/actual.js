import withWidth from '@material-ui/core/withWidth';
import { withWidth as withMuiWidth } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const A = withWidth()((props) => {
  return <div>{props.width}</div>;
});

function WithWidthComponent(props) {
  const { width } = props;
  const Component = components[width] || 'span';

  return (
    <Typography>
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}

export default withMuiWidth()(WithWidth);
