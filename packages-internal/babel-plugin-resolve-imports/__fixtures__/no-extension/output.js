// No outExtension configured - should only resolve to full paths
import Button from './src/components/Button.js';
import { helper } from './src/utils.js';

export { helper } from './src/utils.js';
export * from './src/components/Button.js';

const loadUtils = () => import('./src/utils.js');

console.log(Button, helper, loadUtils);
