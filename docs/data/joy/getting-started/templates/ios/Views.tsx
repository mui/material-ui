/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Fingerprint from '@mui/icons-material/Fingerprint';
import ViewOverlay from './ViewOverlay';

export default function Views() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 393px)',
        gap: 2,
        alignItems: 'flex-start',
        '& > div': {
          minHeight: 500,
        },
      }}
    >
      <ViewOverlay name="Action Sheets">
        <Box
          sx={{
            px: 1,
            pt: '11px',
            pb: '34px',
            display: 'flex',
            flexDirection: 'column',
            mt: 'auto',
            gap: 1,
          }}
        >
          <List
            sx={{
              material: 'regular',
              '--List-radius': '14px',
              '--List-item-minHeight': '56px',
              '& [role="button"]': {
                justifyContent: 'center',
                typography: 'title3',
              },
            }}
          >
            <ListItem sx={{ pt: '13px', pb: '15px' }}>
              <ListItemContent sx={{ textAlign: 'center' }}>
                <Typography
                  level="caption1"
                  fontWeight="lg"
                  textColor="label.secondary"
                >
                  A Short Title is Best
                </Typography>
                <Typography level="caption1" textColor="label.secondary">
                  A message should be a short, complete sentence
                </Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="context" />
            <ListItem>
              <ListItemButton color="primary">Action</ListItemButton>
            </ListItem>
            <ListDivider inset="context" />
            <ListItem>
              <ListItemButton color="danger">Action</ListItemButton>
            </ListItem>
            <ListDivider inset="context" />
            <ListItem>
              <ListItemButton disabled>Action</ListItemButton>
            </ListItem>
          </List>
          <Button
            variant="soft"
            color="primary"
            sx={{
              bgcolor: 'groupedBackground.secondaryElevated',
              fontWeight: 'lg',
              borderRadius: '14px',
              minHeight: 56,
              typography: 'title3',
            }}
          >
            Cancel
          </Button>
        </Box>
      </ViewOverlay>

      <ViewOverlay name="Alerts">
        <ModalDialog>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="lg">A Short Title is Best</Typography>
            <Typography level="footnote" sx={{ mt: '2px' }}>
              A message should be a short, complete sentence
            </Typography>
          </Box>
          <Divider />
          <List row>
            <ListItemButton color="primary" sx={{ fontWeight: 'lg' }}>
              Label
            </ListItemButton>
          </List>
        </ModalDialog>
      </ViewOverlay>

      <ViewOverlay name=" ">
        <ModalDialog>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="lg">A Short Title is Best</Typography>
            <Typography level="footnote" sx={{ mt: '2px' }}>
              A message should be a short, complete sentence
            </Typography>
          </Box>
          <Divider />
          <List row>
            <ListItemButton color="primary">Cancel</ListItemButton>
            <ListDivider />
            <ListItemButton color="primary" sx={{ fontWeight: 'lg' }}>
              Action
            </ListItemButton>
          </List>
        </ModalDialog>
      </ViewOverlay>
      <ViewOverlay name=" ">
        <ModalDialog>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="lg">A Short Title is Best</Typography>
            <Typography level="footnote" sx={{ mt: '2px' }}>
              A message should be a short, complete sentence
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItemButton color="primary" sx={{ fontWeight: 'lg' }}>
              Label
            </ListItemButton>
            <ListDivider inset="context" />
            <ListItemButton color="primary">Label</ListItemButton>
            <ListDivider inset="context" />
            <ListItemButton color="primary">Label</ListItemButton>
          </List>
        </ModalDialog>
      </ViewOverlay>

      <ViewOverlay name=" ">
        <ModalDialog>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="lg">A Short Title is Best</Typography>
            <Typography level="footnote" sx={{ mt: '2px' }}>
              A message should be a short, complete sentence
            </Typography>
            <Input
              variant="outlined"
              size="sm"
              placeholder="Placeholder"
              sx={{ mt: '12px' }}
            />
          </Box>
          <Divider />
          <List row>
            <ListItemButton color="primary">Label</ListItemButton>
            <ListDivider />
            <ListItemButton color="primary" sx={{ fontWeight: 'lg' }}>
              Label
            </ListItemButton>
          </List>
        </ModalDialog>
      </ViewOverlay>

      <ViewOverlay name="Touch ID">
        <ModalDialog>
          <Box sx={{ p: 2 }}>
            <Fingerprint fontSize="xl3" sx={{ color: 'system.red' }} />
            <Typography fontWeight="lg">Touch ID</Typography>
            <Typography level="footnote" sx={{ mt: '2px' }}>
              john.appleseed@icloud.com
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItemButton color="primary" sx={{ fontWeight: 'lg' }}>
              Cancel
            </ListItemButton>
          </List>
        </ModalDialog>
      </ViewOverlay>
    </Box>
  );
}
