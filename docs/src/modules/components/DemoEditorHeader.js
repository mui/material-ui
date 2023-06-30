import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { NoSsr } from '@mui/base';
import { blue } from 'docs/src/modules/brandingTheme';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import CodeCopyButton from './CodeCopyButton';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 40,
  paddingInline: theme.spacing(2),
  borderBottom: `1px dashed ${alpha(theme.palette.primary[100], 0.1)}`,
  '& > .MuiCode-copy': {
    display: 'block',
    top: 'unset',
    '& .MuiCode-copyKeypress': {
      top: 0,
      left: '-50%',
    },
  },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(10),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
  color: theme.palette.primary[200],
}));

function DemoEditorHeader(props) {
  const {
    copyButtonHidden = false,
    copyButtonProps,
    showEditableIndicatorText = true,
    value,
  } = props;
  const hideHeader = copyButtonHidden && !showEditableIndicatorText;
  const t = useTranslate();

  return hideHeader ? null : (
    <Root className="MuiCode-editor-header">
      {showEditableIndicatorText ? <HeaderText variant="p">{t('editorHeaderText')}</HeaderText> : null}
      {copyButtonHidden ? null : (
        <NoSsr>
          <CodeCopyButton {...copyButtonProps} code={value} />
        </NoSsr>
      )}
    </Root>
  );
}

DemoEditorHeader.propTypes = {
  copyButtonHidden: PropTypes.bool,
  copyButtonProps: PropTypes.object,
  showEditableIndicatorText: PropTypes.bool,
  value: PropTypes.string,
};

export default DemoEditorHeader;
