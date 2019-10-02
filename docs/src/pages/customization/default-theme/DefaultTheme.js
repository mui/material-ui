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
 * @type {React.Context<keyof object>}
 */
const ObjectContext = React.createContext('$ROOT');

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

const useTreeLabelStyles = makeStyles({
  objectKey: {
    color: 'rgb(227, 110, 236)',
  },
  objectValue: {},
  'type-function': {
    fontStyle: 'italic',
  },
  'type-string': {
    color: 'rgb(233, 63, 59)',
  },
  'type-boolean': {
    color: 'rgb(153, 128, 255);',
  },
  'type-number': {
    color: 'rgb(153, 128, 255);',
  },
});

function TreeLabel({ objectKey, objectValue }) {
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
TreeLabel.propTypes = { objectKey: PropTypes.any, objectValue: PropTypes.any };

function ObjectTreeItem(props) {
  const { objectKey, objectValue } = props;

  const keyPrefix = React.useContext(ObjectContext);

  if (
    (objectValue !== null && typeof objectValue === 'object') ||
    typeof objectValue === 'function'
  ) {
    const children = Object.keys(objectValue).map(key => {
      return <ObjectTreeItem key={key} objectKey={key} objectValue={objectValue[key]} />;
    });

    if (objectKey === undefined) {
      return (
        <TreeView defaultCollapseIcon={<ExpandIcon />} defaultExpandIcon={<CollapseIcon />}>
          {children}
        </TreeView>
      );
    }

    return (
      <TreeItem
        nodeId={`${keyPrefix}-${objectKey}`}
        label={<TreeLabel objectKey={objectKey} objectValue={objectValue} />}
      >
        <ObjectContext.Provider value={`${keyPrefix}-${objectKey}`}>
          {children}
        </ObjectContext.Provider>
      </TreeItem>
    );
  }

  return (
    <TreeItem
      nodeId={`${keyPrefix}-${objectKey}`}
      label={<TreeLabel objectKey={objectKey} objectValue={objectValue} />}
    />
  );
}
ObjectTreeItem.propTypes = { objectKey: PropTypes.any, objectValue: PropTypes.any };

function Inspector(props) {
  const { data } = props;

  return <ObjectTreeItem objectValue={data} />;
}

Inspector.propTypes = {
  data: PropTypes.any,
  /* expandLevel: PropTypes.number,
  expandPaths: PropTypes.arrayOf(PropTypes.string), */
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

function DefaultTheme(props) {
  const { classes } = props;
  const docsTheme = useTheme();
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

  const theme = createMuiTheme({
    palette: {
      type: docsTheme.palette.type,
    },
    direction: docsTheme.direction,
  });

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={checked}
            onChange={(event, value) => {
              setChecked(value);
            }}
          />
        }
        label={t('expandAll')}
      />
      <Inspector
        theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
        data={theme}
        expandPaths={expandPaths}
        expandLevel={checked ? 100 : 1}
        key={`${checked}-${theme.palette.type}`} // Remount
      />
    </div>
  );
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultTheme);
