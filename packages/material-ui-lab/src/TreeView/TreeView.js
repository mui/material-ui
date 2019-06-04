import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import warning from 'warning';
import TreeViewContext from './TreeViewContext';
import { makeStyles } from '@material-ui/core/styles';
import { setRef, useForkRef } from '@material-ui/core/utils';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
});

const TreeView = React.forwardRef(function TreeView(props, ref) {
  const {
    children: childrenProp,
    collapseIcon,
    expanded: expandedProp,
    expandIcon,
    defaultLeafIcon,
    defaultNodeIcon,
    onExpanded,
    ...other
  } = props;
  const [expanded, setExpanded] = React.useState([]);
  const [focused, setFocused] = React.useState(null);
  const treeRef = React.useRef(null);
  const handleRef = useForkRef(ref, treeRef);
  const classes = useStyles();

  const topLevelNodes = [];

  if (expandedProp && expandedProp !== expanded) {
    setExpanded(expandedProp);
  }

  const isExpanded = value => {
    return expanded.indexOf(value) !== -1;
  };

  const isFocused = value => focused === value;

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

  React.useEffect(() => {
    if (treeRef.current.firstChild) {
      treeRef.current.firstChild.tabIndex = 0;
    }
  }, []);

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null;
    }
    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the TreeView component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );

    return React.cloneElement(child, {
      ref: instance => {
        // #StrictMode ready
        topLevelNodes.push(ReactDOM.findDOMNode(instance));
        setRef(child.ref, instance);
      },
    });
  });

  const focusNextTopLevelNode = instance => {
    const currentNodeIndex = topLevelNodes.indexOf(instance);
    if (currentNodeIndex !== -1 && currentNodeIndex !== topLevelNodes.length - 1) {
      window.document.activeElement.tabIndex = -1;
      topLevelNodes[currentNodeIndex + 1].tabIndex = 0;
      topLevelNodes[currentNodeIndex + 1].focus();
    }
  };

  const focusPreviousTopLevelNode = instance => {
    const currentNodeIndex = topLevelNodes.indexOf(instance);
    if (currentNodeIndex !== -1 && currentNodeIndex !== 0) {
      window.document.activeElement.tabIndex = -1;
      topLevelNodes[currentNodeIndex - 1].tabIndex = 0;
      topLevelNodes[currentNodeIndex - 1].focus();
    }
  };

  const blur = id => {
    if (id === focused) {
      setFocused(null);
    }
  };

  return (
    <TreeViewContext.Provider
      value={{
        isExpanded,
        icons: { collapseIcon, defaultNodeIcon, defaultLeafIcon, expandIcon },
        toggle,
        setFocused,
        blur,
        isFocused,
        focusNextTopLevelNode,
        focusPreviousTopLevelNode,
      }}
    >
      <ul role="tree" className={classes.root} ref={handleRef} {...other}>
        {children}
      </ul>
    </TreeViewContext.Provider>
  );
});

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
