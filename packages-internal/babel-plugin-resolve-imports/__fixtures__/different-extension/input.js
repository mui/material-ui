// Setting outExtension to .mjs in test options
import Button from './src/components/Button';
import { helper } from './src/utils';

export { helper } from './src/utils';
export * from './src/components/Button';

const loadUtils = () => import('./src/utils');

console.log(Button, helper, loadUtils);
