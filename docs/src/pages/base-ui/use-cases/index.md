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

## 2. Creating a Design System

**When to use**: For consistency across multiple projects.

import { styled } from '@mui/system';
import { Button as BaseButton } from '@mui/base/Button';

const DesignButton = styled(BaseButton)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 4,
}));


## 3. Building a Template System

**When to use**: For themable systems like Joy UI.

import { createTheme, ThemeProvider } from '@mui/system';

const theme = createTheme({
  components: {
    Button: {
      styleOverrides: {
        root: { padding: '8px 16px' },
      },
    },
  },
});

---

### 4. **Save the File**
- **VS Code**: `Ctrl+S`
- **Nano**: `Ctrl+O` → Enter → `Ctrl+X`
- **Notepad**: `Ctrl+S`

---

### 5. **Test Locally**
Start the dev server:
```bash
npm run docs:dev