import warning from 'warning';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function titleize(string) {
  warning(
    typeof string === 'string' && string.length > 0,
    'titleize(string) expects a non empty string argument.',
  );

  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function pageToTitle(page) {
  if (page.title) {
    return page.title;
  }

  const name = page.pathname.replace(/.*\//, '');

  if (page.pathname.indexOf('/api/') !== -1) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
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
export function getDependencies(raw, options = {}) {
  const { codeLanguage = 'JS', reactVersion = 'latest' } = options;
  const deps = {
    'react-dom': reactVersion,
    react: reactVersion,
  };
  const versions = {
    'date-fns': 'next',
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

  if (codeLanguage === 'TS') {
    addTypeDeps(deps);
  }

  return deps;
}

export function getCookie(name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1');
}
