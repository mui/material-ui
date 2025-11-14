import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function LinksAccessible() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Example 1: Descriptive link text */}
      <div style={{ marginBottom: 12 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ✓ Good: Descriptive link text
        </Typography>
        <Link
          href="https://mui.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Learn more about Material-UI documentation (opens in new tab)"
        >
          Read the Material-UI documentation
        </Link>
      </div>

      {/* Example 2: Generic link text - not accessible */}
      <div style={{ marginBottom: 12 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ✗ Avoid: Generic link text
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          When link text is non-descriptive, use aria-label:
        </Typography>
        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens external example website in a new tab"
        >
          Click here
        </Link>
      </div>

      {/* Example 3: External link with warning */}
      <div style={{ marginBottom: 12 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ✓ Good: External link with context
        </Typography>
        <Link
          href="https://www.w3.org/WAI/ARIA/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit W3C WAI ARIA documentation (opens in new window)"
        >
          W3C WAI-ARIA Authoring Practices
        </Link>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
          Screen readers will announce &quot;opens in new window&quot;
        </Typography>
      </div>

      {/* Example 4: Button-like link */}
      <div>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ✓ Good: Link styled as button
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={(event) => {
            event.preventDefault();
            alert('Action triggered - semantic button link');
          }}
          aria-label="Trigger action"
          sx={{ cursor: 'pointer' }}
        >
          Open modal dialog
        </Link>
      </div>
    </Box>
  );
}
