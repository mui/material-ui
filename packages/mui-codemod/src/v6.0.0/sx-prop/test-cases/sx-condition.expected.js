<Card
  {...otherProps}
  ref={ref}
  key={it.wcId}
  data-p={it.performance / 100}
  variant="outlined"
  sx={[{
    gap: '0.25rem',
    textDecoration: 'none',
    borderRadius: 0.75,
    background:
      'linear-gradient(45deg, rgba(235, 245, 255, 0.30) 40%, rgba(243, 246, 249, 0.20) 100%)',
    transition: 'all 200ms ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#99CCFF',
      boxShadow: '0px 4px 16px #DAE2ED',
      transition: 'all 200ms ease-in-out !important',
    }
  }, (horizontal ? {
        display: 'flex',
        flexDirection: 'row',
        pr: 1,
      } : {
        display: 'flex',
        flexDirection: 'column',
        pb: 0.5,
      })]}
  onClick={(event) => {
    event.preventDefault();
    navigate(href);
  }}
>
  <Box
    component={Link}
    to={href}
    sx={[{
      position: 'relative',
      aspectRatio: '100/55'
    }, (horizontal ? {
          maxWidth: '50vw',
          height: {
            sm: '150px',
            md: '170px',
            lg: '210px',
            xl: '250px',
          },
        } : {
          width: '100%',
        })]}
  >
    <ResponsiveImage
      sizes={imageSizes}
      loading={imageLoading}
      src={it.images[0]?.src}
      alt={it.name}
      style={{
        aspectRatio: '100/55',
        ...(horizontal
          ? {
              width: 'auto',
              height: '100%',
            }
          : {
              width: '100%',
              height: 'auto',
            }),
      }}
    />
    <NoSsr>
      {productOffer && productOffer.ui?.itemCard && (
        <PromoBanner
          style={{
            ...defaultPromoCodeStyles,
            ...productOffer.style,
            ...productOffer.ui?.itemCard?.style,
          }}
        >
          {productOffer.offerText}
        </PromoBanner>
      )}
    </NoSsr>
  </Box>
  <Stack
    direction="column"
    sx={[{
      flex: 1
    }, (horizontal ? { py: 1.5, px: 1.5 } : { px: 1, pb: 0.5 })]}
  ></Stack>
</Card>;
