import { type FrameworkOption } from 'src/utils/createProject';

import {
  emotionInstaller,
  iconsInstaller,
  joyInstaller,
  muiInstaller,
  muiSystemInstaller,
} from './mui';
import tailwindInstaller from './tailwind';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export const availableMuiPackages = ['mui', 'joy'] as const;
export const availablePackages = [
  'tailwind',
  'system',
  'icons',
  'emotion',
  ...availableMuiPackages,
] as const;
export type AvailablePackages = (typeof availablePackages)[number];
export type AvailableMuiPackages = (typeof availableMuiPackages)[number];

export interface InstallerOptions {
  projectDir: string;
  packageManager: PackageManager;
  packages?: PkgInstallerMap;
  projectName: string;
  // scopedAppName: string;
  typescript: boolean;
  framework: FrameworkOption;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (packages: AvailablePackages[]): PkgInstallerMap => ({
  tailwind: {
    inUse: packages.includes('tailwind'),
    installer: tailwindInstaller,
  },
  mui: {
    inUse: packages.includes('mui'),
    installer: muiInstaller,
  },
  joy: {
    inUse: packages.includes('joy'),
    installer: joyInstaller,
  },
  icons: {
    inUse: packages.includes('icons'),
    installer: iconsInstaller,
  },
  system: {
    inUse: packages.includes('system'),
    installer: muiSystemInstaller,
  },
  emotion: {
    inUse: true,
    installer: emotionInstaller,
  },
});
