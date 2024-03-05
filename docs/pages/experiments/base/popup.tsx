import * as React from 'react';
import { Unstable_Popup as BasePopup, PopupProps } from '@mui/base/Unstable_Popup';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { styled } from '@mui/system';

const StyledPopup = styled(BasePopup)`
  width: max-content;
`;

const PopupBody = styled('div')`
  padding: 16px;
  background-color: white;
  box-shadow:
    0 0 10px 0 rgb(0 0 0 / 0.05),
    0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 4px;
  font-family: var(--joy-fontFamily-body);
  font-size: var(--joy-fontSize-sm);
  z-index: 1;
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
`;
function PopupWithTrigger(props: PopupProps & { label: string }) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const { label, children, ...other } = props;

  return (
    <Section>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)} fullWidth>
        {open ? 'Close' : 'Open'} {label}
      </Button>
      <StyledPopup anchor={anchor} open={open} {...other}>
        {children ?? <PopupBody>This is a {label} popup</PopupBody>}
      </StyledPopup>
    </Section>
  );
}

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

export default function PopupPlayground() {
  return (
    <CssVarsProvider>
      <Container>
        <PopupWithTrigger label="default" />
        <PopupWithTrigger label="placed to the right" placement="right" />
        <PopupWithTrigger label="always mounted" keepMounted />
        <PopupWithTrigger label="non-portaled" disablePortal />
        <PopupWithTrigger label="with offset" offset={20} />
      </Container>
    </CssVarsProvider>
  );
}
