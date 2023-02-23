import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import CollapseIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import MuiTreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { lighten } from '@mui/material/styles';

function getType(value: any) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  if (/^(#|rgb|rgba|hsl|hsla)/.test(value)) {
    return 'color';
  }

  return typeof value;
}

/**
 * @param {unknown} value
 * @param {ReturnType<typeof getType>} type
 */
function getLabel(value: any, type: string) {
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

function getTokenType(type: string) {
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

function ObjectEntryLabel(props: { objectKey: string; objectValue: any }) {
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

function ObjectEntry(props: { nodeId: string; objectKey: string; objectValue: any }) {
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

function computeNodeIds(object: Record<string, any>, prefix: string) {
  if ((object !== null && typeof object === 'object') || typeof object === 'function') {
    const ids: Array<string> = [];
    Object.keys(object).forEach((key) => {
      ids.push(`${prefix}${key}`, ...computeNodeIds(object[key], `${prefix}${key}.`));
    });

    return ids;
  }
  return [];
}

export function useNodeIdsLazy(object: Record<string, any>) {
  const [allNodeIds, setAllNodeIds] = React.useState<Array<string>>([]);
  // technically we want to compute them lazily until we need them (expand all)
  // yielding is good enough. technically we want to schedule the computation
  // with low pri  and upgrade the priority later
  React.useEffect(() => {
    setAllNodeIds(computeNodeIds(object, ''));
  }, [object]);

  return allNodeIds;
}

const keyPrefix = '$ROOT';

export default function ThemeViewer({
  data,
  expandPaths = [],
  ...other
}: {
  data: Record<string, any>;
  expandPaths: Array<string> | null;
}) {
  const defaultExpanded = React.useMemo(
    () =>
      Array.isArray(expandPaths)
        ? expandPaths.map((expandPath) => `${keyPrefix}.${expandPath}`)
        : [],
    [expandPaths],
  );
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
