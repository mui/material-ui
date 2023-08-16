import path from 'path';
import { CreateTypeScriptProjectOptions } from './createTypeScriptProject';

export type CoreTypeScriptProjects =
  | 'material'
  | 'lab'
  | 'base'
  | 'joy'
  | 'system'
  | 'material-next';

export const CORE_TYPESCRIPT_PROJECTS: Record<
  CoreTypeScriptProjects,
  Omit<CreateTypeScriptProjectOptions, 'name'>
> = {
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
  'material-next': {
    rootPath: path.join(process.cwd(), 'packages/mui-material-next'),
    entryPointPath: 'src/index.ts',
  },
};
