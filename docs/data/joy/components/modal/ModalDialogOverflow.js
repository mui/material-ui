import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function ModalDialogOverflow() {
  const [layout, setLayout] = React.useState(undefined);
  const [scroll, setScroll] = React.useState(true);
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
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}>
            <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2">
              Overflow content
            </Typography>
            <FormControl
              orientation="horizontal"
              sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
            >
              <FormLabel>Long content</FormLabel>
              <Switch
                checked={scroll}
                onChange={(event) => setScroll(event.target.checked)}
                sx={{ ml: 'auto' }}
              />
            </FormControl>
            {scroll && (
              <List>
                {[...Array(100)].map((item, index) => (
                  <ListItem key={index}>Item number ({index})</ListItem>
                ))}
              </List>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
