import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Inbox from '@material-ui/icons/Inbox';
import Social from '@material-ui/icons/Group';
import LocalOffer from '@material-ui/icons/LocalOffer';
import New from '@material-ui/icons/FiberNew';
import Refresh from '@material-ui/icons/Refresh';
import GmailLayout from './modules/layout';
import Tab from './modules/components/tab';

const useStyles = makeStyles(theme => ({
  mailcontent: {
    display: 'inline-flex',
  },
  tabcontent: {
    display: 'inline-flex',
  },
  new: {
    background: 'red',
    color: theme.palette.common.white,
    borderRadius: 6,
    padding: 2,
    fontSize: 10,
    marginLeft: 5,
    height: 18,
  },
}));

function Home() {
  const [value, setValue] = React.useState(0);
  const [allchecked, setAllChecked] = React.useState(false);
  const [indexeschecked, setIndexesChecked] = React.useState([]);
  const classes = useStyles();

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  function handleAllCheckedState(event) {
    setAllChecked(event.target.checked);
  }

  function handleIndexsChecked(idx) {
    return () => {
      const newindexes =
        idx in indexeschecked ? indexeschecked.filter(i => i !== idx) : [...indexeschecked, idx];
      setIndexesChecked(newindexes);
    };
  }

  return (
    <GmailLayout>
      <Checkbox checked={allchecked} onChange={handleAllCheckedState} />
      <Tooltip title="Refresh">
        <IconButton>
          <Refresh />
        </IconButton>
      </Tooltip>
      <Divider />
      <Tabs value={value} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="Primary" icon={<Inbox />} />
        <Tab label="Social" icon={<Social />} />
        <Tab
          label={
            <div className={classes.tabcontent}>
              Promotions<div className={classes.new}>1 new</div>
            </div>
          }
          icon={<LocalOffer />}
        />
      </Tabs>
      <Divider />
      <div>
        <Table>
          <TableBody>
            {[...Array(10).keys()].map((item, idx) => (
              <TableRow hover role="checkbox" key={item} tabIndex={-1}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allchecked || item in indexeschecked}
                    onChange={handleIndexsChecked(item)}
                  />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  {'Lorem ipsum'}
                </TableCell>
                <TableCell>
                  <div className={classes.mailcontent}>
                    {idx in [1, 2, 3] && <New color="error" fontSize="small" />}
                    {`Lorem Ipsum is simply dummy
                         text of the printing and typesetting industry. Lore
                         m Ipsum h
                        `}
                  </div>
                </TableCell>
                <TableCell>8:{15 + item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </GmailLayout>
  );
}

export default Home;
