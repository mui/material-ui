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
      lineHeight: '18px',
      fontFamily: theme.typography.fontFamilyCode,
      marginLeft: -32,
      '& .MuiApi-item-link-visual': {
        display: 'none',
        border: 'solid 1px',
        borderRadius: '4px',
        borderColor: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
        width: '24px',
        height: '24px',
        textAlign: 'center',
        lineHeight: '24px',
        '& svg': {
          borderColor: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
          fill: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          height: '11px',
          width: '11px',
        },
      },
      span: {
        color: '#2D3843',
        borderBottom: 'solid 1px',
        fontWeight: 400,
        borderColor: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
        padding: '2px 6px',
      },
      '& .MuiApi-item-title': {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        color: `var(--muidocs-palette-primary-700, ${lightTheme.palette.primary[700]})`,
        fontWeight: theme.typography.fontWeightSemiBold,
        backgroundColor: grey[200],

        marginLeft: 32,
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
      // '&:hover': {
      //   cursor: 'pointer',
      //   span: {
      //     borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
      //   },
      //   '.MuiApi-item-title': {
      //     backgroundColor: alpha(lightBlue[100], 0.5),
      //   },
      //   '& .MuiApi-item-link-visual': {
      //     backgroundColor: alpha(lightBlue[100], 0.5),
      //     borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
      //     '& svg': {
      //       fill: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
      //     },
      //   },
      // },
    },
    '& .MuiAlert-standardWarning': {
      border: 'solid #FFF3C1 1px',
      backgroundColor: '#FFF9EBB2',
      color: '#5A3600',

      fontFamily: theme.typography.fontFamilyCode,
      '.MuiAlert-icon': {
        display: 'flex',
        alignItems: 'center',
        fill: '#AB6800',
      },
    },
    '& .default-props': {
      display: 'flex',
      alignItems: 'center',
      span: {
        marginRight: 8,
        whiteSpace: 'nowrap',
      },
      code: {
        border: 'solid #E0E3E7 1px',
        backgroundColor: '#F3F6F9',
        padding: '2px 6px',
      },
    },
    marginBottom: 32,
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-item-header': {
        '& span': {
          borderColor: '#2F3A46',
        },
        '& .MuiApi-item-title': {
          color: `var(--muidocs-palette-primary-200, ${lightTheme.palette.primary[200]})`,
          backgroundColor: '#1F262E',
        },
        '& .MuiApi-item-link-visual': {
          borderColor: '#2F3A46',
          backgroundColor: '#1F262E',
          '& svg': {
            fill: `var(--muidocs-palette-primary-200, ${lightTheme.palette.primary[200]})`,
          },
        },
        // '&:hover': {
        //   span: {
        //     borderColor: `#3399FF`,
        //   },
        //   '.MuiApi-item-title': {
        //     color: '#99CCF3',
        //     backgroundColor: `#0059B24D`,
        //   },
        //   '& .MuiApi-item-link-visual': {
        //     borderColor: `#3399FF`,
        //     backgroundColor: `#0059B24D`,
        //     '& svg': {
        //       fill: '#99CCF3',
        //     },
        //   },
        // },
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
