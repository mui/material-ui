// Import from directory (should resolve to index.js)
import Button from './src/components/Button/index.js';

// Import from directory with index.js
import { Button as ButtonAlias, Checkbox } from './src/components/index.js';

// Export from directory
export { Button } from './src/components/Button/index.js';

// Export all from directory
export * from './src/components/index.js';

// Dynamic import of directory
const loadComponents = () => import('./src/components/index.js');

console.log(Button, ButtonAlias, Checkbox, loadComponents);
