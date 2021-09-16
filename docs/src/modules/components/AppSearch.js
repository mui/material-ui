import '@docsearch/css';
import { DocSearchModal } from '@docsearch/react';
import SearchIcon from '@mui/icons-material/Search';
import GlobalStyles from '@mui/material/GlobalStyles';
import Input from '@mui/material/Input';
import { alpha, styled } from '@mui/material/styles';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import React from 'react';

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : theme.palette.grey[50],
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
    },
    color: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[900],
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: 'pointer',
  };
});

const SearchDiv = styled('div')(({ theme }) => {
  return {
    width: theme.spacing(4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey[700],
  };
});

const StyledInput = styled(Input)(({ theme }) => {
  return {
    color: 'inherit',
    '& input': {
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(4),
      width: 150,
      cursor: 'pointer',
    },
    '&::before, &::after, &:hover:not(.Mui-disabled):before': {
      border: 0,
    },
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[600],
    lineHeight: '21px',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[400] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#FFF',
    padding: theme.spacing(0, 0.7),
    position: 'absolute',
    right: theme.spacing(1),
    height: 23,
    top: 'calc(50% - 11px)',
    borderRadius: 5,
  };
});

export default function AppSearch() {
  const userLanguage = useUserLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  React.useEffect(() => {
    const handleKeyDown = (nativeEvent) => {
      if (nativeEvent.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }

      const matchMainShortcut =
        (nativeEvent.ctrlKey || nativeEvent.metaKey) && nativeEvent.key === 'k';
      const matchNonkeyboardNode =
        ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(document.activeElement.tagName) === -1 &&
        !document.activeElement.isContentEditable;

      if (matchMainShortcut && matchNonkeyboardNode) {
        nativeEvent.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <React.Fragment>
      <RootDiv onClick={() => setIsModalOpen(true)}>
        <SearchDiv>
          <SearchIcon
            fontSize="small"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[500]
                  : theme.palette.primary[500],
            }}
          />
        </SearchDiv>
        <StyledInput placeholder="Search..." />
        <Shortcut>
          {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
          {macOS ? '⌘' : 'Ctrl+'}K
        </Shortcut>
      </RootDiv>
      <GlobalStyles
        styles={(theme) => ({
          html: {
            ':root': {
              '--docsearch-primary-color':
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              '--docsearch-text-color': theme.palette.text.primary,
              '--docsearch-muted-color': theme.palette.grey[600],
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
              '--docsearch-hit-active-color': theme.palette.primary.main,
            },
            '.DocSearch-Container': {
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.pxToRem(14),
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.grey[900], 0.7)
                  : alpha(theme.palette.grey[900], 0.2),
              '& .DocSearch-Help': {
                fontSize: '0.875rem',
              },
              '& .DocSearch-Modal': {
                boxShadow: `0px 4px 20px ${
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.7)
                    : alpha(theme.palette.grey[700], 0.2)
                }`,
                border: '1px solid',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200],
                borderRadius: 10,
                backgroundColor: theme.palette.background.paper,
                '& .DocSearch-SearchBar': {
                  borderBottom: '1px solid',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[200],
                  padding: theme.spacing(1),
                  '& .DocSearch-Form': {
                    backgroundColor: 'inherit',
                    '& .DocSearch-Reset': {
                      display: 'none',
                    },
                    '& .DocSearch-Input': {
                      paddingLeft: theme.spacing(2.5),
                    },
                    '& .DocSearch-Search-Icon': {
                      width: '20px',
                      height: '20px',
                    },
                  },
                  '& .DocSearch-Cancel': {
                    display: 'block',
                    alignSelf: 'center',
                    height: '1.5rem',
                    marginRight: theme.spacing(1),
                    padding: theme.spacing(0.3, 0.8, 0.6, 0.8),
                    fontSize: 0,
                    borderRadius: 5,
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[800]
                        : theme.palette.grey[50],
                    border: '1px solid',
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[600]
                        : theme.palette.grey[300],
                    '&::before': {
                      content: '"esc"',
                      fontSize: theme.typography.pxToRem(13),
                      fontWeight: 700,
                      color: theme.palette.grey[600],
                    },
                  },
                },
                '& .DocSearch-Dropdown': {
                  backgroundColor: 'inherit',
                  '&::-webkit-scrollbar-thumb': {
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[900]
                        : theme.palette.background.paper,
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[700]
                        : theme.palette.grey[500],
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.background.paper,
                  },
                  '& .DocSearch-Hit-source': {
                    top: 'initial',
                    paddingTop: theme.spacing(2),
                    background: theme.palette.background.paper,
                    letterSpacing: '0.5px',
                    fontSize: theme.typography.pxToRem(11),
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: theme.palette.text.secondary,
                  },
                  '& .DocSearch-Hit': {
                    paddingBottom: 0,
                    '&:not(:last-of-type)': {
                      marginBottom: theme.spacing(0.5),
                    },
                  },
                  '& .DocSearch-Hit a': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[900]
                        : theme.palette.grey[50],
                    border: '1px solid transparent',
                    borderRadius: theme.shape.borderRadius,
                    '& .DocSearch-Hit-Container': {
                      '& .DocSearch-Hit-content-wrapper': {
                        paddingLeft: theme.spacing(2),
                        flexDirection: 'column-reverse',
                        '& .DocSearch-Hit-title': {
                          // content -- mismatching classname
                          fontSize: theme.typography.pxToRem(14),
                          color: `${theme.palette.text.secondary} !important`,
                          padding: `${theme.spacing(0.5)} 0`,
                        },
                        '& .DocSearch-Hit-path': {
                          // title  -- mismatching classname
                          fontSize: theme.typography.pxToRem(14),
                          fontWeight: 700,
                          color: `${theme.palette.text.primary} !important`,
                          paddingTop: theme.spacing(0.5),
                        },
                      },
                      '& .DocSearch-Hit-action': {
                        '& .DocSearch-Hit-Select-Icon': {
                          height: '15px',
                          width: '15px',
                        },
                      },
                    },
                  },
                  [`& .DocSearch-Hit[aria-selected='true'] a`]: {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[700]
                        : theme.palette.primary[50],
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[300]
                        : theme.palette.primary[500],
                  },
                  '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                    color: `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary[400]
                        : theme.palette.primary[600]
                    } !important`,
                  },
                },
                '& .DocSearch-Footer': {
                  backgroundColor: 'inherit',
                  borderTop: '1px solid',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[200],
                  '& .DocSearch-Commands': {
                    display: 'none',
                  },
                },
              },
            },
          },
        })}
      />
      {isModalOpen && (
        <DocSearchModal
          apiKey="1d8534f83b9b0cfea8f16498d19fbcab"
          indexName="material-ui"
          searchParameters={{
            facetFilters: ['version:next', facetFilterLanguage],
          }}
          placeholder="Search..."
          transformItems={(items) => {
            return items.map((item) => {
              const parseUrl = document.createElement('a');
              parseUrl.href = item.url;
              return {
                ...item,
                url: `${parseUrl.pathname}${parseUrl.hash}`,
              };
            });
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
}
