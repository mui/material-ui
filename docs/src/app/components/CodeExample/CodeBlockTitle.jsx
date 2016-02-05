import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import CodeIcon from 'material-ui/lib/svg-icons/action/code';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const CodeBlockTitle = (props) => (
  <Toolbar>
    <ToolbarGroup float="left">
      <ToolbarTitle text={props.title || 'Example'} />
    </ToolbarGroup>
    <ToolbarGroup float="right">
      <IconButton touch={true} tooltip={props.tooltip}>
        <CodeIcon />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
);

CodeBlockTitle.propTypes = {
  title: React.PropTypes.string,
  tooltip: React.PropTypes.string,
};

export default CodeBlockTitle;
