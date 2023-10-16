import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider, IconButton, SxProps } from '@mui/material';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';

type DescriptionType = 'props' | 'classes' | 'CSS' | 'slots';

const Root = styled('div')<{ ownerState: { type?: DescriptionType } }>(
  ({ theme }) => ({
    position: 'relative',
    marginBottom: 12,
    scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
    '& .MuiApi-item-header': {
      minHeight: 26,
      display: 'flex',
      alignItems: 'center',
      marginLeft: -38,
      marginBottom: 8,
      lineHeight: 1.5,
    },
    '& .MuiApi-item-link-visual': {
      display: 'none',
      flexShrink: 0,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      borderRadius: 8,
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      height: 26,
      width: 26,
      textAlign: 'center',
      lineHeight: '26px',
      '& svg': {
        fill: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
        height: '14px',
        width: '14px',
      },
    },
    '& .MuiApi-item-title': {
      marginLeft: 32,
      padding: '2px 6px',
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .MuiApi-item-content': {
      verticalAlign: 'top',
      paddingBottom: theme.spacing(2),
      p: { marginBottom: theme.spacing(1.5) },
    },
    '& .MuiApi-item-note': {
      fontSize: 11,
      marginLeft: 6,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: `var(--muidocs-palette-success-800, ${lightTheme.palette.success[800]})`,
      fontWeight: theme.typography.fontWeightBold,
      lineHeight: '24px',
    },
    '& .MuiApi-expend-button': {},
    '& hr': {
      margin: 0,
    },
    [theme.breakpoints.up('lg')]: {
      '&:hover, &:target': {
        '.MuiApi-item-link-visual': {
          display: 'inline-block',
        },
        '.MuiApi-item-title': {
          marginLeft: 6,
        },
        '.MuiApi-item-link-visual:hover': {
          cursor: 'pointer',
          backgroundColor: alpha(lightTheme.palette.primary[100], 0.4),
          borderColor: `var(--muidocs-palette-primary-100, ${lightTheme.palette.primary[100]})`,
          '& svg': {
            fill: `var(--muidocs-palette-primary-main, ${lightTheme.palette.primary.main})`,
          },
        },
      },
      '&:target': {
        '.MuiApi-item-link-visual': {
          '&>svg': {
            transform: 'rotate(90deg) translateX(-0.5px) translateY(0.1px)',
          },
        },
      },
    },
    '& .MuiAlert-standardWarning': {
      padding: '6px 12px',
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-warning-300, ${lightTheme.palette.warning[300]})`,
      borderRadius: 12,
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      marginBottom: 16,
      '.MuiAlert-icon': {
        display: 'flex',
        alignItems: 'center',
        fill: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      },
    },
    '& code.Api-code': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      padding: '1px 4px',
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-item-header': {
        '&>span, &>div': {
          borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        },
        '& .MuiApi-item-title': {
          color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
        },
        '& .MuiApi-item-link-visual': {
          borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
          backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
          '& svg': {
            fill: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
          },
        },
        '&:hover, &:target': {
          '.MuiApi-item-link-visual:hover': {
            borderColor: `var(--muidocs-palette-primary-900, ${darkTheme.palette.primary[900]})`,
            backgroundColor: alpha(darkTheme.palette.primary[900], 0.6),
            '& svg': {
              fill: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
            },
          },
        },
        '& .MuiApi-item-description': {
          color: `var(--muidocs-palette-grey-500, ${darkTheme.palette.grey[500]})`,
        },
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-success-400, ${darkTheme.palette.success[400]})`,
        },
      },
      '& .MuiAlert-standardWarning': {
        borderColor: alpha(darkTheme.palette.warning[800], 0.3),
        backgroundColor: alpha(darkTheme.palette.warning[800], 0.2),
        color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
        '.MuiAlert-icon svg': {
          fill: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
      },
      '& code.Api-code': {
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
    },
  }),
);

export type ApiItemProps = {
  id: string;
  title: string;
  description?: string;
  note?: string;
  type?: DescriptionType;
  isExtendable?: boolean;
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps;
  displayOption?: 'collapsed' | 'expended';
};

function ApiItem(props: ApiItemProps) {
  const {
    title,
    description,
    note,
    children,
    type,
    id,
    isExtendable = true,
    className,
    displayOption,
    ...other
  } = props;

  const [isExtended, setIsExtended] = React.useState(() => displayOption === 'expended');

  React.useEffect(() => {
    setIsExtended(displayOption === 'expended');
  }, [displayOption]);
  return (
    <Root
      ownerState={{ type }}
      {...other}
      id={id}
      className={clsx(
        `MuiApi-item-root ${isExtendable ? 'MuiApi-item-header-extendable' : ''}`,
        className,
      )}
    >
      <div className="MuiApi-item-header">
        <a
          className="MuiApi-item-link-visual"
          href={`#${id}`}
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}${window.location.pathname}#${id}`,
            );
          }}
        >
          <svg>
            <use xlinkHref="#anchor-link-icon" />
          </svg>
        </a>

        <span
          className="MuiApi-item-title" // This className is used by Algolia
        >
          {title}
        </span>
        {note && <span className="MuiApi-item-note">{note}</span>}
        {isExtendable && (
          <IconButton
            onClick={() => setIsExtended((prev) => !prev)}
            className="MuiApi-expend-button"
            size="small"
            sx={{ p: 0, ml: 'auto', borderRadius: '6px' }}
          >
            {isExtended ? (
              <KeyboardArrowUpIcon sx={{ color: 'grey.500' }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: 'grey.500' }} />
            )}
          </IconButton>
        )}
      </div>
      {isExtended && <div className={`MuiApi-item-content`}>{isExtended && children}</div>}
      <Divider />
    </Root>
  );
}

ApiItem.propTypes = {
  description: PropTypes.string,
  note: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export const ApiItemContaier = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export default ApiItem;
