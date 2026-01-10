import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from '@mui/docs/Link';
import SectionHeadline from '../typography/SectionHeadline';
import GradientText from '../typography/GradientText';
import { COMPANIES, INDUSTRIES, type Industry } from './data/customersData';

function IndustryChip({
  label,
  selected,
  onClick,
}: {
  label: Industry;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      variant={selected ? 'filled' : 'outlined'}
      sx={(theme) => ({
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        borderColor: selected ? 'primary.main' : 'divider',
        backgroundColor: selected ? 'primary.50' : 'transparent',
        color: selected ? 'primary.700' : 'text.secondary',
        '&:hover': {
          backgroundColor: selected ? 'primary.100' : 'action.hover',
          borderColor: selected ? 'primary.main' : 'primary.200',
        },
        ...theme.applyDarkStyles({
          borderColor: selected ? 'primary.600' : 'divider',
          backgroundColor: selected ? 'primary.900' : 'transparent',
          color: selected ? 'primary.200' : 'text.secondary',
          '&:hover': {
            backgroundColor: selected ? 'primary.800' : 'action.hover',
            borderColor: selected ? 'primary.500' : 'primary.700',
          },
        }),
      })}
    />
  );
}

function IndustryTag({ label }: { label: Industry }) {
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={(theme) => ({
        fontSize: '0.75rem',
        height: 24,
        borderColor: 'grey.300',
        color: 'text.secondary',
        ...theme.applyDarkStyles({
          borderColor: 'grey.700',
          color: 'grey.400',
        }),
      })}
    />
  );
}

export default function CustomersIndustryTable() {
  const [selectedIndustry, setSelectedIndustry] = React.useState<Industry>('All');

  const filteredCompanies = React.useMemo(() => {
    if (selectedIndustry === 'All') {
      return COMPANIES;
    }
    return COMPANIES.filter((company) => company.industries.includes(selectedIndustry));
  }, [selectedIndustry]);

  return (
    <Box
      sx={{
        display: 'grid',
        m: 0,
        my: { xs: 6, sm: 6, md: 8, lg: 8 },
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        gap: 4,
        maxWidth: '1350px',
        mx: 'auto',
      }}
    >
      <SectionHeadline
        alwaysCenter
        title={
          <Typography variant="h2" component="h2">
            One UI foundation
            <br />
            for teams <GradientText>in every industry</GradientText>
          </Typography>
        }
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          '& > *': {
            mb: { xs: 1, sm: 0 },
          },
        }}
        useFlexGap
      >
        {INDUSTRIES.map((industry) => (
          <IndustryChip
            key={industry}
            label={industry}
            selected={selectedIndustry === industry}
            onClick={() => setSelectedIndustry(industry)}
          />
        ))}
      </Stack>

      <TableContainer
        sx={(theme) => ({
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          ...theme.applyDarkStyles({
            borderColor: 'primaryDark.700',
            backgroundColor: 'primaryDark.900',
          }),
        })}
      >
        <Table aria-label="companies by industry">
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow
                key={company.name}
                sx={(theme) => ({
                  '&:last-child td': { border: 0 },
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  ...theme.applyDarkStyles({
                    '&:hover': {
                      backgroundColor: 'primaryDark.800',
                    },
                  }),
                })}
              >
                <TableCell
                  sx={{
                    width: { xs: 60, sm: 80, md: 100 },
                    py: 2,
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  <Box
                    component="img"
                    alt={`${company.name} logo`}
                    src={company.logo}
                    sx={(theme) => ({
                      height: { xs: 24, sm: 28, md: 32 },
                      paddingTop: 1,
                      width: 'auto',
                      maxWidth: { xs: 60, sm: 80, md: 100 },
                      objectFit: 'contain',
                      filter: 'brightness(0) saturate(100%)',
                      ...theme.applyDarkStyles({
                        filter:
                          'brightness(0) saturate(100%) invert(93%) sepia(7%) saturate(0%) hue-rotate(84deg) brightness(104%) contrast(111%)',
                      }),
                    })}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    py: 2,
                    px: { xs: 1, sm: 2 },
                    minWidth: { xs: 100, sm: 140 },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {company.name}
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    py: 2,
                    px: { xs: 1, sm: 2 },
                    display: { xs: 'none', sm: 'table-cell' },
                  }}
                >
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {company.industries
                      .filter((ind) => ind !== 'All')
                      .map((industry) => (
                        <IndustryTag key={industry} label={industry} />
                      ))}
                  </Stack>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: 2,
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {company.caseStudySlug ? (
                    <Button
                      component={Link}
                      href={`/customers/${company.caseStudySlug}`}
                      size="small"
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      Read story
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                      variant="text"
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        '&:hover': {
                          color: 'primary.400',
                        },
                      }}
                    >
                      Visit site
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
