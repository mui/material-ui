import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withMobileDialog as withMuiMobileDialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const A = withMobileDialog()((props) => {
  return <div>{props.width}</div>;
});

function MobileDialogComponent(props) {
  const { width } = props;
  const Component = components[width] || 'span';

  return (
    <Typography>
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}

export default withMuiMobileDialog()(MobileDialogComponent);
