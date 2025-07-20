import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { DemoData } from './types';

const packagesWithBundledTypes = [
  'date-fns',
  '@emotion/react',
  '@emotion/styled',
  'dayjs',
  'clsx',
  '@react-spring/web',
];
const muiNpmOrgs = ['@mui', '@base_ui', '@pigment-css', '@toolpad'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @param deps - list of dependency as `name => version`
 */
function addTypeDeps(deps: Record<string, string>, devDeps: Record<string, string>): void {
  const packagesWithDTPackage = Object.keys(deps)
    .filter((name) => !packagesWithBundledTypes.includes(name))
    // All the MUI packages come with bundled types
    .filter((name) => !muiNpmOrgs.some((org) => name.startsWith(org)));

  packagesWithDTPackage.forEach((name) => {
    let resolvedName = name;
    // scoped package?
    if (name.startsWith('@')) {
      // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
      resolvedName = name.slice(1).replace('/', '__');
    }

    devDeps[`@types/${resolvedName}`] = 'latest';
  });
}

type Demo = Pick<DemoData, 'productId' | 'raw' | 'codeVariant' | 'relativeModules'>;

export default function SandboxDependencies(
  demo: Demo,
  options?: { commitRef?: string; devDeps?: Record<string, string> },
) {
  const { commitRef, devDeps = {} } = options || {};

  /**
   * @param packageName - The name of a package living inside this repository.
   * @return string - A valid version for a dependency entry in a package.json
   */
  function getMuiPackageVersion(packageName: string): string {
    if (
      commitRef === undefined ||
      process.env.SOURCE_CODE_REPO !== 'https://github.com/mui/material-ui'
    ) {
      if (['joy', 'base'].includes(packageName)) {
        return 'latest';
      }
      // #npm-tag-reference
      return 'latest';
    }
    return `https://pkg.pr.new/mui/material-ui/@mui/${packageName}@${commitRef}`;
  }

  function extractDependencies() {
    const muiDocConfig = (window as any).muiDocConfig;

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
      if (muiDocConfig && muiDocConfig.csbIncludePeerDependencies) {
        newDeps = muiDocConfig.csbIncludePeerDependencies(newDeps, {
          versions,
        });
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
      '@mui/system': getMuiPackageVersion('system'),
      '@mui/private-theming': getMuiPackageVersion('theming'),
      '@mui/private-classnames': getMuiPackageVersion('classnames'),
      '@mui/base': getMuiPackageVersion('base'),
      '@mui/utils': getMuiPackageVersion('utils'),
      '@mui/material-nextjs': getMuiPackageVersion('material-nextjs'),
      '@mui/joy': getMuiPackageVersion('joy'),
    };

    // TODO: consider if this configuration could be injected in a "cleaner" way.
    if (muiDocConfig && muiDocConfig.csbGetVersions) {
      versions = muiDocConfig.csbGetVersions(versions, { muiCommitRef: commitRef });
    }

    const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
    const extractImportedDependencies = (raw: string) => {
      let m: RegExpExecArray | null = null;
      // eslint-disable-next-line no-cond-assign
      while ((m = re.exec(raw))) {
        const fullName = m[2] ?? m[1];
        // handle scope names
        const name =
          fullName.charAt(0) === '@' ? fullName.split('/', 2).join('/') : fullName.split('/', 1)[0];

        if (!deps[name] && !name.startsWith('.')) {
          deps[name] = versions[name] ?? 'latest';
        }

        if (muiDocConfig && muiDocConfig.postProcessImport) {
          const resolvedDep = muiDocConfig.postProcessImport(fullName);
          if (resolvedDep) {
            deps = { ...deps, ...resolvedDep };
          }
        }
      }
    };

    extractImportedDependencies(demo.raw);
    demo.relativeModules?.forEach(({ raw }) => extractImportedDependencies(raw));

    deps = includePeerDependencies(deps, versions);

    return deps;
  }

  const dependencies = extractDependencies();

  if (!demo.productId && !dependencies['@mui/material']) {
    // The `index.js` imports StyledEngineProvider from '@mui/material', so we need to make sure we have it as a dependency
    const name = '@mui/material';
    const versions = {
      [name]: getMuiPackageVersion('material'),
    };
    dependencies[name] = versions[name] ? versions[name] : 'latest';
  }

  const devDependencies: Record<string, string> = { ...devDeps };

  if (demo.codeVariant === CODE_VARIANTS.TS) {
    addTypeDeps(dependencies, devDependencies);
    dependencies.typescript = 'latest';
  }

  return { dependencies, devDependencies };
}
