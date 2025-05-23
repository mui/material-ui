import { mergeConfig, defineConfig } from 'vitest/config';
// eslint-disable-next-line import/no-relative-packages
import sharedConfig from '../../vitest.shared.mts';

export default async () => mergeConfig(await sharedConfig(import.meta.url), defineConfig({}));
