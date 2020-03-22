import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import { Icon } from './Icon';

import { addPropertyControls, ControlType } from 'framer';

interface Props {
  open: boolean;
  header: string;
  labels: string[];
  headerIcon?: string;
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const NestedList: React.SFC<Props> = (props: Props) => {
  const classes = useStyles();
  const { open: defaultOpen, labels, header, headerIcon } = props;
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <List>
      <ListItem button onClick={() => setOpen(!open)}>
        {headerIcon && (
          <MuiListItemIcon>
            <Icon icon={headerIcon} />
          </MuiListItemIcon>
        )}
        <ListItemText primary={header} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {labels.map((label, index) => (
            <ListItem button className={classes.nested} key={index}>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default NestedList;

NestedList.defaultProps = {
  header: 'Inbox',
  open: true,
  labels: ['Starred', 'Archived'],
  headerIcon: 'inbox',
};

addPropertyControls(NestedList, {
  labels: {
    type: ControlType.Array,
    propertyControl: {
      type: ControlType.String,
    },
  },
  header: {
    type: ControlType.String,
    title: 'Header',
  },
  headerIcon: {
    type: ControlType.String,
    title: 'Header icon',
  },
});
