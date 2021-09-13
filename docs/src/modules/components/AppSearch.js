import React from 'react';
import { DocSearch, DocSearchModal } from '@docsearch/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import '@docsearch/css';
import { styled, alpha } from '@mui/material/styles';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

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
    color: theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[700],
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
              color:
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
                  ? theme.palette.primaryDark[400]
                  : theme.palette.primary[500],
              '--docsearch-text-color': theme.palette.text.primary,
              '--docsearch-muted-color': theme.palette.text.secondary,
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
            },
            '.DocSearch-Container': {
              fontFamily: theme.typography.fontFamily,
              backgroundColor: 'rgba(32,38,45,0.2)',
              '& .DocSearch-Modal': {
                boxShadow: `0px 4px 20px ${
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.72)
                    : 'rgba(170, 180, 190, 0.3)'
                }`,
                border: '1px solid',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[400]
                    : theme.palette.grey[200],
                borderRadius: 10,
                backgroundColor: theme.palette.background.paper,
                '& .DocSearch-SearchBar': {
                  borderBottom: '1px solid',
                  borderColor: theme.palette.grey[200],
                  paddingBottom: theme.spacing(1),
                  '& .DocSearch-Form': {
                    backgroundColor: 'inherit',
                    '& .DocSearch-Reset': {
                      display: 'none',
                    },
                    '& .DocSearch-Input': {
                      paddingLeft: theme.spacing(2.5),
                    },
                  },
                  '& .DocSearch-Cancel': {
                    display: 'block',
                    alignSelf: 'center',
                    height: '1.5rem',
                    marginRight: theme.spacing(1),
                    padding: '.15rem .40rem',
                    fontSize: 0,
                    borderRadius: 7,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.grey[200],
                    '&::before': {
                      content: '"esc"',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    },
                  },
                },
              },
              '& .DocSearch-Dropdown': {
                backgroundColor: 'inherit',
                '&::before': {
                  padding: `${theme.spacing(2)} ${theme.spacing(1.5)}`,
                  display: 'block',
                  content: '"Results:"',
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[400]
                      : theme.palette.grey[800],
                },
                '& .DocSearch-Hit a': {
                  backgroundColor: 'inherit',
                  border: '1px solid transparent',
                  borderBottomColor: theme.palette.grey[100],
                },
                [`& .DocSearch-Hit[aria-selected='true'] a`]: {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[600]
                      : theme.palette.primary[50],
                  borderRadius: 10,
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[100]
                      : theme.palette.primary[400],
                },
                '& .DocSearch-Hit-Container': {
                  padding: `${theme.spacing(4)} 0`,
                },
                '& .DocSearch-Hit-content-wrapper': {
                  paddingLeft: theme.spacing(2),
                  '& .DocSearch-Hit-title': {
                    color: `${theme.palette.text.primary} !important`,
                    padding: `${theme.spacing(0.5)} 0`,
                  },
                  '& .DocSearch-Hit-path': {
                    color: `${theme.palette.text.secondary} !important`,
                    padding: `${theme.spacing(0.5)} 0`,
                  },
                },
                '& .DocSearch-Hit-icon, & .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                  color: `${
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[400]
                      : theme.palette.primary[500]
                  } !important`,
                },
                '& .DocSearch-Hit-action': {
                  marginRight: theme.spacing(1),
                },
                '& .DocSearch-Hit-source': {
                  display: 'none',
                },
              },
              '& .DocSearch-Footer': {
                backgroundColor: 'inherit',
                '& .DocSearch-Commands': {
                  display: 'none',
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
        />
      )}
    </React.Fragment>
  );
}
