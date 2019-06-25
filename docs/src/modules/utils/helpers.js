const warning = require('warning');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { CODE_VARIANTS, LANGUAGES } = require('../constants');

function titleize(string) {
  warning(
    typeof string === 'string' && string.length > 0,
    'titleize(string) expects a non empty string argument.',
  );

  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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

  if (path.indexOf('/api/') !== -1) {
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
const packagesWithBundledTypes = ['@material-ui/core', '@material-ui/lab'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @see packagesWithBundledTypes in this module namespace
 *
 * @param {Record<string, string>} deps - list of dependency as `name => version`
 */
function addTypeDeps(deps) {
  const packagesWithDTPackage = Object.keys(deps).filter(
    name => packagesWithBundledTypes.indexOf(name) === -1,
  );

  packagesWithDTPackage.forEach(name => {
    let resolvedName = name;
    // scoped package?
    if (name.startsWith('@')) {
      // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
      resolvedName = name.slice(1).replace('/', '__');
    }

    deps[`@types/${resolvedName}`] = 'latest';
  });

  return deps;
}

/**
 * @param {string} raw - ES6 source with es module imports
 * @param {objects} options
 * @param {'JS' | 'TS'} options.codeLanguage
 * @param {'next' | 'latest'} options.reactVersion
 * @returns {Record<string, 'latest'>} map of packages with their required version
 */
function getDependencies(raw, options = {}) {
  const { codeLanguage = CODE_VARIANTS.JS, reactVersion = 'latest' } = options;
  const deps = {
    'react-dom': reactVersion,
    react: reactVersion,
  };
  const versions = {
    '@material-ui/core': 'latest',
    '@material-ui/icons': 'latest',
    '@material-ui/lab': 'latest',
    '@material-ui/styles': 'latest',
    '@material-ui/system': 'latest',
    '@material-ui/utils': 'latest',
    'date-fns': 'next',
    jss: 'next',
    'jss-plugin-template': 'next',
  };
  const re = /^import\s.*\sfrom\s+'([^']+)|import\s'([^']+)'/gm;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    let name;

    if (m[1]) {
      // full import
      // handle scope names
      name = m[1].charAt(0) === '@' ? m[1].split('/', 2).join('/') : m[1].split('/', 1)[0];
    } else {
      name = m[2];
    }

    if (!deps[name]) {
      deps[name] = versions[name] ? versions[name] : 'latest';
    }
  }

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
