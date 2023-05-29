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
        borderColor: `var(--muidocs-palette-primary-500, ${lightTheme.palette.primary[500]})`,
        borderRadius: '6px',
        backgroundColor: alpha(lightBlue[100], 0.5),
        width: '24px',
        height: '24px',
        lineHeight: '24px',
        textAlignment: 'center',
        '& svg': {
          borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.primary[500]})`,
          fill: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          height: '11px',
          width: '11px',
        },
      },
      span: {
        color: '#2D3843',
        borderBottom: 'solid 1px',
        fontWeight: 400,
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
        padding: '2px 6px',
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
          borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          '& svg': {
            fill: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          },
        },
      },
    },
    '& .MuiAlert-standardWarning': {
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-100, ${lightTheme.palette.grey[100]})`,
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
    marginBottom: 32,
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-item-header': {
        '& span': {
          borderColor: `var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
        },
        '& .MuiApi-item-title': {
          color: `var(--muidocs-palette-primary-100, ${lightTheme.palette.primary[100]})`,
          backgroundColor: `var(--muidocs-palette-primaryDark-800, ${darkTheme.palette.primaryDark[800]})`,
        },
        '& .MuiApi-item-link-visual': {
          borderColor: '#2F3A46',
          backgroundColor: '#00baff',
          '& svg': {
            fill: `var(--muidocs-palette-primary-200, ${lightTheme.palette.primary[200]})`,
          },
        },
        '&:hover, &:target': {
          '.MuiApi-item-link-visual:hover': {
            borderColor: `#3399FF`,
            backgroundColor: `#0059B24D`,
            '& svg': {
              fill: '#99CCF3',
            },
          },
        },
        '& .MuiApi-item-description': {
          color: '#B2BAC2',
        },
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-green-400, #3EE07F)`,
        },
      },
      '& .MuiAlert-standardWarning': {
        borderColor: '#5A3600',
        backgroundColor: '#F4C0001A',
        color: '#FFDC48',
        '.MuiAlert-icon svg': {
          fill: '#FFDC48',
        },
      },
      '& .default-props': {
        color: '#A0AAB4',
        code: {
          borderColor: '#1F262E',
          backgroundColor: '#141A1F',
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
