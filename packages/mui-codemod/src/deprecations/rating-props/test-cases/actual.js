import Rating from '@mui/material/Rating';
import { Rating as MyRating } from '@mui/material';

<Rating IconContainerComponent={CustomIconContainer} />;
<MyRating IconContainerComponent={CustomIconContainer} />;
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
  slotProps={{
    icon: {
      id: 'my-rating-icon',
    },
  }}
/>;

// should skip non MUI components
<NonMuiRating IconContainerComponent={CustomIconContainer} />;
