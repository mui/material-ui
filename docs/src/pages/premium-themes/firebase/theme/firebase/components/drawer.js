export default ({
  TEXT,
  ICON,
  LIST,
  LIST_ITEM,
  LIST_ITEM_TEXT,
  LIST_ITEM_ICON,
  drawer,
  primary,
  white,
}) => ({
  MuiDrawer: {
    paper: {
      minWidth: 256,
      background: '#18202c',
      [`& *, & .${TEXT.root}`]: {
        color: white.primary,
      },
      [`& .${LIST.root}`]: {
        padding: 0,
      },
      [`& .${LIST_ITEM.header}, .${LIST_ITEM.headerActionable}`]: {
        minHeight: 48,
        background: drawer.header,
        boxShadow: '0 -1px 0 #404854 inset',
      },
      [`& .${LIST_ITEM.headerActionable}`]: {
        minHeight: 56,
        [`&:hover`]: {
          background: 'rgba(255,255,255,.08)',
        },
        [`&.${LIST_ITEM.active}`]: {
          [`& .${LIST_ITEM_ICON.subcategory} *, .${
            LIST_ITEM_TEXT.subcategory
          } .${LIST_ITEM_TEXT.primary}`]: {
            color: primary.light,
          },
        },
      },
      [`& .drawer__header-logo`]: {
        width: 28,
        height: 28,
        marginLeft: -4,
      },
      [`& .drawer__header-label`]: {
        height: 18,
        marginLeft: 12,
      },
      [`& .drawer__category-container`]: {
        paddingBottom: 24,
        boxShadow: '0 -1px 0 #404854 inset',
      },
      [`& .${LIST_ITEM.category}`]: {
        padding: '20px 24px',
        [`& .${LIST_ITEM_TEXT.primary}`]: {
          color: white.text,
          letterSpacing: 1,
          fontSize: 14,
          fontFamily: "'Google Sans',sans-serif",
        },
      },
      [`& .${LIST_ITEM.subcategory}`]: {
        padding: '6px 24px',
        [`&:hover`]: {
          background: 'rgba(255,255,255,.08)',
        },
        [`& .${LIST_ITEM_ICON.root}`]: {
          [`& .${ICON.root}`]: {
            fontSize: 20,
          },
          margin: 0,
        },
        [`& .${LIST_ITEM_TEXT.primary}`]: {
          color: white.primary,
          fontSize: 13,
          letterSpacing: 0.5,
        },
      },
      [`& .${LIST_ITEM.subcategory}.${LIST_ITEM.active}`]: {
        [`& *, & .${LIST_ITEM_TEXT.primary}`]: {
          color: primary.light,
        },
      },
    },
  },
});
