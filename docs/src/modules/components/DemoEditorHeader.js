import * as React from 'react';
import { styled } from '@mui/material/styles';
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
  borderBottom: `1px solid ${theme.palette.primaryDark[500]}`,
  '& > .MuiCode-copy': {
    display: 'block',
    top: 'unset',
    '& .MuiCode-copyKeypress': {
      top: 0,
      left: '-50%',
    },
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: blue[100],
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(10),
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
      {showEditableIndicatorText ? <Text variant="p">{t('editorHeaderText')}</Text> : null}
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
