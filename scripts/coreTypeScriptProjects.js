import path from 'path';

export default {
  material: {
    rootPath: path.join(process.cwd(), 'packages/mui-material'),
    entryPointPath: 'src/index.d.ts',
  },
  lab: {
    rootPath: path.join(process.cwd(), 'packages/mui-lab'),
    entryPointPath: 'src/index.d.ts',
  },
  base: {
    rootPath: path.join(process.cwd(), 'packages/mui-base'),
    entryPointPath: 'src/index.d.ts',
  },
  joy: {
    rootPath: path.join(process.cwd(), 'packages/mui-joy'),
    entryPointPath: 'src/index.ts',
  },
  system: {
    rootPath: path.join(process.cwd(), 'packages/mui-system'),
    entryPointPath: 'src/index.d.ts',
  },
  docs: {
    rootPath: path.join(process.cwd(), 'docs'),
    tsConfigPath: 'tsconfig.json',
  },
};
