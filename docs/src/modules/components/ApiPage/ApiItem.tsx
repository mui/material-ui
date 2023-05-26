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
      textDecoration: 'none',
      marginBottom: '12px',
      '& .MuiApi-item-link-visual': {
        display: 'none',
        border: 'solid 1px',
        borderRadius: '4px',
        borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
        width: '24px',
        height: '24px',
        textAlign: 'center',
        lineHeight: '24px',
        position: 'absolute',
        left: '-32px',
        '& svg': {
          fill: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          height: '11px',
          width: '11px',
        },
      },
      span: {
        borderBottom: 'solid 1px',
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
      },
      '& .MuiApi-item-description': {
        flexGrow: 1,
        color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      },
      '& .MuiApi-item-note': {
        padding: '2px 6px',
        color: `var(--muidocs-palette-green-800, ${green[800]})`,
      },
      '&:hover, &:target': {
        '.MuiApi-item-link-visual': { display: 'inline-block' },
      },
      '&:hover': {
        cursor: 'pointer',
        span: {
          borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
        },
        '.MuiApi-item-title': {
          backgroundColor: alpha(lightBlue[100], 0.5),
        },
        '& .MuiApi-item-link-visual': {},
      },
    },
    marginBottom: 32,
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      color: 'rgb(255, 255, 255)',
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
        '&:hover': {
          span: {
            borderColor: `var(--muidocs-palette-blue-700, ${lightTheme.palette.primary[700]})`,
          },
          '.MuiApi-item-title': {
            backgroundColor: `var(--muidocs-palette-primary-light-200, #0059B24D) / 30%`,
          },
          '& .MuiApi-item-link-visual': {
            borderColor: `var(--muidocs-palette-primary-400, ${lightTheme.palette.primary[400]})`,
            backgroundColor: `var(--muidocs-palette-primary-light-200, #0059B24D) / 30%`,
          },
        },
        '&:hover, &:target': {
          '& .MuiApi-item-link-visual': {
            display: 'inline-block',
          },
        },
        '& .MuiApi-item-description': {
          color: '#B2BAC2',
        },
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-green-400, ${green[400]})`,
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
      <a id={id} href={`#${id}`} className="MuiApi-item-header">
        <div className="MuiApi-item-link-visual">
          <svg>
            <use xlinkHref="#anchor-link-icon" />
          </svg>
        </div>
        <span className="MuiApi-item-title">{title}</span>
        <span
          className="MuiApi-item-description"
          dangerouslySetInnerHTML={{
            __html: (description ?? '').replace(/<br>/g, ' '),
          }}
        />
        {note && <span className="MuiApi-item-note">{note}</span>}
      </a>
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
