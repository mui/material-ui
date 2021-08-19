import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import MuiTreeItem, { treeItemClasses } from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { styled, createTheme, lighten } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTranslate } from 'docs/src/modules/utils/i18n';

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

const Color = styled('span')(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'inline-block',
  marginBottom: -1,
  marginRight: theme.spacing(0.5),
  border: '1px solid',
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fsvg%3E")',
}));

function ObjectEntryLabel(props) {
  const { objectKey, objectValue } = props;
  const type = getType(objectValue);
  const label = getLabel(objectValue, type);
  const tokenType = getTokenType(type);

  return (
    <React.Fragment>
      {`${objectKey}: `}
      {type === 'color' ? (
        <Color style={{ borderColor: lighten(label, 0.7) }}>
          <Box
            component="span"
            sx={{ display: 'block', width: 11, height: 11 }}
            style={{ backgroundColor: label }}
          />
        </Color>
      ) : null}
      <span className={clsx('token', tokenType)}>{label}</span>
    </React.Fragment>
  );
}

ObjectEntryLabel.propTypes = {
  objectKey: PropTypes.any,
  objectValue: PropTypes.any,
};

const TreeItem = styled(MuiTreeItem)({
  [`&:focus > .${treeItemClasses.content}`]: {
    backgroundColor: lighten('#333', 0.08),
    outline: `2px dashed ${lighten('#333', 0.3)}`,
  },
  [`& .${treeItemClasses.content}`]: {
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
      sx={{ bgcolor: '#333', color: '#fff', borderRadius: 1, p: 1 }}
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

function computeNodeIds(object, prefix) {
  if (
    (object !== null && typeof object === 'object') ||
    typeof object === 'function'
  ) {
    const ids = [];
    Object.keys(object).forEach((key) => {
      ids.push(
        `${prefix}${key}`,
        ...computeNodeIds(object[key], `${prefix}${key}.`),
      );
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

function DefaultTheme() {
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const t = useTranslate();
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    let expandPath;
    decodeURI(document.location.search.slice(1))
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name === 'expand-path') {
          expandPath = value;
        } else if (name === 'expend-path' && !expandPath) {
          // 'expend-path' is for backwards compatibility of any external links with a prior typo.
          expandPath = value;
        }
      });

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
    return createTheme({
      palette: { mode: darkTheme ? 'dark' : 'light' },
    });
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
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        sx={{ pb: 1 }}
        control={
          <Switch
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
              setExpandPaths(event.target.checked ? allNodeIds : []);
            }}
          />
        }
        label={t('expandAll')}
      />
      <FormControlLabel
        sx={{ pb: 1 }}
        control={
          <Switch
            checked={darkTheme}
            onChange={(event) => {
              setDarkTheme(event.target.checked);
            }}
          />
        }
        label={t('useDarkTheme')}
      />
      <Inspector data={data} expandPaths={expandPaths} />
    </Box>
  );
}

export default DefaultTheme;
