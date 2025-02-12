import Rating from '@mui/material/Rating';
import { Rating as MyRating } from '@mui/material';

<Rating
  IconContainerComponent={CustomIconContainer}
/>;
<MyRating
  IconContainerComponent={CustomIconContainer}
/>;
<Rating
  IconContainerComponent={CustomIconContainer}
  slots={{
    root: 'div',
  }}
/>;
<MyRating
  IconContainerComponent={CustomIconContainer}
  slots={{
    ...outerSlots,
  }}
/>;
<Rating
  IconContainerComponent={CustomIconContainer}
  slots={{
    root: 'div',
    iconContainer: SlotContainer,
  }}
/>;

// should skip non MUI components
<NonMuiRating
  IconContainerComponent={CustomIconContainer}
/>;
