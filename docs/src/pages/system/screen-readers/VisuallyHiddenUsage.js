import React from 'react';
import { visuallyHidden } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'none',
    color: 'grey',
    '& label': { marginRight: 10 },
  },
  selected: {
    color: theme.palette.primary.main,
  },
  span: visuallyHidden,
  input: visuallyHidden,
}));

export default function VisuallyHiddenUsage() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('like');

  return (
    <fieldset className={classes.root}>
      <label className={selected === 'like' ? classes.selected : ''} htmlFor="like">
        <ThumbUpIcon onClick={() => setSelected('like')} />
        <span className={classes.span}>Like</span>
      </label>
      <input className={classes.input} type="radio" id="like" value="like" checked={selected === 'like'} />
      <label className={selected === 'smile' ? classes.selected : ''} htmlFor="smile">
        <EmojiEmotionsIcon onClick={() => setSelected('smile')} />
        <span className={classes.span}>Smile</span>
      </label>
      <input className={classes.input} type="radio" id="smile" value="smile" checked={selected === 'smile'} />
      <label className={selected === 'love' ? classes.selected : ''} htmlFor="love">
        <FavoriteIcon onClick={() => setSelected('love')} />
        <span className={classes.span}>Love</span>
      </label>
      <input className={classes.input} type="radio" id="love" value="love" checked={selected === 'love'} />
    </fieldset>
  );
}
