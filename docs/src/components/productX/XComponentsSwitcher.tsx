import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { visuallyHidden } from '@mui/utils';
import { Highlighter } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';
import { ROUTES } from '@mui/internal-core-docs/constants';

function ComponentItem({
  label,
  icon,
  name,
  description,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description?: React.ReactNode;
  href: string;
}) {
  const viewDocsContent = (
    <React.Fragment>
      <span>View the docs</span>{' '}
      <Box component="span" sx={visuallyHidden}>
        {label}
      </Box>
      <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
    </React.Fragment>
  );
  const viewDocsSx = {
    color: 'primary',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 'semiBold',
    '& > svg': { transition: '0.2s' },
    '&:hover > svg': { transform: 'translateX(2px)' },
  };

  return (
    <Box
      component="span"
      sx={{
        flexGrow: 1,
        display: 'flex',
        p: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 1.5,
        minWidth: 0,
      }}
    >
      {icon}
      <Box component="span" sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          variant="body2"
          sx={{ color: 'text.primary', fontWeight: 'bold', display: 'block' }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            component="span"
            variant="body2"
            gutterBottom
            sx={{ color: 'text.secondary', fontWeight: 'regular', display: 'block' }}
          >
            {description}
          </Typography>
        )}
        <Link
          href={href}
          variant="body2"
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.stopPropagation();
          }}
          sx={viewDocsSx}
        >
          {viewDocsContent}
        </Link>
      </Box>
    </Box>
  );
}

export default function XComponentsSwitcher(props: {
  componentIndex: number;
  setComponentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { componentIndex, setComponentIndex } = props;
  const componentElements = [
    {
      element: (
        <ComponentItem
          name="Data Grid"
          label="Fast, feature-rich data table."
          description="Fast, feature-rich data table."
          icon={<PivotTableChartRoundedIcon />}
          href={ROUTES.dataGridOverview}
        />
      ),
    },
    {
      element: (
        <ComponentItem
          name="Date and Time Pickers"
          description="A suite of components for selecting dates, times, and ranges."
          label="A suite of components for selecting dates, times, and ranges."
          icon={<CalendarMonthRoundedIcon />}
          href={ROUTES.datePickersOverview}
        />
      ),
    },
    {
      element: (
        <ComponentItem
          name="Charts"
          description="Data visualization graphs, including bar, line, pie, scatter, and more."
          label="Data visualization graphs, including bar, line, pie, scatter, and more."
          icon={<BarChartRoundedIcon />}
          href={ROUTES.chartsOverview}
        />
      ),
    },
    {
      element: (
        <ComponentItem
          name="Tree View"
          description="Display hierarchical data, such as a file system navigator."
          label="Display hierarchical data, such as a file system navigator."
          icon={<AccountTreeRounded />}
          href={ROUTES.treeViewOverview}
        />
      ),
    },
    {
      element: (
        <ComponentItem
          name="Scheduler"
          description="Event calendar and timeline for scheduling workflows."
          label="Event calendar and timeline for scheduling workflows."
          icon={<EventNoteRoundedIcon />}
          href={ROUTES.schedulerOverview}
        />
      ),
    },
    {
      element: (
        <ComponentItem
          name="Chat"
          description="AI-powered chat components."
          label="AI-powered chat components."
          icon={<ForumRoundedIcon />}
          href={ROUTES.chatOverview}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 1,
        maxWidth: 500,
      }}
    >
      {componentElements.map(({ element }, index) => (
        <Highlighter
          key={index}
          disableBorder
          onClick={() => setComponentIndex(index)}
          selected={componentIndex === index}
          sx={{ minWidth: 0, height: 'auto' }}
        >
          {element}
        </Highlighter>
      ))}
    </Box>
  );
}
