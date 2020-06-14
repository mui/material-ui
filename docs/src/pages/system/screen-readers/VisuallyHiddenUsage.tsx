import React from 'react';
import { visuallyHidden } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import styled, { CSSObject } from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Span = styled.span(visuallyHidden as CSSObject);
const Input = styled.input(visuallyHidden as CSSObject);

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'none',
    color: 'grey',
    '& label': { marginRight: 10 },
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));

export default function VisuallyHiddenUsage() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('like');

  return (
    <fieldset className={classes.root}>
      <label className={selected === 'like' ? classes.selected : ''}>
        <ThumbUpIcon onClick={() => setSelected('like')} />
        <Span>Like</Span>
      </label>
      <Input type="radio" value="like" checked={selected === 'like'} />
      <label className={selected === 'smile' ? classes.selected : ''}>
        <EmojiEmotionsIcon onClick={() => setSelected('smile')} />
        <Span>Smile</Span>
      </label>
      <Input type="radio" value="smile" checked={selected === 'smile'} />
      <label className={selected === 'love' ? classes.selected : ''}>
        <FavoriteIcon onClick={() => setSelected('love')} />
        <Span>Love</Span>
      </label>
      <Input type="radio" value="love" checked={selected === 'love'} />
    </fieldset>
  );
}
