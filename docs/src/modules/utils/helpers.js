const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { CODE_VARIANTS, LANGUAGES } = require('../constants');

function titleize(string) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof string !== 'string' || string.length <= 0) {
      console.error('titleize(string) expects a non empty string argument.');
    }
  }

  return string
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function pageToTitle(page) {
  if (page.title === false) {
    return null;
  }

  if (page.title) {
    return page.title;
  }

  const path = page.subheader || page.pathname;
  const name = path.replace(/.*\//, '');

  if (path.indexOf('/api') === 0) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}

function pageToTitleI18n(page, t) {
  const path = page.subheader || page.pathname;
  return t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}

/**
 * @var
 * set of packages that ship their own typings instead of using @types/ namespace
 * Array because Set([iterable]) is not supported in IE11
 */
const packagesWithBundledTypes = ['date-fns'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @see packagesWithBundledTypes in this module namespace
 * @param {Record<string, string>} deps - list of dependency as `name => version`
 */
function addTypeDeps(deps) {
  const packagesWithDTPackage = Object.keys(deps)
    .filter((name) => packagesWithBundledTypes.indexOf(name) === -1)
    // All the Material-UI packages come with bundled types
    .filter((name) => name.indexOf('@material-ui/') !== 0);

  packagesWithDTPackage.forEach((name) => {
    let resolvedName = name;
    // scoped package?
    if (name.startsWith('@')) {
      // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
      resolvedName = name.slice(1).replace('/', '__');
    }

    deps[`@types/${resolvedName}`] = 'latest';
  });
}

function includePeerDependencies(deps, versions) {
  Object.assign(deps, {
    'react-dom': versions['react-dom'],
    react: versions.react,
  });

  if (
    deps['@material-ui/lab'] ||
    deps['@material-ui/pickers'] ||
    deps['@material-ui/x'] ||
    deps['@material-ui/x-grid'] ||
    deps['@material-ui/x-pickers'] ||
    deps['@material-ui/x-tree-view'] ||
    deps['@material-ui/data-grid']
  ) {
    deps['@material-ui/core'] = versions['@material-ui/core'];
  }

  if (deps['@material-ui/x-grid-data-generator']) {
    deps['@material-ui/core'] = versions['@material-ui/core'];
    deps['@material-ui/icons'] = versions['@material-ui/icons'];
    deps['@material-ui/lab'] = versions['@material-ui/lab'];
  }

  if (deps['@material-ui/pickers']) {
    deps['date-fns'] = 'latest';
  }
}

/**
 * @param {string} packageName - The name of a package living inside this repository.
 * @param {string} [commitRef]
 * @return string - A valid version for a dependency entry in a package.json
 */
function getMuiPackageVersion(packageName, commitRef) {
  if (commitRef === undefined) {
    // TODO: change 'next' to 'latest' once next is merged into master.
    return 'next';
  }
  const shortSha = commitRef.slice(0, 8);
  return `https://pkg.csb.dev/mui-org/material-ui/commit/${shortSha}/@material-ui/${packageName}`;
}

/**
 * @param {string} raw - ES6 source with es module imports
 * @param {object} options
 * @param {'JS' | 'TS'} [options.codeLanguage] -
 * @param {string} [options.muiCommitRef] - If specified use `@material-ui/*` packages from a specific commit.
 * @param {'next' | 'latest'} [options.reactVersion]
 * @returns {Record<string, 'latest'>} map of packages with their required version
 */
function getDependencies(raw, options = {}) {
  const { codeLanguage = CODE_VARIANTS.JS, muiCommitRef, reactVersion = 'latest' } = options;

  const deps = {};
  const versions = {
    'react-dom': reactVersion,
    react: reactVersion,
    '@material-ui/core': getMuiPackageVersion('core', muiCommitRef),
    '@material-ui/icons': getMuiPackageVersion('icons', muiCommitRef),
    '@material-ui/lab': getMuiPackageVersion('lab', muiCommitRef),
    '@material-ui/styled-engine': getMuiPackageVersion('styled-engine', muiCommitRef),
    '@material-ui/styled-engine-sc': getMuiPackageVersion('styled-engine-sc', muiCommitRef),
    '@material-ui/styles': getMuiPackageVersion('styles', muiCommitRef),
    '@material-ui/system': getMuiPackageVersion('system', muiCommitRef),
    '@material-ui/utils': getMuiPackageVersion('utils', muiCommitRef),
    '@material-ui/pickers': 'next',
  };

  const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    let name;

    if (m[2]) {
      // full import
      // handle scope names
      name = m[2].charAt(0) === '@' ? m[2].split('/', 2).join('/') : m[2].split('/', 1)[0];
    } else {
      name = m[1];
    }

    if (!deps[name]) {
      deps[name] = versions[name] ? versions[name] : 'latest';
    }
  }

  includePeerDependencies(deps, versions);

  if (codeLanguage === CODE_VARIANTS.TS) {
    addTypeDeps(deps);
    deps.typescript = 'latest';
  }

  return deps;
}

function getCookie(name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1');
}

function pathnameToLanguage(pathname) {
  const userLanguage = pathname.substring(1, 3);

  if (LANGUAGES.indexOf(userLanguage) !== -1 && pathname.indexOf(`/${userLanguage}/`) === 0) {
    return {
      userLanguage,
      canonical: userLanguage === 'en' ? pathname : pathname.substring(3),
    };
  }

  return {
    userLanguage: 'en',
    canonical: pathname,
  };
}

module.exports = {
  titleize,
  pageToTitle,
  pageToTitleI18n,
  getDependencies,
  getCookie,
  pathnameToLanguage,
};
