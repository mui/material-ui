/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { CSSFormatedParams, getHash } from 'docs/src/modules/components/ApiPage/list/CSSList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .table-headers': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& tr': {
      scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      '&:hover': {
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.5),
      },
    },
    '& .MuiApi-table-rule-name': {
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .MuiApi-table-ruleName': {
      padding: '0 4px',
      borderRadius: 5,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    },
    '& .MuiApi-table-global-class': {
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .MuiCssTable-description-column': {
      width: '50%',
      paddingRight: 8,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& tr': {
        '&:hover': {
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
        },
      },
      '& .MuiApi-table-ruleName': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
      '& .MuiApi-table-global-class': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
    },
  }),
);

interface CSSTableProps {
  classes: CSSFormatedParams[];
}

export default function CSSTable(props: CSSTableProps) {
  const { classes } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="table-headers">Global class</th>
          <th className="table-headers">Rule name</th>
          <th className="table-headers">Description</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((params) => {
          const { componentName, className, selector, description } = params;

          return (
            <tr key={className} id={getHash({ componentName, className })}>
              <td>
                {
                  <span
                    className="MuiApi-table-global-class"
                    dangerouslySetInnerHTML={{
                      __html: selector || '',
                    }}
                  />
                }
              </td>
              <td>
                <span className="MuiApi-table-ruleName">{className}</span>
              </td>

              <td className="MuiCssTable-description-column">
                <span
                  className="MuiApi-table-description"
                  dangerouslySetInnerHTML={{
                    __html: description || '',
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
