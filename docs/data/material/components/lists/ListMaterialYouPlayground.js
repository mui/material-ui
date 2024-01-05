import * as React from 'react';
import Divider from '@mui/material-next/Divider';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';
import {
  List,
  ListItem as NonInteractiveListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material-next';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';

export default function ListMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="List"
      getCodeBlock={(code, props) => {
        return `<List${props.disablePadding ? ` disablePadding` : ''}${
          props.dense ? ` dense` : ''
        }>
  <${props.interactive ? 'ListItemButton' : 'ListItem'}${
          props.alignItems !== 'center' ? ` alignItems="${props.alignItems}"` : ''
        }${props.disabled ? ` disabled` : ''}>
    ${
      props.leadingIcon
        ? `<ListItemIcon>
      <Icon />
    </ListItemIcon>`
        : ''
    }
  </${props.interactive ? 'ListItemButton' : 'ListItem'}>
</List>`;
      }}
      data={[
        {
          propName: 'disablePadding',
          knob: 'switch',
        },
        {
          propName: 'dense',
          knob: 'switch',
        },
        {
          propName: 'alignItems',
          knob: 'select',
          options: ['flex-start', 'center'],
          defaultValue: 'center',
        },
        {
          propName: 'disabled',
          knob: 'switch',
        },
        {
          propName: 'interactive',
          knob: 'switch',
          defaultValue: true,
        },
        {
          propName: 'leadingIcon',
          knob: 'switch',
          defaultValue: true,
        },
      ]}
      renderDemo={({
        alignItems,
        disableGutters,
        disabled,
        interactive,
        leadingIcon,
        ...listProps
      }) => {
        const listItemProps = {
          alignItems,
          disableGutters,
          disabled,
        };

        const ListItem = interactive ? ListItemButton : NonInteractiveListItem;

        return (
          <List
            sx={{
              width: 300,
            }}
            {...listProps}
          >
            <ListItem {...listItemProps}>
              {leadingIcon ? (
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
              ) : null}
              <ListItemText primary="Sent mail" />
            </ListItem>
            <Divider />
            <ListItem {...listItemProps}>
              {leadingIcon ? (
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
              ) : null}
              <ListItemText primary="Drafts" />
            </ListItem>
            <Divider />
            <ListItem {...listItemProps}>
              {leadingIcon ? (
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              ) : null}
              <ListItemText primary="Inbox" />
            </ListItem>
          </List>
        );
      }}
    />
  );
}
