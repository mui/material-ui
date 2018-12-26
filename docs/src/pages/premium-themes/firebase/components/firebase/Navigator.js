import React from 'react';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import atoms from '../atoms';
import molecules from '../molecules';

const { IconButton, Icon } = atoms;
const { Drawer, List, ListItem, ListItemIcon, ListItemText } = molecules;

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Authentication', icon: <Icon>people</Icon>, active: true },
      { id: 'Database', icon: <Icon>dns_rounded</Icon> },
      { id: 'Storage', icon: <Icon>perm_media_outlined</Icon> },
      { id: 'Hosting', icon: <Icon>public</Icon> },
      { id: 'Functions', icon: <Icon>settings_ethernet</Icon> },
      { id: 'ML Kits', icon: <Icon>settings_input_component</Icon> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Crashlytics', icon: <Icon>settings_applications</Icon> },
      { id: 'Performance', icon: <Icon>dashboard</Icon> },
      { id: 'Test Lab', icon: <Icon>phone_link_setup</Icon> },
    ],
  },
];

const Navigator = () => {
  return (
    <Drawer variant={'permanent'} anchor={'left'}>
      <List>
        <ListItem header>
          <img
            alt={'logo'}
            className={'drawer__header-logo'}
            src={
              'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
            }
          />
          <img
            alt={'label'}
            className={'drawer__header-label'}
            src={
              'https://www.gstatic.com/mobilesdk/160323_mobilesdk/images/firebase_logotype_white_18dp.svg'
            }
          />
        </ListItem>
        <ListItem button headerActionable subcategory>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
          <ListItemSecondaryAction>
            <IconButton separated disableRipple>
              <Icon front frontFlipped>
                settings
              </Icon>
              <Icon caret>arrow_right</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {categories.map(({ id, children }) => (
          <div className={'drawer__category-container'} key={id}>
            <ListItem category>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem subcategory active={active} button dense key={childId}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{childId}</ListItemText>
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigator;
