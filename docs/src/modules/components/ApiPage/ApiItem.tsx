/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { green, grey, lightBlue } from '@mui/material/colors';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';

const Root = styled('div')(
  ({ theme }) => ({
    '& .MuiApi-item-header': {
      ...theme.typography.caption,
      display: 'flex',
      position: 'relative',
      marginBottom: '12px',
      fontFamily: theme.typography.fontFamilyCode,
      marginLeft: -32,
      '& .MuiApi-item-link-visual': {
        display: 'none',
        border: '1px solid',
        borderColor: `var(--muidocs-palette-primary-200, ${lightTheme.palette.primary[200]})`,
        borderRadius: '6px',
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
        width: '24px',
        height: '24px',
        lineHeight: '24px',
        textAlign: 'center',
        '& svg': {
          borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.primary[500]})`,
          fill: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
          height: '11px',
          width: '11px',
        },
      },
      span: {
        padding: '2px 6px',
        fontWeight: theme.typography.fontWeightRegular,
        borderBottom: 'solid 1px',
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      },
      '& .MuiApi-item-title': {
        marginLeft: 32,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        borderBottomLeftRadius: '6px',
        fontWeight: theme.typography.fontWeightSemiBold,
        color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      },
      '& .MuiApi-item-description': {
        flexGrow: 1,
      },
      '& .MuiApi-item-note': {
        padding: '2px 6px',
        color: `var(--muidocs-palette-green-800, ${green[800]})`,
      },
      '&:hover, &:target': {
        '.MuiApi-item-link-visual': {
          display: 'inline-block',
        },
        '.MuiApi-item-title': {
          marginLeft: '8px',
        },
        '.MuiApi-item-link-visual:hover': {
          cursor: 'pointer',
          backgroundColor: alpha(lightBlue[100], 0.5),
          borderColor: `var(--muidocs-palette-primary-500, ${lightTheme.palette.primary[500]})`,
          '& svg': {
            fill: `var(--muidocs-palette-primary-500, ${lightTheme.palette.primary[500]})`,
          },
        },
      },
    },
    '& .MuiAlert-standardWarning': {
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      marginBottom: '16px',
      '.MuiAlert-icon': {
        display: 'flex',
        alignItems: 'center',
        fill: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      },
    },
    '& .default-props': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      display: 'flex',
      alignItems: 'center',
      span: {
        marginRight: 6,
        whiteSpace: 'nowrap',
      },
      code: {
        ...theme.typography.caption,
        fontFamily: theme.typography.fontFamilyCode,
        fontWeight: theme.typography.fontWeightRegular,
        padding: '2px 6px',
        border: '1px solid',
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
        backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      },
    },
    marginBottom: 40,
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-item-header': {
        '& span': {
          borderColor: `var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
        },
        '& .MuiApi-item-title': {
          color: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
          backgroundColor: `var(--muidocs-palette-primaryDark-800, ${darkTheme.palette.primaryDark[800]})`,
        },
        '& .MuiApi-item-link-visual': {
          borderColor: `var(--muidocs-palette-primaryDark-400, ${darkTheme.palette.primaryDark[400]})`,
          backgroundColor: `var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
          '& svg': {
            fill: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
          },
        },
        '&:hover, &:target': {
          '.MuiApi-item-link-visual:hover': {
            borderColor: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primary[300]})`,
            backgroundColor: `var(--muidocs-palette-primaryDark-600, ${darkTheme.palette.primaryDark[600]})`,
            '& svg': {
              fill: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
            },
          },
        },
        '& .MuiApi-item-description': {
          color: `var(--muidocs-palette-grey-500, ${darkTheme.palette.grey[500]})`,
        },
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-success-500, ${darkTheme.palette.success[400]})`,
        },
      },
      '& .MuiAlert-standardWarning': {
        borderColor: alpha(darkTheme.palette.warning[600], 0.2),
        backgroundColor: alpha(darkTheme.palette.warning[800], 0.2),
        color: `var(--muidocs-palette-warning-300, ${darkTheme.palette.warning[300]})`,
        '.MuiAlert-icon svg': {
          fill: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
      },
      '& .default-props': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
        code: {
          borderColor: `var(--muidocs-palette-grey-800, ${darkTheme.palette.grey[800]})`,
          backgroundColor: alpha(darkTheme.palette.grey[900], 0.5),
        },
      },
    },
  }),
);

export type ApiItemProps = {
  id: string;
  title: string;
  description?: string;
  note?: string;
  children: React.ReactNode;
};

function ApiItem(props: ApiItemProps) {
  const { title, description, note, children, id } = props;
  return (
    <Root>
      <div id={id} className="MuiApi-item-header">
        <a className="MuiApi-item-link-visual" href={`#${id}`}>
          <svg>
            <use xlinkHref="#anchor-link-icon" />
          </svg>
        </a>

        <span className="MuiApi-item-title">{title}</span>
        <span
          className="MuiApi-item-description"
          dangerouslySetInnerHTML={{
            __html: (description ?? '').replace(/<br>/g, ' '),
          }}
        />
        {note && <span className="MuiApi-item-note">{note}</span>}
      </div>
      {children}
    </Root>
  );
}

ApiItem.propTypes = {
  description: PropTypes.string,
  note: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ApiItem;
