import Button from '@material-ui/core/Button';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withMuiWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

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
