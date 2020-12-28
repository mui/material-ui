# 屏幕阅读器

<p class="description">为改善屏幕阅读器的无障碍功能而收集的工具集。
</p>

## 视觉上被隐藏的元素

The visually hidden style utility provides a common mechanism for hidings elements visually, but making them available for assistive technology. It's a simple style object of type `React.CSSProperties`.

{{"demo": "pages/system/screen-readers/VisuallyHiddenUsage.js", "defaultCodeOpen": true}}

If you don't have a strict CSP policy in place, you can also do:

```jsx
import { visuallyHidden } from '@material-ui/utils';

<div style={visuallyHidden}>about how to visually hide elements</div>;
```
