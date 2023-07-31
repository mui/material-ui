/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';

type DescriptionType = 'props' | 'classes' | 'CSS' | 'slots';

const Root = styled('div')<{ ownerState: { type?: DescriptionType } }>(
  ({ theme }) => ({
    '& .MuiApi-item-header': {
      ...theme.typography.caption,
      fontSize: 13,
      fontFamily: theme.typography.fontFamilyCode,
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
      marginBottom: 8,
      marginLeft: -40,
      '& .MuiApi-item-link-visual': {
        display: 'none',
        flexShrink: 0,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
        borderRadius: 8,
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
        height: 26,
        width: 26,
        lineHeight: '30px',
        textAlign: 'center',
        '& svg': {
          fill: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
          height: '14px',
          width: '14px',
        },
      },
      '&>span, &>div': {
        fontWeight: theme.typography.fontWeightRegular,
        // borderBottom: 'solid 1px',
        borderColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      },
      '&>*': {
        height: 26,
      },
      '& .MuiApi-item-title': {
        flexShrink: 0,
        padding: '2px 6px',
        marginLeft: 32,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: 8,
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        // borderBottomLeftRadius: 8,
        fontWeight: theme.typography.fontWeightSemiBold,
        color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      },
      '& .MuiApi-item-description': {
        padding: '4px 6px',
        flexGrow: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        '&.MuiApi-item-description-extended': {
          whiteSpace: 'normal',
          alignSelf: 'start',
          height: 'auto',
        },
      },
      '& .MuiApi-item-extend-description': {
        alignItems: 'center',
        display: 'flex',
        placeItems: 'end',
      },
      '& .MuiApi-item-note': {
        padding: '2px 6px',
        fontSize: 11,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: `var(--muidocs-palette-success-800, ${lightTheme.palette.success[800]})`,
        fontWeight: theme.typography.fontWeightBold,
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
    },
    '& .MuiAlert-standardWarning': {
      padding: '6px 12px',
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-warning-300, ${lightTheme.palette.warning[300]})`,
      borderRadius: 8,
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      marginBottom: 16,
      '.MuiAlert-icon': {
        display: 'flex',
        alignItems: 'center',
        fill: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      },
    },
    '& .prop-list-notes': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      padding: 12,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      borderRadius: 8,
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      marginBottom: 16,
    },
    '& .prop-list-description': {
      marginBottom: 10,
    },
    '& .prop-list-additional-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      '& .prop-list-title': {
        paddingRight: 5,
        whiteSpace: 'nowrap',
        p: {
          ...theme.typography.body2,
          margin: 0,
          fontWeight: theme.typography.fontWeightSemiBold,
        },
      },
      '&>div': { display: 'flex', alignItems: 'baseline' },
    },
    '& .prop-list-default-props': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      code: {
        ...theme.typography.caption,
        fontFamily: theme.typography.fontFamilyCode,
        fontWeight: theme.typography.fontWeightRegular,
        padding: '1px 4px',
        border: '1px solid',
        borderColor: alpha(darkTheme.palette.primary[100], 0.5),
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      },
    },
    '& .prop-list-signature': {
      p: {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        marginBottom: 8,
      },
      ul: {
        paddingLeft: 24,
        marginTop: 2,
        marginBottom: 0,
      },
      '&>code': {
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginBottom: 8,
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[50]})`,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
      },
    },
    // marginBottom: 36,
    // borderBottom: 'solid 1px',
    // borderColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
    '&>hr': {
      margin: '24px 0',
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-item-header': {
        '&>span, &>div': {
          borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        },
        '& .MuiApi-item-title': {
          color: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
          backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
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
      '& .prop-list-additional-info': {
        '& .prop-list-title': {
          p: {
            color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
          },
        },
      },
      '& .prop-list-notes': {
        borderColor: alpha(darkTheme.palette.grey[800], 0.5),
        backgroundColor: alpha(darkTheme.palette.warning[800], 0.2),
        color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
      },
      '& .prop-list-default-props': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
        code: {
          borderColor: alpha(darkTheme.palette.primary[800], 0.4),
          backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
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
  type?: DescriptionType;
  children: React.ReactNode;
};

function ApiItem(props: ApiItemProps) {
  const { title, description, note, children, type, id } = props;
  const descriptionRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflow, setIsOverflow] = React.useState(false);
  const [isExtended, setIsExtended] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      if (descriptionRef.current === null) {
        return;
      }
      setIsOverflow(descriptionRef.current.scrollWidth > descriptionRef.current.offsetWidth);
    };

    handler();

    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <Root ownerState={{ type }}>
      <div id={id} className="MuiApi-item-header">
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

        <span className="MuiApi-item-title">{title}</span>

        <span
          className={`MuiApi-item-description${
            isExtended ? ' MuiApi-item-description-extended' : ''
          }`}
          ref={descriptionRef}
          dangerouslySetInnerHTML={{
            __html: isExtended ? description! : (description ?? '').replace(/<br>/g, ' '),
          }}
          title={(description ?? '')
            .replace(/<br>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&#124;/g, '|')}
        />
        {isOverflow && (
          <div className="MuiApi-item-extend-description">
            <IconButton size="small" onClick={() => setIsExtended((prev) => !prev)}>
              {isExtended ? (
                <KeyboardArrowDownIcon fontSize="small" color="primary" />
              ) : (
                <KeyboardArrowUpIcon fontSize="small" color="primary" />
              )}
            </IconButton>
          </div>
        )}
        {note && <span className="MuiApi-item-note">{note}</span>}
      </div>
      {children}
      <Divider />
    </Root>
  );
}

ApiItem.propTypes = {
  description: PropTypes.string,
  note: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ApiItem;
