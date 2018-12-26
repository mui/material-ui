export default ({ primary, white }) => ({
  MuiCard: {
    root: {
      textAlign: 'left',
      '& .card-content__root': {
        padding: '16px 20px 20px',
      },
      '& .card-media--wide-screen': {
        paddingTop: '56.5%',
      },
      '& .card-action-area__root': {
        width: '100%',
      },
      '& .card-actions--contained': {
        padding: 0,
        margin: 0,
        '& .card-actions__action': {
          margin: 0,
          paddingTop: 12,
          paddingBottom: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      },
      '&.card__root--actionable': {
        '& .card-content__root': {
          minHeight: 148,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& *': {
            color: primary.main,
          },
          '& .icon__root': {
            fontSize: 40,
          },
        },
      },
      '&.card__root--contained': {
        minHeight: 256,
        transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&.card__root--space-grey': {
          background: '#303e45',
        },
        '&.card__root--dark-blue': {
          background: '#172568',
        },
        '&:hover': {
          boxShadow:
            '0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)',
        },
        '& .card-media__root': {
          borderBottom: '1px solid rgba(255,255,255,.2)',
        },
        '& .text__root': {
          fontWeight: 200,
        },
        '& *': {
          color: white.text,
        },
      },
    },
  },
});
