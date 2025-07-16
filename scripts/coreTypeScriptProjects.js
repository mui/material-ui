import path from 'path';

export default {
  material: {
    rootPath: path.join(process.cwd(), 'packages/mui-material'),
    tsConfigPath: 'tsconfig.json',
    entryPointPath: 'src/index.d.ts',
  },
  lab: {
    rootPath: path.join(process.cwd(), 'packages/mui-lab'),
    tsConfigPath: 'tsconfig.json',
    entryPointPath: 'src/index.d.ts',
  },
  joy: {
    rootPath: path.join(process.cwd(), 'packages/mui-joy'),
    tsConfigPath: 'tsconfig.json',
    entryPointPath: 'src/index.ts',
  },
  system: {
    rootPath: path.join(process.cwd(), 'packages/mui-system'),
    tsConfigPath: 'tsconfig.json',
    entryPointPath: 'src/index.d.ts',
  },
  docs: {
    rootPath: path.join(process.cwd(), 'docs'),
    tsConfigPath: 'tsconfig.json',
  },
};
