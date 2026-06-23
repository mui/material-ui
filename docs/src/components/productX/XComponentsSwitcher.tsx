import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ComponentItem({
  label,
  icon,
  name,
  description,
  href,
  docsLink = true,
}: {
  label: string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description?: React.ReactNode;
  href: string;
  docsLink?: boolean;
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
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        gap: 2.5,
      }}
    >
      {icon}
      <div>
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
        {docsLink ? (
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
        ) : (
          <Typography component="span" variant="body2" sx={viewDocsSx}>
            {viewDocsContent}
          </Typography>
        )}
      </div>
    </Box>
  );
}

export default function XComponentsSwitcher(props: {
  componentIndex: number;
  setComponentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { componentIndex, setComponentIndex } = props;
  const router = useRouter();
  const demoComponentElements = [
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
  ];
  const docsComponentElements = [
    {
      href: ROUTES.schedulerOverview,
      element: (
        <ComponentItem
          name="Scheduler"
          description="Event calendar and timeline for scheduling workflows."
          label="Event calendar and timeline for scheduling workflows."
          icon={<EventNoteRoundedIcon />}
          href={ROUTES.schedulerOverview}
          docsLink={false}
        />
      ),
    },
    {
      href: ROUTES.chatOverview,
      element: (
        <ComponentItem
          name="Chat"
          description="AI-powered chat components."
          label="AI-powered chat components."
          icon={<ForumRoundedIcon />}
          href={ROUTES.chatOverview}
          docsLink={false}
        />
      ),
    },
  ];

  const renderDocsComponent = ({ href, element }: (typeof docsComponentElements)[number]) => (
    <Highlighter
      key={href}
      disableBorder
      onClick={() => {
        void router.push(href);
      }}
      sx={{ textDecoration: 'none' }}
    >
      {element}
    </Highlighter>
  );

  return (
    <React.Fragment>
      <Box
        sx={{ display: { md: 'none' }, maxWidth: 'calc(100vw - 40px)', '& > div': { pr: '32%' } }}
      >
        <SwipeableViews
          index={componentIndex}
          resistance
          enableMouseEvents
          onChangeIndex={(index) => setComponentIndex(index)}
        >
          {demoComponentElements.map(({ element }, index) => (
            <Highlighter
              key={index}
              disableBorder
              onClick={() => setComponentIndex(index)}
              selected={componentIndex === index}
              sx={{
                width: '100%',
                transition: '0.3s',
                transform: componentIndex !== index ? 'scale(0.9)' : 'scale(1)',
              }}
            >
              {element}
            </Highlighter>
          ))}
        </SwipeableViews>
      </Box>
      <Stack spacing={1} useFlexGap sx={{ display: { xs: 'flex', md: 'none' }, mt: 1 }}>
        {docsComponentElements.map(renderDocsComponent)}
      </Stack>
      <Stack spacing={1} useFlexGap sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}>
        {demoComponentElements.map(({ element }, index) => (
          <Highlighter
            key={index}
            disableBorder
            onClick={() => setComponentIndex(index)}
            selected={componentIndex === index}
          >
            {element}
          </Highlighter>
        ))}
        {docsComponentElements.map(renderDocsComponent)}
      </Stack>
    </React.Fragment>
  );
}
