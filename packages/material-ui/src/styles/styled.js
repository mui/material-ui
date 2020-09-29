import legacy_styled from './legacy_styled';

// @deprecated Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme
const styled = (Component) => {
  console.error(
    'Material-UI: This method will no longer be available in v5. Please use the legacy_styled utility instead>.',
  );
  return legacy_styled(Component);
};

export default styled;
