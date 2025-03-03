import * as React from 'react';
import Box from '@mui/material/Box';
import { MarkdownElement } from '@mui/docs/MarkdownElement';

export default function MuiBaseDeprecation(props: {
  newComponentName?: string;
  newComponentUrl?: string;
}) {
  if (props.newComponentUrl && props.newComponentName) {
    return (
      <MarkdownElement>
        <Box component="aside" className="MuiCallout-root MuiCallout-error">
          <Icon />
          <Box className="MuiCallout-content">
            @mui/base has been deprecated and has been replaced by Base UI. We strongly recommend
            using the Base UI <a href={props.newComponentUrl}>{props.newComponentName} component</a>{' '}
            instead.
          </Box>
        </Box>
      </MarkdownElement>
    );
  }
  return (
    <MarkdownElement>
      <Box component="aside" className="MuiCallout-root MuiCallout-error">
        <Icon />
        <Box className="MuiCallout-content">
          @mui/base has been deprecated and has been replaced by{' '}
          <a href="https://base-ui.com">Base UI</a>. We strongly recommend using the new package
          instead.
        </Box>
      </Box>
    </MarkdownElement>
  );
}

function Icon() {
  return (
    <Box className="MuiCallout-icon-container">
      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <use className="MuiCode-copied-icon" xlinkHref="#error-icon" />
      </svg>
    </Box>
  );
}
