// Multiple level deep import
import Button from './src/components/ui/elements/Button';

// Multiple level with parent directory traversal
import { formatDate } from './src/utils/helpers/formatting';

// Export multiple levels deep
export { formatDate } from './src/utils/helpers/formatting';

// Export all from deeply nested path
export * from './src/components/ui/elements/Button';

// Dynamic import with deep path
const loadButton = () => import('./src/components/ui/elements/Button');

// Complex parent directory traversal
import { helper } from './src/components/ui/elements/../../../utils/helpers/formatting';

console.log(Button, formatDate, loadButton, helper);
