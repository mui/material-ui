// Multiple level deep import
import Button from './src/components/ui/elements/Button.js';

// Multiple level with parent directory traversal
import { formatDate } from './src/utils/helpers/formatting.js';

// Export multiple levels deep
export { formatDate } from './src/utils/helpers/formatting.js';

// Export all from deeply nested path
export * from './src/components/ui/elements/Button.js';

// Dynamic import with deep path
const loadButton = () => import('./src/components/ui/elements/Button.js');

// Complex parent directory traversal
import { helper } from './src/utils/helpers/formatting.js';

console.log(Button, formatDate, loadButton, helper);
