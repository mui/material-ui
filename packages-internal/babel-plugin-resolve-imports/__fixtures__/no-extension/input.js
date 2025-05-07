// No outExtension configured - should only resolve to full paths
import Button from './src/components/Button';
import { helper } from './src/utils';

export { helper } from './src/utils';
export * from './src/components/Button';

const loadUtils = () => import('./src/utils');

console.log(Button, helper, loadUtils);
