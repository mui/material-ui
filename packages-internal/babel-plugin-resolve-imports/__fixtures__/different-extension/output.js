// Setting outExtension to .mjs in test options
import Button from './src/components/Button.mjs';
import { helper } from './src/utils.mjs';

export { helper } from './src/utils.mjs';
export * from './src/components/Button.mjs';

const loadUtils = () => import('./src/utils.mjs');

console.log(Button, helper, loadUtils);
