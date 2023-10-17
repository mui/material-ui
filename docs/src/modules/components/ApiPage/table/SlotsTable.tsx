/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { SlotsFormatedParams, getHash } from 'docs/src/modules/components/ApiPage/list/SlotsList';

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
    '& .slot-name': {
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .class-name': {
      padding: '0 4px',
      borderRadius: 5,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
    '& .item-default': {
      padding: '0 4px',
      borderRadius: 5,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
    '& .description-column': {
      width: '40%',
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
      '& .slot-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .class-name': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
      },
      '& .item-default': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-grey-900, ${darkTheme.palette.grey[900]})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
    },
  }),
);

interface SlotsTableProps {
  slots: SlotsFormatedParams[];
}

export default function SlotsTable(props: SlotsTableProps) {
  const { slots } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="table-headers">Slot name</th>
          <th className="table-headers">Class name</th>
          <th className="table-headers">Default</th>
          <th className="table-headers">Description</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((params) => {
          const { description, className, name, defaultValue, componentName } = params;

          return (
            <tr key={className} id={getHash({ componentName, className })}>
              <td className="slot-name" style={{ fontWeight: '600' }}>
                {name}
              </td>
              <td className="MuiApi-table-class-name">
                <span className="class-name">{className}</span>
              </td>
              <td>{defaultValue && <code className="item-default">{defaultValue}</code>}</td>
              <td className="description-column">
                <span
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
