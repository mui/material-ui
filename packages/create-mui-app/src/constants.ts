import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(filename);
export const PKG_ROOT = path.join(distPath, '../');

export const DEFAULT_APP_NAME = 'create-mui-app';
export const TITLE = `Create MUI App`;
export const CREATE_MUI_APP = 'create-mui-app';
