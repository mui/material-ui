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
        name="checkedA"
        inputProps={{ 'aria-label': 'favorite checkbox' }}
      />
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        name="checkedB"
        inputProps={{ 'aria-label': 'bookmarked checkbox' }}
      />
    </div>
  );
}
