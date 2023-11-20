import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(filename);
export const PKG_ROOT = path.join(distPath, '../');

export const DEFAULT_APP_NAME = 'create-mui-app';
export const TITLE = `
 __  __       _            _       _   _    _ _____
|  \\/  |     | |          (_)     | | | |  | |_   _|
| \\  / | __ _| |_ ___ _ __ _  __ _| | | |  | | | |
| |\\/| |/ _' | __/ _ \\ '__| |/ _' | | | |  | | | |
| |  | | (_| | ||  __/ |  | | (_| | | | |__| |_| |_
|_|  |_|\\__,_|\\__\\___|_|  |_|\\__,_|_|  \\____/|_____|
`;
export const CREATE_MUI_APP = 'create-mui-app';
