// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui/svg-icons/folder';
import IconButton from 'material-ui/IconButton';
import { LabelCheckbox } from 'material-ui/Checkbox';
import Layout from 'material-ui/Layout';
import Text from 'material-ui/Text';

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
    zIndex: 1,
    '&:before': {
      backgroundImage: `linear-gradient(
          45deg,${theme.palette.background.contentFrame} 25%, transparent 25%
        ),
        linear-gradient(
          -45deg,${theme.palette.background.contentFrame} 25%, transparent 25%
        )`,
      backgroundSize: '20px 20px',
      backgroundPosition: '10px -10px',
      bottom: 0,
      content: '""',
      display: 'block',
      height: 10,
      position: 'absolute',
      width: '100%',
      zIndex: theme.zIndex.tooltip,
    },
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
}));

class SingleLineList extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    dense: false,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { dense } = this.state;

    return (
      <div className={classes.root}>
        <LabelCheckbox
          checked={dense}
          onChange={(event, checked) => this.setState({ dense: checked })}
          label="Enable dense preview"
          value="dense"
        />
        <Layout container className={classes.container}>
          <Layout item xs={12} md={6}>
            <div className={classes.demoContainer}>
              <Text type="title" className={classes.title}>Text only</Text>
              <div className={classes.demo}>
                <List dense={dense}>
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
              <Text type="body1" secondary>Single-line list</Text>
            </div>
          </Layout>
          <Layout item xs={12} md={6}>
            <div className={classes.demoContainer}>
              <Text type="title" className={classes.title}>Icon with text</Text>
              <div className={classes.demo}>
                <List dense={dense}>
                  <ListItem button>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                </List>
              </div>
              <Text type="body1" secondary>Single-line list with icon</Text>
            </div>
          </Layout>
        </Layout>
        <Layout container className={classes.container}>
          <Layout item xs={12} md={6}>
            <div className={classes.demoContainer}>
              <Text type="title" className={classes.title}>Avatar with text</Text>
              <div className={classes.demo} style={{ maxHeight: 184 }}>
                <List dense={dense}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                </List>
              </div>
              <Text type="body1" secondary>Single-line item with avatar</Text>
            </div>
          </Layout>
          <Layout item xs={12} md={6}>
            <div className={classes.demoContainer}>
              <Text type="title" className={classes.title}>Avatar with text and icon</Text>
              <div className={classes.demo} style={{ maxHeight: 184 }}>
                <List dense={dense}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                    <ListItemSecondaryAction>
                      <IconButton>comment</IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                    <ListItemSecondaryAction>
                      <IconButton>comment</IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                    <ListItemSecondaryAction>
                      <IconButton>comment</IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar><FolderIcon /></Avatar>
                    </ListItemAvatar>
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
        </Layout>
      </div>
    );
  }
}

export default SingleLineList;
