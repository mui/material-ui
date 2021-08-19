<div>
  <Badge overlap="circular" />
  <Badge overlap="rectangular" />
  <Badge
    classes={{
      anchorOriginTopRightRectangular: 'className',
      anchorOriginBottomRightRectangular: 'className',
      anchorOriginTopLeftRectangular: 'className',
      anchorOriginBottomLeftRectangular: 'className',
      anchorOriginTopRightCircular: 'className',
      anchorOriginBottomRightCircular: 'className',
      anchorOriginTopLeftCircular: 'className',
    }}
  />
  <Box
    sx={{
      '& .MuiBadge-circular, & .MuiBadge-rectangular': {},
      '& .MuiBadge-anchorOriginTopRightRectangular': {},
      '& .MuiBadge-anchorOriginBottomRightRectangular': {},
      '& .MuiBadge-anchorOriginTopLeftRectangular': {},
      '& .MuiBadge-anchorOriginBottomLeftRectangular': {},
      '& .MuiBadge-anchorOriginTopRightCircular': {},
      '& .MuiBadge-anchorOriginBottomRightCircular': {},
      '& .MuiBadge-anchorOriginTopLeftCircular': {},
      '& .MuiBadge-anchorOriginBottomLeftCircular': {},
    }}
  />
  <Badge
    classes={{
      ...badgeClasses,
      badge: badgeClasses.badge,
    }}
  >
    {icon}
  </Badge>
</div>;
