import React from 'react';
import PropTypes from 'prop-types';
import TreeViewContext from './TreeViewContext';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  }
});

function TreeView(props) {
  const {
    children,
    collapseIcon,
    expanded: expandedProp,
    expandIcon,
    defaultLeafIcon,
    defaultNodeIcon,
    onExpanded,
    ...other
  } = props;
  const [expanded, setExpanded] = React.useState([]);
  const classes = useStyles();

  if (expandedProp && expandedProp !== expanded) {
    setExpanded(expandedProp);
  }

  const isExpanded = value => {
    return expanded.indexOf(value) !== -1;
  };

  const toggle = value => {
    setExpanded(prevExpanded => {
      let newExpanded;

      if (prevExpanded.indexOf(value) !== -1) {
        newExpanded = prevExpanded.filter(id => id !== value);
      } else {
        newExpanded = [value, ...prevExpanded];
      }

      if (onExpanded) {
        onExpanded(newExpanded);
      }

      return newExpanded;
    });
  };

  return (
    <TreeViewContext.Provider
      value={{
        isExpanded,
        icons: { collapseIcon, defaultNodeIcon, defaultLeafIcon, expandIcon },
        toggle,
      }}
    >
      <ul role="tree" className={classes.root} {...other}>{children}</ul>
    </TreeViewContext.Provider>
  );
}

TreeView.propTypes = {
  children: PropTypes.node,
  collapseIcon: PropTypes.node,
  defaultLeafIcon: PropTypes.node,
  defaultNodeIcon: PropTypes.node,
  expanded: PropTypes.arrayOf(PropTypes.string),
  expandIcon: PropTypes.node,
  onExpanded: PropTypes.func,
};

export default TreeView;
