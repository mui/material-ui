import React from 'react';
import { withStyles, Theme, experimentalStyled as styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MuiTableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

// PlanFeature Component start
interface PlanFeatuerProps {
  text?: any;
  sx?: object;
  variant?: any;
  isBorder?: number;
  isBold?: number;
  tooltipText?: string;
}

function PlanFeature(props: PlanFeatuerProps) {
  const { text, sx, variant = 'h4', isBorder = 0, isBold = 0, tooltipText = '' } = props;

  const DynamicTypoSx = isBold
    ? {
        fontWeight: 600,
        fontSize: { lg: '20px', sm: '20px', xs: '16px' },
        lineHeight: { lg: '24px', sm: '24px', xs: '20px' },
      }
    : {
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: { lg: '24px', sm: '24px', xs: '20px' },
      };

  return (
    <React.Fragment>
      <Tooltip title={tooltipText !== '' ? tooltipText : text} placement="top-start" arrow>
        <Typography
          component="span"
          variant={variant}
          sx={{
            ...sx,
            ...DynamicTypoSx,
            borderBottom: isBorder ? '1px dashed #132F4C' : '',
            display: 'inline-block',
            whiteSpace: { sm: 'normal', xs: 'normal', md: 'nowrap', lg: 'nowrap' },
          }}
        >
          {text}
        </Typography>
      </Tooltip>
    </React.Fragment>
  );
}
// PlanFeature Component end

// PlanStatus Component start
interface PlanStatusProps {
  isCheckIcon?: number;
  isCloseIcon?: number;
  isPendingIcon?: number;
  mainText?: string;
  bottonText?: string;
}

function PlanStatus(props: PlanStatusProps) {
  const {
    isCheckIcon = 0,
    isCloseIcon = 0,
    isPendingIcon = 0,
    mainText = '',
    bottonText = '',
  } = props;

  return (
    <Box>
      {isCheckIcon ? (
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
      {isCloseIcon ? <CloseIcon /> : ''}
      {isPendingIcon ? <PendingIcon /> : ''}
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

// PlanStatus Component end
const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      verticalAlign: 'middle',
      lineHeight: 'normal',
      fontSize: '0px',
      minWidth: '60px',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '15px 1px',
    },
    '&:nth-of-type(5)': {
      paddingRight: '135px',
      [theme.breakpoints.down('lg')]: {
        paddingRight: '60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '15px',
      },
    },
    border: 0,
  },
  body: {
    verticalAlign: 'top',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '20px',
    [theme.breakpoints.down('lg')]: {
      padding: '15px 1px',
    },
    '&:nth-of-type(1)': {
      paddingLeft: '135px',
      [theme.breakpoints.down('lg')]: {
        paddingLeft: '60px',
        padding: '15px 1px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '15px',
        paddingRight: '1px',
      },
    },
    '&:nth-of-type(5)': {
      paddingRight: '135px',
      [theme.breakpoints.down('lg')]: {
        paddingRight: '60px',
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: '15px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px 1px',
    },
    border: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    '&:nth-of-type(1)': {
      backgroundColor: theme.palette.greyF3,
    },
    '&:nth-of-type(5)': {
      backgroundColor: theme.palette.greyF3,
    },
    '&:nth-of-type(11)': {
      backgroundColor: theme.palette.greyF3,
    },
  },
}))(TableRow);

function createRow(type: any, community: any, pro: any, premium: any) {
  return { type, community, pro, premium };
}

const rows = [
  createRow(<PlanFeature variant="h4" text="Design system" isBold={1} />, '', '', ''),
  createRow(
    <PlanFeature text="@material-ui/core" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(
    <PlanFeature text="@material-ui/unstyled" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(
    <PlanFeature text="@material-ui/system" />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(<PlanFeature variant="h4" isBold={1} text={'Advanced components'} />, '', '', ''),
  createRow(
    <PlanFeature text={'@material-ui/data-grid'} />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x-grid'} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x-grid Updates'} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x Date range picker'} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isPendingIcon={1} />,
    <PlanStatus isPendingIcon={1} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x-grid Advanced'} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isPendingIcon={1} />,
  ),
  createRow(<PlanFeature variant="h4" isBold={1} text={'Support'} />, '', '', ''),
  createRow(
    <PlanFeature text={'Community'} isBorder={1} />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} />,
  ),
  createRow(
    <PlanFeature text="Bugs reports & feature requests" isBorder={1} />,
    <PlanStatus isCheckIcon={1} />,
    <PlanStatus isCheckIcon={1} bottonText={'priority over Community'} />,
    <PlanStatus isCheckIcon={1} bottonText={'priority over Pro'} />,
  ),
  createRow(
    <PlanFeature text="Tehnical advisory*" isBorder={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isPendingIcon={1} />,
  ),
  createRow(
    <PlanFeature text="Support duration" isBorder={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature text="Support duration" isBorder={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus mainText={'2 business days'} />,
    <PlanStatus mainText={'1 business day'} />,
  ),
  createRow(
    <PlanFeature
      text={'Pre-screening'}
      isBorder={1}
      tooltipText={
        'Ensure we have enough details in the ticket you submitted so our support team can work on it.'
      }
    />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus mainText={'4 hours'} bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeature text={'Issue escalation'} isBorder={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isCloseIcon={1} />,
    <PlanStatus isPendingIcon={1} bottonText={'priority only'} />,
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
      variant="h5"
      sx={{ color: 'grey87', fontSize: '14px', lineHeight: '20px', fontWeight: 'normal' }}
    />,
    <Hidden smDown>
      <Button
        component={Link}
        noLinkStyle
        sx={{
          textAlign: 'left',
          lineHeight: 'normal',
          width: { xs: '135px', md: '135px', lg: 'auto' },
        }}
        href="/getting-started/usage/"
        size="medium"
        variant="contained"
        endIcon={<NavigateNextIcon />}
      >
        Get started
      </Button>
    </Hidden>,
    <Hidden smDown>
      <Button
        component={Link}
        noLinkStyle
        sx={{
          textAlign: 'left',
          lineHeight: 'normal',
          width: { xs: '135px', md: '135px', lg: 'auto' },
        }}
        href="/getting-started/usage/"
        size="medium"
        variant="contained"
        endIcon={<NavigateNextIcon />}
      >
        Get started
      </Button>
    </Hidden>,
    <Hidden smDown>
      <Button
        component={Link}
        noLinkStyle
        sx={{
          textAlign: 'left',
          lineHeight: 'normal',
          width: { xs: '135px', md: '135px', lg: 'auto' },
        }}
        href="/getting-started/usage/"
        size="medium"
        variant="contained"
        endIcon={<NavigateNextIcon />}
        color="inherit"
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
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            {tableHeader.map((header) => (
              <StyledTableCell align="center" key={header.heading}>
                <Box
                  component="img"
                  src={header.src}
                  loading="lazy"
                  alt=""
                  {...header.imgProps}
                  sx={{ mr: 2 }}
                />
                <Box component="span" sx={{ display: { xs: 'block', md: 'block', lg: 'none' } }} />
                {header.heading}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.community}</StyledTableCell>
              <StyledTableCell align="center">{row.pro}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
