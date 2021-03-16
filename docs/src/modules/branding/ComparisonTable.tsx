import React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Link from 'docs/src/modules/components/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import CheckIcon from 'docs/src/modules/branding/icons/Check';
import CloseIcon from 'docs/src/modules/branding/icons/Close';
import PendingIcon from 'docs/src/modules/branding/icons/Pending';
import Tooltip from '@material-ui/core/Tooltip';

interface PlanFeatuerProps {
  bold?: boolean;
  border?: boolean;
  sx?: object;
  text?: any;
  tooltipText?: string;
  variant?: any;
}

function PlanFeature(props: PlanFeatuerProps) {
  const { text, sx, variant, border = false, bold = false, tooltipText } = props;

  const child = (
    <Typography
      component="span"
      variant={variant || (bold ? 'h5' : 'body2')}
      sx={{
        ...sx,
        borderBottom: border ? '1px dashed #132F4C' : '',
      }}
    >
      {text}
    </Typography>
  );

  return tooltipText ? (
    <Tooltip title={tooltipText} placement="top-start" arrow>
      {child}
    </Tooltip>
  ) : (
    child
  );
}

interface PlanStatusProps {
  bottonText?: string;
  checkIcon?: boolean;
  closeIcon?: boolean;
  mainText?: string;
  pendingIcon?: boolean;
}

function PlanStatus(props: PlanStatusProps) {
  const { bottonText, checkIcon = false, closeIcon = false, mainText, pendingIcon = false } = props;

  return (
    <Box>
      {checkIcon ? (
        <CheckIcon
          sx={{
            bgcolor: 'rgb(204, 229, 255)',
            color: 'primary.main',
            borderRadius: '50%',
            p: 0.5,
            width: '24px',
            height: '24px',
            boxSizing: 'content-box',
          }}
        />
      ) : (
        ''
      )}
      {closeIcon ? <CloseIcon /> : ''}
      {pendingIcon ? <PendingIcon /> : ''}
      {mainText ? (
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '12px', sm: '16px' },
            lineHeight: { xs: '20px', sm: '24px' },
            fontWeight: 'normal',
          }}
        >
          {mainText}
        </Typography>
      ) : (
        ''
      )}
      {bottonText ? (
        <Typography
          component="div"
          variant="h5"
          sx={{
            color: 'grey87',
            fontSize: { xs: '12px', sm: '14px' },
            lineHeight: '20px',
            fontWeight: 'normal',
          }}
        >
          {bottonText}
        </Typography>
      ) : null}
    </Box>
  );
}

const StyledTable = styled(Table)(({ theme }) => ({
  '& .PlanFeature-bold': {
    backgroundColor: theme.palette.greyF3,
  },
  '& .MuiTableCell-root': {
    border: 0,
    '&:nth-of-type(1)': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(13),
      },
    },
    '&:nth-of-type(4)': {
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingRight: theme.spacing(13),
      },
    },
  },
}));

function createRow(type: any, community: any, pro: any, premium: any) {
  return { type, community, pro, premium };
}

const rows = [
  {
    ...createRow(<PlanFeature text="Design system" bold />, '', '', ''),
    className: 'PlanFeature-bold',
  },
  createRow(
    <PlanFeature text="@material-ui/core" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="@material-ui/system" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="@material-ui/unstyled" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  {
    ...createRow(<PlanFeature bold text="Advanced components" />, '', '', ''),
    className: 'PlanFeature-bold',
  },
  createRow(
    <PlanFeature text="@material-ui/data-grid" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="@material-ui/x-grid" />,
    <PlanStatus closeIcon />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="@material-ui/x-grid Updates" />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature text="@material-ui/x Date range picker" />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
    <PlanStatus pendingIcon />,
  ),
  createRow(
    <PlanFeature text="@material-ui/x-grid Advanced" />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
  ),
  { ...createRow(<PlanFeature bold text="Support" />, '', '', ''), className: 'PlanFeature-bold' },
  createRow(
    <PlanFeature text="Community" border />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="Bugs reports & feature requests" border />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon bottonText="priority over Community" />,
    <PlanStatus checkIcon bottonText="priority over Pro" />,
  ),
  createRow(
    <PlanFeature text="Tehnical advisory*" border />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
  ),
  createRow(
    <PlanFeature text="Support duration" border />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature text="Support duration" border />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="2 business days" />,
    <PlanStatus mainText="1 business day" />,
  ),
  createRow(
    <PlanFeature
      text="Pre-screening"
      border
      tooltipText={
        'Ensure we have enough details in the ticket you submitted so our support team can work on it.'
      }
    />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="4 hours" bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeature text="Issue escalation" border />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon bottonText="priority only" />,
  ),
  createRow(
    <PlanFeature
      text={
        <React.Fragment>
          *Subject to{' '}
          <Box component="span" sx={{ borderBottom: '1px solid' }}>
            fair use policy
          </Box>
        </React.Fragment>
      }
      variant="body3"
      sx={{ color: 'grey87' }}
    />,
    <Hidden mdDown>
      <Button
        component={Link}
        noLinkStyle
        href="/getting-started/usage/"
        size="medium"
        variant="contained"
        endIcon={<NavigateNextIcon />}
      >
        Get started
      </Button>
    </Hidden>,
    <Hidden mdDown>
      <Button
        component={Link}
        noLinkStyle
        href="/getting-started/usage/"
        size="medium"
        variant="contained"
        endIcon={<NavigateNextIcon />}
      >
        Get started
      </Button>
    </Hidden>,
    <Hidden mdDown>
      <Button
        component={Link}
        noLinkStyle
        disabled
        href="/getting-started/usage/"
        variant="contained"
        endIcon={<NavigateNextIcon />}
      >
        Get started
      </Button>
    </Hidden>,
  ),
];

const tableHeader = [
  {
    heading: 'Community',
    src: '/static/branding/pricing/community-plan.svg',
    imgProps: { width: 21, height: 24 },
  },
  { heading: 'Pro', src: '/static/branding/pricing/pro.svg', imgProps: { width: 32, height: 24 } },
  {
    heading: 'Premium',
    src: '/static/branding/pricing/premium.svg',
    imgProps: { width: 44, height: 24 },
  },
];

export default function ComparisonTable() {
  return (
    <Box sx={{ mx: 'auto', maxWidth: 1440 }}>
      <Hidden smUp implementation="js">
        <Grid container sx={{ textAlign: 'center', pt: 5, pb: 3 }}>
          {tableHeader.map((header) => (
            <Grid item xs={4} key={header.heading}>
              <Box component="img" src={header.src} loading="lazy" alt="" {...header.imgProps} />
              <Typography variant="h4" component="div" sx={{ fontSize: 19 }}>
                {header.heading}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Hidden>
      <StyledTable aria-label="comparison table">
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeader.map((header) => (
              <TableCell align="center" key={header.heading}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', lg: 'row' },
                    '& img': {
                      mr: { lg: 2 },
                      mb: { sm: 0.5 },
                    },
                  }}
                >
                  <img src={header.src} loading="lazy" alt="" {...header.imgProps} />
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontSize: { xs: 19, md: 24 }, display: { xs: 'none', sm: 'block' } }}
                  >
                    {header.heading}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index) => (
            <TableRow key={index} className={row.className}>
              <TableCell>{row.type}</TableCell>
              <TableCell align="center">{row.community}</TableCell>
              <TableCell align="center">{row.pro}</TableCell>
              <TableCell align="center">{row.premium}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
}
