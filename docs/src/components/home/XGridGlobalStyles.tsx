import * as React from 'react';
import { alpha } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function XGridGlobalStyles({
  selector = 'body',
  pro = false,
}: {
  selector?: string;
  pro?: boolean;
}) {
  return (
    <GlobalStyles
      styles={(theme) => [
        {
          [selector]: {
            '& .MuiDataGrid-root': {
              border: 'none',
              fontSize: '0.75rem',
              borderRadius: '0px',
              '--DataGrid-rowBorderColor': (theme.vars || theme).palette.grey[200],
              // toolbar
              // style GridToolbar
              '& .MuiDataGrid-toolbarContainer': {
                flexShrink: 0,
                padding: theme.spacing(1, 1, 0.5, 1),
                '& > button': {
                  flexShrink: 0,
                  border: '1px solid',
                  padding: theme.spacing(0, 1),
                  borderColor: (theme.vars || theme).palette.divider,
                  '& svg': {
                    fontSize: '1.125rem',
                  },
                },
                '& > button:not(:last-of-type)': {
                  marginRight: theme.spacing(0.5),
                },
              },
              '& .MuiCheckbox-root': {
                color: (theme.vars || theme).palette.grey[600],
                padding: theme.spacing(0.5),
                '& > svg': {
                  fontSize: '1.2rem',
                },
              },
              '& .MuiIconButton-root:not(.Mui-disabled)': {
                color: (theme.vars || theme).palette.primary.main,
                opacity: 1,
              },
              // table head elements
              '& .MuiDataGrid-menuIcon svg': {
                fontSize: '1rem',
              },
              '& .MuiDataGrid-columnSeparator': {
                color: (theme.vars || theme).palette.grey[200],
                '&:hover': {
                  color: (theme.vars || theme).palette.grey[800],
                },
                ...(!pro && { display: 'none' }),
              },
              // -------------------------------
              // table body elements
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: (theme.vars || theme).palette.grey[50],
              },
              '& .MuiDataGrid-editInputCell': {
                fontSize: '0.75rem',
                '& > input': {
                  padding: theme.spacing(0, 1),
                },
              },
              '& .MuiDataGrid-cell--editing': {
                '& .MuiSelect-root': {
                  '& .MuiListItemIcon-root': {
                    display: 'none',
                  },
                  '& .MuiTypography-root': {
                    fontSize: '0.75rem',
                  },
                },
              },
              '& .MuiTablePagination-root': {
                marginRight: theme.spacing(1),
                '& .MuiIconButton-root': {
                  '&:not([disabled])': {
                    color: (theme.vars || theme).palette.primary.main,
                    borderColor: (theme.vars || theme).palette.grey[400],
                  },
                  borderRadius: (theme.vars || theme).shape.borderRadius,
                  padding: theme.spacing(0.5),
                  border: '1px solid',
                  borderColor: (theme.vars || theme).palette.grey[200],
                  '&:last-of-type': {
                    marginLeft: theme.spacing(1),
                  },
                  '& > svg': {
                    fontSize: '1rem',
                  },
                },
              },
            },
            '& .MuiDataGrid-gridMenuList': {
              boxShadow: '0px 4px 20px rgb(61 71 82 / 25%)',
              borderRadius: '10px',
              '& .MuiMenuItem-root': {
                fontSize: '0.75rem',
              },
            },
          },
        },
        theme.applyDarkStyles({
          [selector]: {
            '& .MuiDataGrid-root': {
              '--DataGrid-rowBorderColor': alpha(theme.palette.primaryDark[500], 0.5),
              '& .MuiDataGrid-toolbarContainer': {
                '& > button': {
                  borderColor: (theme.vars || theme).palette.divider,
                },
              },
              '& .MuiCheckbox-root': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiIconButton-root:not(.Mui-disabled)': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiDataGrid-columnSeparator': {
                color: (theme.vars || theme).palette.primaryDark[400],
                '&:hover': {
                  color: (theme.vars || theme).palette.primaryDark[100],
                },
              },
              // -------------------------------
              // table body elements
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              },
              '& .MuiTablePagination-root': {
                '& .MuiIconButton-root': {
                  '&:not([disabled])': {
                    color: (theme.vars || theme).palette.primaryDark[100],
                    borderColor: (theme.vars || theme).palette.primaryDark[400],
                  },
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            },
          },
        }),
      ]}
    />
  );
}
