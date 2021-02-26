import React from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from 'docs/src/modules/components/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Popover from '@material-ui/core/Popover';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import CheckIcon from 'docs/src/modules/branding/icons/Check';
import CloseIcon from 'docs/src/modules/branding/icons/Close';
import PendingIcon from 'docs/src/modules/branding/icons/Pending';
//PlanFeature Component start
interface PlanFeatuerProps {
  text: any;
  firstText: any;
  secondText: any;
  sx?: object;
  variant: string;
  isBorder: boolean;
  isBold: boolean;
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      left: '135px !important',
      [theme.breakpoints.down('md')]: {
        left: '60px !important',
      },
      [theme.breakpoints.down('sm')]: {
        left: '15px !important',
      },
      overflowX: 'unset',
      overflowY: 'unset',

      '&::before': {
        left: '46px',
        right: 'auto',
        width: '16px',
        height: '16px',
        content: '""',
        position: 'absolute',
        backgroundSize: 'cover',
        bottom: '-6px',
        background: `url(${'/static/branding/pricing/rectangle.svg'})`,
      },
    },
  }),
);

function PlanFeature(props: PlanFeatuerProps) {
  const {
    text = '',
    firstText = '',
    secondText = '',
    sx,
    variant = 'h4',
    isBorder = false,
    isBold = false,
  } = props;

  const classes = useStyles2();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let DynamicTypoSx = isBold
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
      {text ? (
        <Typography
          variant={variant}
          sx={{
            ...sx,
            ...DynamicTypoSx,
            borderBottom: isBorder ? '1px dashed #132F4C' : '',
            display: 'inline-block',
            whiteSpace: { sm: 'normal', xs: 'normal', md: 'nowrap', lg: 'nowrap' },
          }}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {text}
        </Typography>
      ) : (
          <>
            <Typography
              variant={variant}
              sx={{
                ...sx,
                ...DynamicTypoSx,
                borderBottom: isBorder ? '1px dashed #132F4C' : '',
                display: 'inline-block',
                whiteSpace: { sm: 'normal', xs: 'normal', md: 'nowrap', lg: 'nowrap' },
              }}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {firstText}
            </Typography>
            <Typography
              variant={variant}
              sx={{
                ...sx,
                ...DynamicTypoSx,
                borderBottom: isBorder ? '1px dashed #132F4C' : '',
                display: 'inline-block',
                whiteSpace: { sm: 'normal', xs: 'normal', md: 'nowrap', lg: 'nowrap' },
              }}
            >
              {secondText}
            </Typography>
          </>
        )}
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          sx={{
            px: 1.5,
            py: 1.5,
            fontWeight: 'normal',
            fontSize: '14px !important',
            lineHeight: '20px !important',
            color: 'secondary.contrastText',
            bgcolor: 'secondary.main',
            boxShadow: '0px 2px 3px rgba(0, 30, 60, 0.08)',
            borderRadius: '4px',
            width: '270px',
          }}
        >
          Ensure we have enough details in the ticket you submitted so our support team can work on
          it.
        </Typography>
      </Popover>
    </React.Fragment>
  );
}
//PlanFeature Component end

//PlanStatus Component start
interface PlanStatusProps {
  isCheckIcon: boolean;
  isCloseIcon: boolean;
  isPendingIcon: boolean;
  mainText: string;
  bottonText?: string;
}

function PlanStatus(props: PlanStatusProps) {
  const {
    isCheckIcon = false,
    isCloseIcon = false,
    isPendingIcon = false,
    mainText = '',
    bottonText = '',
  } = props;
  return (
    <Box>
      {isCheckIcon ? (
        <CheckIcon
          sx={{ bgcolor: 'rgb(204, 229, 255)', color: 'primary.main', borderRadius: '50%' }}
        />
      ) : isCloseIcon ? (
        <CloseIcon />
      ) : isPendingIcon ? (
        <PendingIcon />
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontSize: { lg: '16px', sm: '16px', xs: '12px' },
            lineHeight: { lg: '24px', sm: '24px', xs: '20px' },
            fontWeight: 'normal',
          }}
        >
          {mainText}
        </Typography>
      )}
      {bottonText ? (
        <Typography
          component="div"
          variant="h5"
          sx={{
            color: 'grey87',
            fontSize: { lg: '14px', sm: '14px', xs: '12px' },
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

//PlanStatus Component end

const StyledTableCell = withStyles((theme) => ({
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
    '&:nth-of-type(4)': {
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
    '&:nth-of-type(4)': {
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(1)': {
      backgroundColor: theme.palette.greyF3,
    },
    '&:nth-of-type(4)': {
      backgroundColor: theme.palette.greyF3,
    },
    '&:nth-of-type(11)': {
      backgroundColor: theme.palette.greyF3,
    },
  },
}))(TableRow);

function createRow(type, essential, pro, premium) {
  return { type, essential, pro, premium };
}

const rows = [
  createRow(<PlanFeature variant="h4" text={'Open source libraries'} isBold={true} />, '', '', ''),
  createRow(
    <PlanFeature text={'@material-ui/core lifetime access'} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/core lifetime updates'} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(<PlanFeature variant="h4" isBold={true} text={'Advanced components'} />, '', '', ''),
  createRow(
    <PlanFeature text={'@material-ui/x'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x Updates'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'1 year'} />,
    <PlanStatus mainText={'1 year'} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x-grid'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x Date range picker'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x Advanced data grid'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'@material-ui/x ...'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(<PlanFeature variant="h4" isBold={true} text={'Support'} />, '', '', ''),
  createRow(
    <PlanFeature text={'Community'} isBorder={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeature firstText={'Bugs reports &'} secondText={'feature requests'} isBorder={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} bottonText={'priority over Community'} />,
    <PlanStatus isCheckIcon={true} bottonText={'priority over Pro'} />,
  ),
  createRow(
    <PlanFeature firstText={'Tehnical'} secondText={' advisory*'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeature text={'Support duration'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'1 year'} />,
    <PlanStatus mainText={'1 year'} />,
  ),
  createRow(
    <PlanFeature firstText={'Support duration'} secondText={' hide text'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'2 business days'} />,
    <PlanStatus mainText={'1 business day'} />,
  ),
  createRow(
    <PlanFeature text={'Pre-screening'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'4 hours'} bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeature text={'Issue escalation'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeature
      text={
        <React.Fragment>
          *Subject to{' '}
          <Box sx={{ display: 'inline-block', borderBottom: '1px solid' }}>fair use policy</Box>
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
  { id: 1, heading: 'Essential', src: '/static/branding/pricing/essential.svg' },
  { id: 2, heading: 'Pro', src: '/static/branding/pricing/pro.svg' },
  { id: 3, heading: 'Premium', src: '/static/branding/pricing/premium.svg' },
];

const useStyles1 = makeStyles({
  root: {
    boxShadow: 'none',
    overflowX: 'initial !important',
  },
});

export default function ComparisonTable() {
  const classes = useStyles1();
  return (
    <TableContainer component={Paper} classes={{ root: classes.root }}>
      <Hidden smUp>
        <Grid container spacing={6} sx={{ textAlign: 'center', px: 1.9, mb: 0, mt: 0 }}>
          {tableHeader.map((header) => (
            <Grid item xs={4} key={header.id} sx={{ pt: 5, pb: 3 }}>
              <Box
                component="img"
                src={header.src}
                loading="lazy"
                alt={header.heading}
                sx={{
                  height: 24,
                  mr: 2,
                }}
              />
              <Typography sx={{ fontWeight: 'bold', fontSize: '19px', lineHeight: '30px' }}>
                {header.heading}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Hidden>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {tableHeader.map((header) => (
              <StyledTableCell align="center" key={header.id}>
                <Box
                  component="img"
                  src={header.src}
                  loading="lazy"
                  alt={header.heading}
                  sx={{ height: 24, mr: 2 }}
                />
                <Box component="span" sx={{ display: { xs: 'block', md: 'block', lg: 'none' } }} />
                {header.heading}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.essential}</StyledTableCell>
              <StyledTableCell align="center">{row.pro}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
