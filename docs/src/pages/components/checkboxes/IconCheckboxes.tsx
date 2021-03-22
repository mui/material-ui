import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

export default function IconCheckboxes() {
  return (
    <div>
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        inputProps={{ 'aria-label': 'favorite' }}
      />
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        inputProps={{ 'aria-label': 'bookmarked' }}
      />
    </div>
  );
}
