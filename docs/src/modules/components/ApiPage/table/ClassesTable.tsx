/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import {
  ClassesFormatedParams,
  getHash,
} from 'docs/src/modules/components/ApiPage/list/ClassesList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .rule-name': {
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .rule-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
    },
  }),
);

interface ClassesTableProps {
  classes: ClassesFormatedParams[];
}

export default function ClassesTable(props: ClassesTableProps) {
  const { classes } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Rule name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((params) => {
          const { className, cssClassName, description, componentName } = params;

          return (
            <tr key={className} id={getHash({ componentName, className })}>
              <td className="MuiApi-table-global-class">
                <span className="rule-name">{cssClassName}</span>
              </td>
              <td>
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
