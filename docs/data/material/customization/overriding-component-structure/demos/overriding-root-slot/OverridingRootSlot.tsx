import Button from '@mui/material/Button';

export default function OverridingRootSlot() {
  // @focus-start @padding 1
  return (
    <Button component="a" href="https://mui.com/about/" target="_blank">
      About us
    </Button>
  );
  // @focus-end
}
