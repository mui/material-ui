// Named import
import { helper } from './src/utils';

// Default import
import Button from './src/components/Button';

// Namespace import
import * as Utils from './src/utils';

// Export from
export { helper } from './src/utils';

// Export all
export * from './src/components/Button';

// Dynamic import
const loadUtils = () => import('./src/utils');

console.log(helper, Button, Utils, loadUtils);
