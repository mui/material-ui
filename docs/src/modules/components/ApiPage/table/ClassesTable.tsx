/* eslint-disable react/no-danger */
import * as React from 'react';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { styled, alpha } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { getHash } from 'docs/src/modules/components/ApiPage/list/ClassesList';
import StyledTableContainer from 'docs/src/modules/components/ApiPage/table/StyledTableContainer';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const StyledTable = styled('table')(
  ({ theme }) => ({
    textAlign: 'left',
    // Override docs/src/modules/components/MarkdownElement styles
    '&&': {
      display: 'table',
      width: '100%',
    },
    '& .class-name': {
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .class-key': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.8),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .class-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .class-key': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
    },
    '& .classes-table-deprecated': {
      '& code ': { all: 'unset' },
    },
    '& .classes-table-alert': {
      padding: '2px 12px',
      marginTop: 12,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
      borderColor: `var(--muidocs-palette-warning-200, ${lightTheme.palette.warning[200]})`,
      '& .MuiAlert-icon': {
        padding: 0,
      },
      '& strong': {
        color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      },
      '&>svg': {
        fill: `var(--muidocs-palette-warning-600, ${lightTheme.palette.warning[600]})`,
      },
      '& a': {
        color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
        '&:hover': {
          textDecorationColor: 'inherit',
        },
      },
    },
  }),
);

interface ClassesTableProps {
  componentName: string;
  classes: ComponentClassDefinition[];
  displayClassKeys?: boolean;
}

export default function ClassesTable(props: ClassesTableProps) {
  const { classes, componentName, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Class name</th>
            {displayClassKeys && <th>Rule name</th>}
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((params) => {
            const { className, key, description, isGlobal, isDeprecated, deprecationInfo } = params;

            return (
              <tr key={className} id={getHash({ componentName, className: key })}>
                <td>
                  <span className="class-name">.{className}</span>
                </td>
                {displayClassKeys && (
                  <td>{!isGlobal && <span className="class-key">{key}</span>}</td>
                )}
                <td>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description || '',
                    }}
                  />
                  {isDeprecated && (
                    <Alert
                      severity="warning"
                      className="classes-table-alert classes-table-deprecated"
                      icon={<WarningRoundedIcon fontSize="small" />}
                      sx={{ mb: 1, py: 0, alignItems: 'center' }}
                    >
                      {t('api-docs.deprecated')}
                      {deprecationInfo && (
                        <React.Fragment>
                          {' - '}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: deprecationInfo,
                            }}
                          />
                        </React.Fragment>
                      )}
                    </Alert>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}
