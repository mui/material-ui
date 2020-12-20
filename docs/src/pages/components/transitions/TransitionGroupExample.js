import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

export default function TransitionGroupExample() {
  const classes = useStyles();
  const predefinedFruits = [
    'Apples',
    'Bananas',
    'Mangoes',
    'Papaya',
    'Watermelon',
    'Coconut',
  ];

  const [fruitsInBasket, setFruitsInBasket] = React.useState(
    predefinedFruits.slice(0, 3),
  );

  const handleAddFruit = () => {
    const nextHiddenItem = predefinedFruits.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
  };

  const handleRemoveFruit = (item) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        disabled={fruitsInBasket.length >= predefinedFruits.length}
        onClick={handleAddFruit}
      >
        Add fruit to basket
      </Button>
      <List className={classes.root}>
        <TransitionGroup>
          {fruitsInBasket.map((item) => (
            <Collapse key={item} in>
              <ListItem>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge={'end'}
                    aria-label="delete"
                    onClick={() => handleRemoveFruit(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
