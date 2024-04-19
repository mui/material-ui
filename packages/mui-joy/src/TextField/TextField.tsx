'use client';
/**
 * @ignore - do not document.
 */
export default (function DeletedTextField() {
  throw new Error(
    [
      'MUI: `TextField` component has been removed in favor of Input composition.',
      '',
      'To migrate, run `npx @mui/codemod@latest v5.0.0/joy-text-field-to-input <path>`.',
      'For the codemod detail, visit https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#joy-text-field-to-input\n\nTo learn more why it has been removed, visit the RFC https://github.com/mui/material-ui/issues/34176',
    ].join('\n'),
  );
});
