import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import url from 'url';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { makeStyles, withStyles, createMuiTheme, useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/**
 * @param {unknown} value
 */
function useType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (value === null) {
    return 'null';
  }

  return typeof value;
}

/**
 *
 * @param {unknown} value
 * @param {ReturnType<typeof useType>} type
 */
function useLabel(value, type) {
  switch (type) {
    case 'array':
      return `Array(${value.length})`;
    case 'null':
      return 'null';
    case 'undefined':
      return 'undefined';
    case 'function':
      return `f ${value.name}()`;
    case 'object':
      return 'Object';
    case 'string':
      return `"${value}"`;
    case 'symbol':
      return `Symbol(${String(value)})`;
    case 'bigint':
    case 'boolean':
    case 'number':
    default:
      return String(value);
  }
}

const useTreeLabelStyles = makeStyles(theme => {
  const darkMode = theme.palette.type === 'dark';

  return {
    objectKey: {
      color: darkMode ? 'rgb(227, 110, 236)' : 'rgb(136, 19, 145)',
    },
    objectValue: {},
    'type-function': {
      fontStyle: 'italic',
    },
    'type-string': {
      color: darkMode ? 'rgb(233, 63, 59)' : 'rgb(196, 26, 22)',
    },
    'type-boolean': {
      color: darkMode ? 'rgb(153, 128, 255)' : 'rgb(28, 0, 207)',
    },
    'type-number': {
      color: darkMode ? 'rgb(153, 128, 255)' : 'rgb(136, 19, 145)',
    },
  };
});

function ObjectEntryLabel({ objectKey, objectValue }) {
  const type = useType(objectValue);
  const label = useLabel(objectValue, type);
  const classes = useTreeLabelStyles();

  return (
    <React.Fragment>
      <span className={classes.objectKey}>{objectKey}: </span>
      <span className={clsx(classes.objectValue, classes[`type-${type}`])}>{label}</span>
    </React.Fragment>
  );
}
ObjectEntryLabel.propTypes = { objectKey: PropTypes.any, objectValue: PropTypes.any };

function ObjectEntry(props) {
  const { nodeId, objectKey, objectValue } = props;

  const keyPrefix = nodeId;

  let children = null;
  if (
    (objectValue !== null && typeof objectValue === 'object') ||
    typeof objectValue === 'function'
  ) {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map(key => {
            return (
              <ObjectEntry
                key={key}
                nodeId={`${keyPrefix}.${key}`}
                objectKey={key}
                objectValue={objectValue[key]}
              />
            );
          });
  }

  return (
    <TreeItem
      nodeId={nodeId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}
ObjectEntry.propTypes = {
  nodeId: PropTypes.string.isRequired,
  objectKey: PropTypes.any.isRequired,
  objectValue: PropTypes.any,
};

function Inspector(props) {
  const { data, expandPaths } = props;

  const keyPrefix = '$ROOT';
  const defaultExpanded = React.useMemo(() => {
    return Array.isArray(expandPaths)
      ? expandPaths.map(expandPath => `${keyPrefix}.${expandPath}`)
      : [];
  }, [keyPrefix, expandPaths]);
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(''), [defaultExpanded]);

  return (
    <TreeView
      key={key}
      defaultCollapseIcon={<ExpandIcon />}
      defaultExpanded={defaultExpanded}
      defaultExpandIcon={<CollapseIcon />}
    >
      {Object.keys(data).map(objectKey => {
        return (
          <ObjectEntry
            key={objectKey}
            nodeId={`${keyPrefix}.${objectKey}`}
            objectKey={objectKey}
            objectValue={data[objectKey]}
          />
        );
      })}
    </TreeView>
  );
}

Inspector.propTypes = {
  data: PropTypes.any,
  expandPaths: PropTypes.arrayOf(PropTypes.string),
};

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0,
    // Match <Inspector /> default theme.
    backgroundColor: theme.palette.type === 'light' ? theme.palette.common.white : '#242424',
    minHeight: theme.spacing(40),
    width: '100%',
  },
  switch: {
    paddingBottom: theme.spacing(1),
  },
});

function computeNodeIds(object, prefix) {
  if ((object !== null && typeof object === 'object') || typeof object === 'function') {
    const ids = [];
    Object.keys(object).forEach(key => {
      ids.push(`${prefix}${key}`, ...computeNodeIds(object[key], `${prefix}${key}.`));
    });

    return ids;
  }
  return [];
}

function useNodeIdsLazy(object) {
  const [allNodeIds, setAllNodeIds] = React.useState([]);
  // technically we want to compute them lazily until we need them (expand all)
  // yielding is good enough. technically we want to schedule the computation
  // with low pri  and upgrade the priority later
  React.useEffect(() => {
    setAllNodeIds(computeNodeIds(object, ''));
  }, [object]);

  return allNodeIds;
}

function DefaultTheme(props) {
  const { classes } = props;
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const t = useSelector(state => state.options.t);

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath.split('.').reduce((acc, path) => {
        const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
        acc.push(last + path);
        return acc;
      }, []),
    );
  }, []);

  const theme = useTheme();
  const data = React.useMemo(createMuiTheme, []);

  const allNodeIds = useNodeIdsLazy(data);
  React.useDebugValue(allNodeIds);
  React.useEffect(() => {
    if (checked) {
      // in case during the event handler allNodeIds wasn't computed yet
      setExpandPaths(allNodeIds);
    }
  }, [checked, allNodeIds]);

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={checked}
            onChange={(event, newChecked) => {
              setChecked(newChecked);
              if (newChecked) {
                setExpandPaths(allNodeIds);
              } else {
                setExpandPaths([]);
              }
            }}
          />
        }
        label={t('expandAll')}
      />
      <Inspector
        theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
        data={data}
        expandPaths={expandPaths}
        expandLevel={checked ? 100 : 1}
      />
    </div>
  );
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultTheme);
