// Named import
import { helper } from './src/utils.js';

// Default import
import Button from './src/components/Button.js';

// Namespace import
import * as Utils from './src/utils.js';

// Export from
export { helper } from './src/utils.js';

// Export all
export * from './src/components/Button.js';

// Dynamic import
const loadUtils = () => import('./src/utils.js');

console.log(helper, Button, Utils, loadUtils);
