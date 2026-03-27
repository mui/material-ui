import * as React from 'react';
import Box from '@mui/material/Box';
import { MarkdownElement } from '@mui/docs/MarkdownElement';

export default function MuiBaseDeprecation(props: { newName?: string; newUrl?: string }) {
  if (props.newUrl && props.newName) {
    return (
      <MarkdownElement>
        <Box component="aside" className="MuiCallout-root MuiCallout-error">
          <Icon />
          <Box className="MuiCallout-content">
            MUI Base (@mui/base) has been deprecated. Base UI is its successor. We strongly
            recommend using the new <a href={props.newUrl}>Base UI {props.newName} component</a>{' '}
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
          MUI Base (@mui/base) has been deprecated. <a href="https://base-ui.com">Base UI</a> is its
          successor. We strongly recommend using the new package instead.
        </Box>
      </Box>
    </MarkdownElement>
  );
}

function Icon() {
  return (
    <Box className="MuiCallout-icon-container">
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ContentCopyRoundedIcon"
      >
        <use className="MuiCode-copied-icon" xlinkHref="#error-icon" />
      </svg>
    </Box>
  );
}
