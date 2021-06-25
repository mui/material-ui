import * as React from 'react';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function DisabledTreeItems() {
  const [focusDisabledItems, setFocusDisabledItems] = React.useState(false);
  const handleToggle = (event) => {
    setFocusDisabledItems(event.target.checked);
  };

  return (
    <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      <Box sx={{ mb: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={focusDisabledItems}
              onChange={handleToggle}
              name="focusDisabledItems"
            />
          }
          label="Focus disabled items"
        />
      </Box>
      <TreeView
        aria-label="disabled items"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        disabledItemsFocusable={focusDisabledItems}
        multiSelect
      >
        <TreeItem nodeId="1" label="One">
          <TreeItem nodeId="2" label="Two" />
          <TreeItem nodeId="3" label="Three" />
          <TreeItem nodeId="4" label="Four" />
        </TreeItem>
        <TreeItem nodeId="5" label="Five" disabled>
          <TreeItem nodeId="6" label="Six" />
        </TreeItem>
        <TreeItem nodeId="7" label="Seven">
          <TreeItem nodeId="8" label="Eight" />
          <TreeItem nodeId="9" label="Nine">
            <TreeItem nodeId="10" label="Ten">
              <TreeItem nodeId="11" label="Eleven" />
              <TreeItem nodeId="12" label="Twelve" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Box>
  );
}
