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
import PlanStatus from './PlanStatus';
import Popover from '@material-ui/core/Popover';

//PlanFeatuer Component start
interface PlanFeatuerProps {
  text: string;
  // sx?: object;
  variant: string;
  isBorder: boolean;
  isBold: boolean;
}
function PlanFeatuer(props: PlanFeatuerProps) {
  const { text, variant = 'h4', isBorder = false, isBold = false } = props;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      // typography: {
      //   padding: theme.spacing(2),
      // },
      popover: {
        pointerEvents: 'none',
      },
      root: {
        //  position: 'relative',
      },
      paper: {
        left: '136px !important',
        // marginBottom:'10px',
        overflowX: 'unset',
        overflowY: 'unset',

        '&::before': {
          content: '""',
          position: 'absolute',
          // marginRight: "-0.71em",
          bottom: 0,
          width: 10,
          height: 10,
          right: 'auto',
          left: '50px',
          backgroundColor: '#001e3c',
          boxShadow: theme.shadows[1],
          transform: 'translate(-50%, 50%) rotate(135deg)',
          clipPath: 'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
        },
      },
    }),
  );

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let sx = isBold
    ? {
        fontWeight: 600,
        fontSize: { lg: '20px', sm: '20px', xs: '16px' },
        lineHeight: { lg: '24px', sm: '24px', xs: '20px' },
        paddingTop: '4px',
        paddingBottom: '4px',
      }
    : {
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: { lg: '24px', sm: '24px', xs: '20px' },
      };

  return (
    <React.Fragment>
      <Typography
        variant={variant}
        sx={{
          ...sx,
          borderBottom: isBorder ? '1px dashed #132F4C' : '',
          display: 'inline-block',
        }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {text}
      </Typography>
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
//PlanFeatuer Component end

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0px',
    },
    '&:nth-of-type(4)': {
      paddingRight: '135px',

      [theme.breakpoints.down('md')]: {
        paddingRight: '60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '15px',
      },
    },
    border: 0,
  },
  body: {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '20px',

    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
    '&:nth-of-type(1)': {
      paddingLeft: '135px',
      [theme.breakpoints.down('md')]: {
        paddingLeft: '60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '15px',
      },
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
  createRow(<PlanFeatuer variant="h4" text={'Open source libraries'} isBold={true} />, '', '', ''),
  createRow(
    <PlanFeatuer text={'@material-ui/core lifetime access'} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/core lifetime updates'} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(<PlanFeatuer variant="h4" isBold={true} text={'Advanced components'} />, '', '', ''),
  createRow(
    <PlanFeatuer text={'@material-ui/x'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/x Updates'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'1 year'} />,
    <PlanStatus mainText={'1 year'} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/x-grid'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/x Date range picker'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/x Advanced data grid'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'@material-ui/x ...'} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(<PlanFeatuer variant="h4" isBold={true} text={'Support'} />, '', '', ''),
  createRow(
    <PlanFeatuer text={'Community'} isBorder={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'Bugs reports & feature requests'} isBorder={true} />,
    <PlanStatus isCheckIcon={true} />,
    <PlanStatus isCheckIcon={true} bottonText={'priority over Community'} />,
    <PlanStatus isCheckIcon={true} bottonText={'priority over Pro'} />,
  ),
  createRow(
    <PlanFeatuer text={'Tehnical advisory*'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} />,
  ),
  createRow(
    <PlanFeatuer text={'Support duration'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'1 year'} />,
    <PlanStatus mainText={'1 year'} />,
  ),
  createRow(
    <PlanFeatuer text={'Support duration hide text'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'2 business days'} />,
    <PlanStatus mainText={'1 business day'} />,
  ),
  createRow(
    <PlanFeatuer text={'Pre-screening'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus mainText={'4 hours'} bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeatuer text={'Issue escalation'} isBorder={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isCloseIcon={true} />,
    <PlanStatus isPendingIcon={true} bottonText={'priority only'} />,
  ),
  createRow(
    <PlanFeatuer
      text={
        <React.Fragment>
          *Subject to{' '}
          <Box sx={{ display: 'inline-block', borderBottom: '1px solid' }}>fair use policy</Box>
        </React.Fragment>
      }
      variant="h5"
      sx={{ color: '#8796A5', fontSize: '14px', lineHeight: '20px', fontWeight: 'normal' }}
    />,
    <Button
      component={Link}
      noLinkStyle
      href="/getting-started/usage/"
      size="medium"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { xs: 'none' } }}
    >
      Get started
    </Button>,
    <Button
      component={Link}
      noLinkStyle
      href="/getting-started/usage/"
      size="medium"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { xs: 'none' } }}
    >
      Get started
    </Button>,
    <Button
      component={Link}
      noLinkStyle
      href="/getting-started/usage/"
      size="medium"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { xs: 'none' } }}
    >
      Get started
    </Button>,
  ),
];

const tableHeader = [
  { id: 1, heading: 'Community', src: '/static/branding/pricing/essential.svg' },
  { id: 2, heading: 'Pro', src: '/static/branding/pricing/pro.svg' },
  { id: 3, heading: 'Premium', src: '/static/branding/pricing/premium.svg' },
];

export default function ComparisonTable() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
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
                  sx={{
                    height: 24,
                    mr: 2,
                  }}
                />
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
