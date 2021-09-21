import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { CODE_VARIANTS, LANGUAGES } from '../constants';

/**
 * Mapping from the date adapter sub-packages to the npm packages they require.
 * @example `@mui/lab/AdapterDateFns` has a peer dependency on `date-fns`.
 */
const dateAdapterPackageMapping: Record<string, string> = {
  AdapterDateFns: 'date-fns',
  AdapterDayjs: 'dayjs',
  AdapterLuxon: 'luxon',
  AdapterMoment: 'moment',
};

function titleize(hyphenedString: string): string {
  return hyphenedString
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface Page {
  pathname: string;
  subheader?: string;
  title?: string | false;
}

export function pageToTitle(page: Page): string | null {
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

export type Translate = (id: string, options?: Partial<{ ignoreWarning: boolean }>) => string;

export function pageToTitleI18n(page: Page, t: Translate): string | null {
  const path = page.subheader || page.pathname;
  return t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}

/**
 * @var
 * set of packages that ship their own typings instead of using @types/ namespace
 * Array because Set([iterable]) is not supported in IE11
 */
const packagesWithBundledTypes = ['date-fns', '@emotion/react', '@emotion/styled'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @see packagesWithBundledTypes in this module namespace
 * @param deps - list of dependency as `name => version`
 */
function addTypeDeps(deps: Record<string, string>): void {
  const packagesWithDTPackage = Object.keys(deps)
    .filter((name) => packagesWithBundledTypes.indexOf(name) === -1)
    // All the MUI packages come with bundled types
    .filter((name) => name.indexOf('@mui/') !== 0);

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

function includePeerDependencies(
  deps: Record<string, string>,
  versions: Record<string, string>,
): Record<string, string> {
  let newDeps: Record<string, string> = {
    ...deps,
    'react-dom': versions['react-dom'],
    react: versions.react,
    '@emotion/react': versions['@emotion/react'],
    '@emotion/styled': versions['@emotion/styled'],
  };

  if (newDeps['@mui/lab']) {
    newDeps['@mui/material'] = versions['@mui/material'];
  }

  if (newDeps['@material-ui/data-grid']) {
    newDeps['@mui/material'] = versions['@mui/material'];
    newDeps['@mui/styles'] = versions['@mui/styles'];
  }

  // TODO: Where is this coming from and why does it need to be injected this way.
  if ((window as any).muiDocConfig) {
    newDeps = (window as any).muiDocConfig.csbIncludePeerDependencies(newDeps, { versions });
  }

  return newDeps;
}

/**
 * @param packageName - The name of a package living inside this repository.
 * @param commitRef
 * @return string - A valid version for a dependency entry in a package.json
 */
function getMuiPackageVersion(packageName: string, commitRef?: string): string {
  if (
    commitRef === undefined ||
    process.env.SOURCE_CODE_REPO !== 'https://github.com/mui-org/material-ui'
  ) {
    // #default-branch-switch
    return 'latest';
  }
  const shortSha = commitRef.slice(0, 8);
  return `https://pkg.csb.dev/mui-org/material-ui/commit/${shortSha}/@mui/${packageName}`;
}

/**
 * @param raw - ES6 source with es module imports
 * @param options
 * @returns map of packages with their required version
 */
export function getDependencies(
  raw: string,
  options: {
    codeLanguage?: 'JS' | 'TS';
    /**
     * If specified use `@mui/*` packages from a specific commit.
     */
    muiCommitRef?: string;
  } = {},
) {
  const { codeLanguage = CODE_VARIANTS.JS, muiCommitRef } = options;

  let deps: Record<string, string> = {};
  let versions: Record<string, string> = {
    react: 'latest',
    'react-dom': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
    '@mui/material': getMuiPackageVersion('material', muiCommitRef),
    '@mui/icons-material': getMuiPackageVersion('icons-material', muiCommitRef),
    '@mui/lab': getMuiPackageVersion('lab', muiCommitRef),
    '@mui/styled-engine': getMuiPackageVersion('styled-engine', muiCommitRef),
    '@mui/styles': getMuiPackageVersion('styles', muiCommitRef),
    '@mui/system': getMuiPackageVersion('system', muiCommitRef),
    '@mui/private-theming': getMuiPackageVersion('theming', muiCommitRef),
    '@mui/core': getMuiPackageVersion('core', muiCommitRef),
    '@mui/utils': getMuiPackageVersion('utils', muiCommitRef),
    '@mui/material-next': getMuiPackageVersion('material-next', muiCommitRef),
  };

  // TODO: Where is this coming from and why does it need to be injected this way.
  if ((window as any).muiDocConfig) {
    versions = (window as any).muiDocConfig.csbGetVersions(versions, { muiCommitRef });
  }

  const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
  let m: RegExpExecArray | null = null;
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

    // e.g date-fns
    const dateAdapterMatch = m[2].match(/^@mui\/lab\/(Adapter.*)/);
    if (dateAdapterMatch !== null) {
      const packageName = dateAdapterPackageMapping[dateAdapterMatch[1]];
      if (packageName === undefined) {
        throw new TypeError(
          `Can't determine required npm package for adapter '${dateAdapterMatch[1]}'`,
        );
      }
      deps[packageName] = 'latest';
    }
  }

  deps = includePeerDependencies(deps, versions);

  if (codeLanguage === CODE_VARIANTS.TS) {
    addTypeDeps(deps);
    deps.typescript = 'latest';
  }

  if (!deps['@mui/material']) {
    // The `index.js` imports StyledEngineProvider from '@mui/material', so we need to make sure we have it as a dependency
    const name = '@mui/material';
    deps[name] = versions[name] ? versions[name] : 'latest';
  }

  return deps;
}

/**
 * Get the value of a cookie
 * Source: https://vanillajstoolkit.com/helpers/getcookie/
 * @param name - The name of the cookie
 * @return The cookie value
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.',
    );
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

export function pathnameToLanguage(pathname: string): { userLanguage: string; canonical: string } {
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
