import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContent from 'docs/src/modules/components/AppContent';
import Head from 'docs/src/modules/components/Head';
import { styles as markdownStyles } from 'docs/src/modules/components/MarkdownElement';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master';
const PATH_REPLACE_REGEX = /\\/g;
const PATH_SEPARATOR = '/';
const DEMO_IGNORE = LANGUAGES_IN_PROGRESS.map(language => `-${language}.md`);

function normalizePath(path) {
  return path.replace(PATH_REPLACE_REGEX, PATH_SEPARATOR);
}

function ComponentImport(props) {
  const { api } = props;

  const source = normalizePath(api.filename)
    // determine the published package name
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.js$/, '');

  return (
    <React.Fragment>
      <h2>Import</h2>
      <pre className="language-js">
        <code className="language-js">
          <span className="token keyword">import</span> {api.name}{' '}
          <span className="token keyword">from</span>{' '}
          <span className="token string">
            '{source}/{api.name}'
          </span>
          <span className="token punctuation">;</span>
          <br />
          <span className="token comment">// or</span>
          <br />
          <span className="token keyword">import</span>{' '}
          <span className="token punctuation">{'{'}</span> {api.name}{' '}
          <span className="token punctuation">{'}'}</span>{' '}
          <span className="token keyword">from</span>{' '}
          <span className="token string">'{source}'</span>
          <span className="token punctuation">;</span>
        </code>
      </pre>
    </React.Fragment>
  );
}

ComponentImport.propTypes = { api: PropTypes.object.isRequired };

/**
 * TODO
 */
function PropDescription(props) {
  const { description, type } = props;

  if (description === null) {
    return "This prop doesn't have a description. Please file an issue";
  }

  return null;
}

PropDescription.propTypes = { description: PropTypes.string };

function Join({ children, separator }) {
  if (React.Children.count(children) <= 1) {
    return children;
  }
  const joinedChildren = [];
  React.Children.forEach(children, (child, index) => {
    if (index === children.length - 1) {
      joinedChildren.push(child);
    } else {
      const separatorElement = React.isValidElement(separator)
        ? React.cloneElement(separator, { key: `sep-${index}` })
        : separator;
      joinedChildren.push(child, separatorElement);
    }
  });

  return joinedChildren;
}

function isElementTypeAcceptingRefProp(type) {
  return type.raw === 'elementTypeAcceptingRef';
}

function isRefType(type) {
  return type.raw === 'refType';
}

function isElementAcceptingRefProp(type) {
  return /^elementAcceptingRef/.test(type.raw);
}

function PropType(props) {
  const { type } = props;

  switch (type.name) {
    case 'chained':
      return <PropType type={type.chained} />;
    case 'custom':
      if (isElementTypeAcceptingRefProp(type)) {
        return `element type`;
      }
      if (isElementAcceptingRefProp(type)) {
        return `element`;
      }
      if (isRefType(type)) {
        return `ref`;
      }
      // TOOD deprecated: currently unused. Probabler better solved with a console.warn
      return type.raw;
    case 'shape':
      return (
        <React.Fragment>
          {'{ '}
          <Join separator=", ">
            {Object.keys(type.value).map(key => {
              const subType = type.value[key];
              return (
                <React.Fragment key={key}>
                  {key}
                  {!subType.required && '?'}
                  {': '}
                  <PropType type={subType} />
                </React.Fragment>
              );
            })}
          </Join>
          {' }'}
        </React.Fragment>
      );
    case 'enum':
      return (
        <Join
          separator={
            <React.Fragment>
              <br />
              |&nbsp;
            </React.Fragment>
          }
        >
          {type.value.map(member => {
            return member.value;
          })}
        </Join>
      );
    case 'union':
      return (
        <Join
          separator={
            <React.Fragment>
              <br />
              |&nbsp;
            </React.Fragment>
          }
        >
          {type.value.map((member, index) => {
            return <PropType key={`member-${index}`} type={member} />;
          })}
        </Join>
      );
    case 'arrayOf':
      return (
        <React.Fragment>
          Array{'<'}
          <PropType type={type.value} />
          {'>'}
        </React.Fragment>
      );
    case 'instanceOf':
      if (type.value.startsWith('typeof')) {
        return /typeof (.*) ===/.exec(type.value)[1];
      }
      return type.value;
    default:
      return type.name || 'unknown';
  }
}

PropType.propTypes = { type: PropTypes.object.isRequired };

const useComponentPropStyles = makeStyles(theme => {
  // let the specificity games begin
  return {
    propDefault: {
      'table td&': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.divider}`,
      },
    },
    propName: {
      'table td&': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
    },
    propType: {
      'table td&': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.type === 'light' ? '#932981' : '#ffb6ec',
      },
    },
    required: {
      'table td&': {
        color: theme.palette.type === 'light' ? '#006500' : '#a5ffa5',
      },
    },
  };
});

function ComponentProp(props) {
  const { name, prop } = props;

  // injected by withStyles
  const required = name === 'classes' ? false : prop.required;

  const type = prop.type;
  const defaultValue = prop.defaultValue ? prop.defaultValue.value.replace(/\r*\n/g, '') : null;
  const description = prop.description;

  const classes = useComponentPropStyles();

  return (
    <tr>
      {/* TODO: entangle the custom required logic */}
      <td className={clsx(classes.propName, { [classes.required]: required })}>
        {name}
        {required && '&nbsp;*'}
      </td>
      <td className={classes.propType}>
        <PropType type={type} />
      </td>
      <td className={classes.propDefault}>{defaultValue}</td>
      <td>
        <PropDescription description={description} type={type} />
      </td>
    </tr>
  );
}

ComponentProp.propTypes = { name: PropTypes.string.isRequired, prop: PropTypes.object.isRequired };

function ComponentProps(props) {
  const { propsApi } = props;

  return (
    <React.Fragment>
      <h2>Props</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(propsApi).map(propName => {
            return <ComponentProp key={propName} name={propName} prop={propsApi[propName]} />;
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

ComponentProps.propTypes = { propsApi: PropTypes.object.isRequired };

const useMarkdownStyles = makeStyles(markdownStyles);

function ComponentApi(props) {
  const { api } = props;

  const classes = useMarkdownStyles();

  return (
    <div className={classes.root}>
      {/* TODO: component name + desc */}
      <Head description="API for AppBar component" title="AppBar API - Material-UI" />
      <h1>{api.name} API</h1>
      <p className="description">
        The API documentation of the {api.name} React component. Learn more about the props and the
        CSS customization points.
      </p>
      <ComponentImport api={api} />
      <p>{api.description}</p>
      <ComponentProps propsApi={api.props} />
    </div>
  );
}

ComponentApi.propTypes = {
  api: PropTypes.object.isRequired,
};

function Index() {
  return (
    <React.Fragment>
      <h1>Material-UI Component-API</h1>
      <p>Hello, Dave!</p>
    </React.Fragment>
  );
}

function ApiPage(props) {
  const { api } = props;

  // TODO suggestions if slug given but API not found
  const content = api === undefined ? <Index /> : <ComponentApi api={api} />;

  return (
    <AppFrame>
      <AppContent>{content}</AppContent>
    </AppFrame>
  );
}

function kebapToCamelCase(kebapCased) {
  return kebapCased.replace(/-([a-z])/g, g => {
    return g[1].toUpperCase();
  });
}

function uppercaseFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

ApiPage.getInitialProps = async ({ ctx }) => {
  const { query, req } = ctx;
  const componentId = uppercaseFirst(kebapToCamelCase(query.component));
  const relativeApiUrl = '/static/api.json';
  // https://github.com/zeit/next.js/issues/1213#issuecomment-280978022
  const apiUrl = process.browser
    ? relativeApiUrl
    : `${req.protocol}://${req.get('Host')}${relativeApiUrl}`;

  try {
    const apiResponse = await fetch(apiUrl);
    const api = await apiResponse.json();

    return { api: api.components[componentId] };
  } catch (error) {
    return {};
  }
};

ApiPage.propTypes = {
  api: PropTypes.object,
};

export default ApiPage;
