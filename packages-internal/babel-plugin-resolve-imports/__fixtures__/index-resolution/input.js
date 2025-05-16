// Import from directory (should resolve to index.js)
import Button from './src/components/Button';

// Import from directory with index.js
import { Button as ButtonAlias, Checkbox } from './src/components';

// Export from directory
export { Button } from './src/components/Button';

// Export all from directory
export * from './src/components';

// Dynamic import of directory
const loadComponents = () => import('./src/components');

console.log(Button, ButtonAlias, Checkbox, loadComponents);
