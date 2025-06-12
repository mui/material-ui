---
title: Base UI Use Cases
components:
  - BaseButton
  - BaseInput
  - BaseSelect
githubLabel: 'base-ui'
---

# Base UI Use Cases and Customization Solutions

## 1. Styling a Single Project

**When to use**: When you need to style one application without concerns about reuse or strict design system requirements.

**Recommendations**:
- Use Base UI's unstyled components as a foundation
- Apply project-specific styles via CSS/Sass or styled-components
- Take advantage of Base UI's hooks for functionality while styling independently

**Example**:

```jsx
import { Button as BaseButton } from '@mui/base/Button';
import './styles.css';

function Button(props) {
  return <BaseButton {...props} className="my-custom-button" />;
}
