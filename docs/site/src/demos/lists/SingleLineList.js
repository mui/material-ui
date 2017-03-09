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
  demoContainer: {
    margin: '0 auto',
    maxWidth: 360,
  },
  demo: {
    background: theme.palette.background.paper,
    border: `solid ${theme.palette.text.divider}`,
    borderWidth: '1px 1px 0',
    marginBottom: 16,
    maxHeight: 160,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    '&:before': {
      backgroundImage: `linear-gradient(45deg, ${theme.palette.background.contentFrame} 25%, transparent 25%),
                        linear-gradient(-45deg, ${theme.palette.background.contentFrame} 25%, transparent 25%)`,
      backgroundSize: '20px 20px',
      backgroundPosition: '10px -10px',
      bottom: 0,
      content: '""',
      display: 'block',
      height: 10,
      position: 'absolute',
      width: '100%',
      zIndex: 99,
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
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
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
          </div>
        </Layout>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
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
          </div>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Icon with text</Text>
      <Layout container className={classes.container}>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
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
          </div>
        </Layout>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
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
          </div>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Avatar with text</Text>
      <Layout container className={classes.container}>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
            <div className={classes.demo} style={{ maxHeight: 184 }}>
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
          </div>
        </Layout>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
            <div className={classes.demo} style={{ maxHeight: 184 }}>
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
          </div>
        </Layout>
      </Layout>

      <Text type="title" className={classes.title}>Avatar with text and icon</Text>
      <Layout container className={classes.container}>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
            <div className={classes.demo} style={{ maxHeight: 184 }}>
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
          </div>
        </Layout>
        <Layout item xs={12} md={6}>
          <div className={classes.demoContainer}>
            <div className={classes.demo} style={{ maxHeight: 184 }}>
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
          </div>
        </Layout>
      </Layout>

    </div>
  );
}

SingleLineList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default SingleLineList;
