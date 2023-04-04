import { CODE_VARIANTS } from '../constants';

type RegExpMatchArrayWithGroupsOnly<T> = {
  groups?: {
    [key in keyof T]: string;
  };
};
type RegExpMatchArrayWithGroups<T> = (RegExpMatchArray & RegExpMatchArrayWithGroupsOnly<T>) | null;

export default function SandboxDependencies(
  demo: {
    raw: string;
    product?: 'joy-ui' | 'base';
    codeVariant: keyof typeof CODE_VARIANTS;
  },
  options?: { commitRef?: string },
) {
  const { commitRef } = options || {};

  /**
   * WARNING: Always uses `latest` typings.
   *
   * Adds dependencies to @types packages only for packages that are not listed
   * in packagesWithBundledTypes
   *
   * @param deps - list of dependency as `name => version`
   */
  function addTypeDeps(deps: Record<string, string>): void {
    const packagesWithBundledTypes = ['date-fns', '@emotion/react', '@emotion/styled', 'dayjs'];
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

  /**
   * @param packageName - The name of a package living inside this repository.
   * @return string - A valid version for a dependency entry in a package.json
   */
  function getMuiPackageVersion(packageName: string): string {
    if (
      commitRef === undefined ||
      process.env.SOURCE_CODE_REPO !== 'https://github.com/mui/material-ui'
    ) {
      // #default-branch-switch
      return 'latest';
    }
    const shortSha = commitRef.slice(0, 8);
    return `https://pkg.csb.dev/mui/material-ui/commit/${shortSha}/@mui/${packageName}`;
  }

  function extractDependencies(raw: string) {
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

      if (newDeps['@mui/lab'] || newDeps['@mui/icons-material']) {
        newDeps['@mui/material'] = versions['@mui/material'];
      }

      if (newDeps['@mui/x-data-grid']) {
        newDeps['@mui/material'] = versions['@mui/material'];
      }

      // TODO: consider if this configuration could be injected in a "cleaner" way.
      if ((window as any).muiDocConfig) {
        newDeps = (window as any).muiDocConfig.csbIncludePeerDependencies(newDeps, { versions });
      }

      return newDeps;
    }
    let deps: Record<string, string> = {};
    let versions: Record<string, string> = {
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': getMuiPackageVersion('material'),
      '@mui/icons-material': getMuiPackageVersion('icons-material'),
      '@mui/lab': getMuiPackageVersion('lab'),
      '@mui/styled-engine': getMuiPackageVersion('styled-engine'),
      '@mui/styles': getMuiPackageVersion('styles'),
      '@mui/system': getMuiPackageVersion('system'),
      '@mui/private-theming': getMuiPackageVersion('theming'),
      '@mui/private-classnames': getMuiPackageVersion('classnames'),
      '@mui/base': getMuiPackageVersion('base'),
      '@mui/utils': getMuiPackageVersion('utils'),
      '@mui/material-next': getMuiPackageVersion('material-next'),
      '@mui/joy': getMuiPackageVersion('joy'),
    };

    // TODO: consider if this configuration could be injected in a "cleaner" way.
    if ((window as any).muiDocConfig) {
      const muiCommitRef = process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined;
      versions = (window as any).muiDocConfig.csbGetVersions(versions, { muiCommitRef });
    }

    const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
    let m: RegExpExecArray | null = null;
    // eslint-disable-next-line no-cond-assign
    while ((m = re.exec(raw))) {
      const fullName = m[2] ?? m[1];
      // handle scope names
      const name =
        fullName.charAt(0) === '@' ? fullName.split('/', 2).join('/') : fullName.split('/', 1)[0];

      if (!deps[name] && !name.startsWith('.')) {
        deps[name] = versions[name] ? versions[name] : 'latest';
      }

      // e.g date-fns
      const dateAdapterMatch = fullName.match(
        /^@mui\/(lab|x-date-pickers)\/(?<adapterName>Adapter.*)/,
      ) as RegExpMatchArrayWithGroups<{ adapterName: string }>;
      if (dateAdapterMatch !== null) {
        /**
         * Mapping from the date adapter sub-packages to the npm packages they require.
         * @example `@mui/x-date-pickers/AdapterDayjs` has a peer dependency on `dayjs`.
         */
        const packageName = (
          {
            AdapterDateFns: 'date-fns',
            AdapterDateFnsJalali: 'date-fns-jalali',
            AdapterDayjs: 'dayjs',
            AdapterLuxon: 'luxon',
            AdapterMoment: 'moment',
            AdapterMomentHijri: 'moment-hijri',
            AdapterMomentJalaali: 'moment-jalaali',
          } as Record<string, string>
        )[dateAdapterMatch.groups?.adapterName || ''];
        if (packageName === undefined) {
          throw new TypeError(
            `Can't determine required npm package for adapter '${dateAdapterMatch[1]}'`,
          );
        }
        deps[packageName] = 'latest';
      }
    }

    deps = includePeerDependencies(deps, versions);

    return deps;
  }

  const dependencies = extractDependencies(demo.raw);

  if (demo.codeVariant === CODE_VARIANTS.TS) {
    addTypeDeps(dependencies);
    dependencies.typescript = 'latest';
  }

  if (!demo.product && !dependencies['@mui/material']) {
    // The `index.js` imports StyledEngineProvider from '@mui/material', so we need to make sure we have it as a dependency
    const name = '@mui/material';
    const versions = {
      [name]: getMuiPackageVersion('material'),
    };
    dependencies[name] = versions[name] ? versions[name] : 'latest';
  }

  const devDependencies = {
    'react-scripts': 'latest',
  };

  return { dependencies, devDependencies };
}
