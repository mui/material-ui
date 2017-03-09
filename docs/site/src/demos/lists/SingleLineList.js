// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FolderIcon from 'material-ui/svg-icons/folder';
import IconButton from 'material-ui/IconButton';
import Layout from 'material-ui/Layout';
import SvgIcon from 'material-ui/SvgIcon';
import Text from 'material-ui/Text';

const SqureIcon = (props) => (
  <SvgIcon {...props} viewBox="3 3 18 18">
    <path d="M3,3V21H21V3" />
  </SvgIcon>
);

const styleSheet = createStyleSheet('SingleLineList', (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  container: {
    width: '100%',
  },
  demo: {
    background: theme.palette.background.paper,
    marginBottom: 16,
    maxHeight: 160,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    '&:before': {
      bottom: 0,
      content: '""',
      display: 'block',
      height: 10,
      position: 'absolute',
      width: '100%',
      background: `linear-gradient(45deg,
                    transparent 33.333%,
                    ${theme.palette.background.contentFrame} 33.333%,
                    ${theme.palette.background.contentFrame} 66.667%,
                    transparent 66.667%
                  ),
                  linear-gradient(-45deg,
                    transparent 33.333%,
                    ${theme.palette.background.contentFrame} 33.333%,
                    ${theme.palette.background.contentFrame} 66.667%,
                    transparent 66.667%
                  )`,
      backgroundSize: '20px 40px',
      zIndex: 999,
    },
  },
  title: {
    margin: '32px 0 16px',
  },
}));

function SingleLineList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>

      <Text type="title" className={classes.title}>Text only</Text>
      <Layout container className={classes.container}>
        <Layout item sm={6}>
          <div className={classes.demo}>
            <List>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Single-line list</Text>
        </Layout>
        <Layout item sm={6}>
          <div className={classes.demo}>
            <List dense>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Dense single-line list</Text>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Icon with text</Text>
      <Layout container className={classes.container}>
        <Layout item sm={6}>
          <div className={classes.demo}>
            <List>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Single-line list with icon</Text>
        </Layout>
        <Layout item sm={6}>
          <div className={classes.demo}>
            <List dense>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SqureIcon /></ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Dense single-line list with icon</Text>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Avatar with text</Text>
      <Layout container className={classes.container}>
        <Layout item sm={6}>
          <div className={classes.demo} style={{maxHeight: 184}}>
            <List>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Single-line item with avatar</Text>
        </Layout>
        <Layout item sm={6}>
          <div className={classes.demo} style={{maxHeight: 184}}>
            <List dense>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Dense single-line list with avatar</Text>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Avatar with text and icon</Text>
      <Layout container className={classes.container}>
        <Layout item sm={6}>
          <div className={classes.demo} style={{maxHeight: 184}}>
            <List>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Single-line item with avatar and icon</Text>
        </Layout>
        <Layout item sm={6}>
          <div className={classes.demo} style={{maxHeight: 184}}>
            <List dense>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <Avatar><FolderIcon /></Avatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton>comment</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <Text type="body1" secondary>Dense single-line item with avatar and icon</Text>
        </Layout>
      </Layout>

    </div>
  );
}

SingleLineList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default SingleLineList;
