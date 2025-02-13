import * as React from 'react';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';

export default function DialogVerticalScroll() {
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );
  const [scroll, setScroll] = React.useState<boolean>(true);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('center');
          }}
        >
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('fullscreen');
          }}
        >
          Full screen
        </Button>
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>Vertical scroll example</DialogTitle>
          <FormControl
            orientation="horizontal"
            sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
          >
            <FormLabel>Container overflow</FormLabel>
            <Switch
              checked={scroll}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setScroll(event.target.checked)
              }
              sx={{ ml: 'auto' }}
            />
          </FormControl>
          <List
            sx={[
              {
                mx: 'calc(-1 * var(--ModalDialog-padding))',
                px: 'var(--ModalDialog-padding)',
              },
              scroll ? { overflow: 'scroll' } : { overflow: 'initial' },
            ]}
          >
            {[...Array(100)].map((item, index) => (
              <ListItem key={index}>I&apos;m in a scrollable area.</ListItem>
            ))}
          </List>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
