import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import url from 'url';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { makeStyles, withStyles, createMuiTheme, lighten } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/**
 * @param {unknown} value
 */
function getType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (/^(#|rgb|rgba|hsl|hsla)/.test(value)) {
    return 'color';
  }

  if (value === null) {
    return 'null';
  }

  return typeof value;
}

/**
 *
 * @param {unknown} value
 * @param {ReturnType<typeof getType>} type
 */
function getLabel(value, type) {
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

function getTokenType(type) {
  switch (type) {
    case 'color':
      return 'string';
    case 'object':
    case 'array':
      return 'comment';
    default:
      return type;
  }
}

const useObjectEntryLabelStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: '#fff',
    display: 'inline-block',
    marginBottom: -1,
    marginRight: theme.spacing(0.5),
    border: '1px solid',
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fsvg%3E")',
  },
  colorInner: {
    display: 'block',
    width: 11,
    height: 11,
  },
}));

function ObjectEntryLabel(props) {
  const { objectKey, objectValue } = props;
  const type = getType(objectValue);
  const label = getLabel(objectValue, type);
  const tokenType = getTokenType(type);
  const classes = useObjectEntryLabelStyles();

  return (
    <React.Fragment>
      {`${objectKey}: `}
      {type === 'color' ? (
        <span className={classes.color} style={{ borderColor: lighten(label, 0.7) }}>
          <span className={classes.colorInner} style={{ backgroundColor: label }} />
        </span>
      ) : null}
      <span className={clsx('token', tokenType)}>{label}</span>
    </React.Fragment>
  );
}

ObjectEntryLabel.propTypes = {
  objectKey: PropTypes.any,
  objectValue: PropTypes.any,
};

const useObjectEntryStyles = makeStyles({
  treeItem: {
    '&:focus > $treeItemContent': {
      backgroundColor: lighten('#333', 0.08),
      outline: `2px dashed ${lighten('#333', 0.3)}`,
    },
  },
  treeItemContent: {
    '&:hover': {
      backgroundColor: lighten('#333', 0.08),
    },
  },
});

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
        : Object.keys(objectValue).map((key) => {
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

  const classes = useObjectEntryStyles();

  return (
    <TreeItem
      classes={{ root: classes.treeItem, content: classes.treeItemContent }}
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
  const { data, expandPaths, ...other } = props;

  const keyPrefix = '$ROOT';
  const defaultExpanded = React.useMemo(() => {
    return Array.isArray(expandPaths)
      ? expandPaths.map((expandPath) => `${keyPrefix}.${expandPath}`)
      : [];
  }, [keyPrefix, expandPaths]);
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(''), [defaultExpanded]);

  return (
    <TreeView
      key={key}
      defaultCollapseIcon={<ExpandIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={defaultExpanded}
      defaultExpandIcon={<CollapseIcon />}
      {...other}
    >
      {Object.keys(data).map((objectKey) => {
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

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  inspector: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
  switch: {
    paddingBottom: theme.spacing(1),
  },
});

function computeNodeIds(object, prefix) {
  if ((object !== null && typeof object === 'object') || typeof object === 'function') {
    const ids = [];
    Object.keys(object).forEach((key) => {
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
  const t = useSelector((state) => state.options.t);
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    // 'expend-path' is for backwards compatibility of any external links with a prior typo.
    const expandPath = URL.query['expand-path'] || URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath
        .replace('$.', '')
        .split('.')
        .reduce((acc, path) => {
          const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
          acc.push(last + path);
          return acc;
        }, []),
    );
  }, []);

  const data = React.useMemo(() => {
    return createMuiTheme({ palette: { type: darkTheme ? 'dark' : 'light' } });
  }, [darkTheme]);

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
              setExpandPaths(newChecked ? allNodeIds : []);
            }}
          />
        }
        label={t('expandAll')}
      />
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={darkTheme}
            onChange={(event, newValue) => {
              setDarkTheme(newValue);
            }}
          />
        }
        label={t('useDarkTheme')}
      />
      <Inspector className={classes.inspector} data={data} expandPaths={expandPaths} />
    </div>
  );
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultTheme);
