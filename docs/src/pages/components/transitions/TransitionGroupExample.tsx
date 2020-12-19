import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Collapse, Grid, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { TransitionGroup } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
    },
    itemText: {
      marginLeft: theme.spacing(2),
    },
    paper: {
      margin: theme.spacing(0.5, 0),
    },
    textField: {
      width: '100%',
    },
  }),
);

export default function TransitionGroupExample() {
  const classes = useStyles();
  const [items, setItems] = React.useState(['Apples', 'Bananas', 'Mangoes']);
  const [newItem, setNewItem] = React.useState<string>('');

  const handleAddItem = () => {
    if (!newItem) return;
    setItems((prev) => [...prev, newItem]);
    setNewItem('');
  };

  const handleRemoveItem = (item: string) => {
    setItems((prev) => [...prev.filter((i) => i !== item)]);
  };

  return (
    <div>
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs>
          <TextField
            label="New item"
            variant="standard"
            className={classes.textField}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </Grid>
        <Grid item>
          <IconButton aria-label="add" onClick={() => handleAddItem()}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <TransitionGroup>
        {items.map((item) => (
          <Collapse key={item} in>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography noWrap className={classes.itemText}>
                    {item}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        ))}
      </TransitionGroup>
    </div>
  );
}
