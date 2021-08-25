import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import SvgHamburgerMenu from 'docs/src/icons/SvgHamburgerMenu';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

const Anchor = styled('a')<{ component?: React.ElementType; noLinkStyle?: boolean }>(
  ({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: 700,
    textDecoration: 'none',
    border: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create('background'),
    '&:hover, &:focus': {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  }),
);

const UList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const PRODUCTS = [
  {
    name: 'Core',
    description: 'Ready to use, forever free, foundational components.',
    href: ROUTES.productCore,
  },
  {
    name: 'Advanced',
    description: 'Powerful and robust components for your complex apps.',
    href: ROUTES.productAdvanced,
  },
  {
    name: 'Templates',
    description: 'Fully built, out-of-the-box, templates for your application.',
    href: ROUTES.productTemplates,
  },
  {
    name: 'Design Kits',
    description: 'Our components available in your favorite design tool.',
    href: ROUTES.productDesignKits,
  },
];

export default function HeaderNavDropdown() {
  const [open, setOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(true);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <React.Fragment>
      <IconButton
        aria-label="Menu"
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen((value) => !value)}
        sx={{
          position: 'relative',
          p: '11px',
          borderRadius: 1,
          border: '1px solid',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'transparent'),
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
          '& svg': { width: 21, height: 21 },
          '&:focus': {
            boxShadow: (theme) =>
              `0 0 0 1px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.grey[200]
              }`,
          },
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <SvgHamburgerMenu />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          if (hambugerRef.current && !hambugerRef.current.contains(event.target as Node)) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: '0 15px 10px -5px rgb(90 105 120 / 10%)',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              p: 2.5,
              bgcolor: 'background.paper',
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            }}
          >
            <UList>
              {FEATURE_TOGGLE.nav_products && (
                <li>
                  <Anchor
                    as="button"
                    onClick={() => setProductsOpen((bool) => !bool)}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    Products
                    <KeyboardArrowDownRounded
                      color="primary"
                      sx={{
                        transition: '0.3s',
                        transform: productsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                      }}
                    />
                  </Anchor>
                  <Collapse in={productsOpen}>
                    <UList
                      sx={{
                        borderLeft: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                        pl: 1,
                        pb: 1,
                        ml: 1,
                      }}
                    >
                      {PRODUCTS.map((item) => (
                        <li key={item.name}>
                          <Anchor
                            href={item.href}
                            as={Link}
                            noLinkStyle
                            sx={{ flexDirection: 'column', alignItems: 'initial' }}
                          >
                            <div>{item.name}</div>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Anchor>
                        </li>
                      ))}
                    </UList>
                  </Collapse>
                </li>
              )}
              <li>
                <Anchor href={ROUTES.documentation} as={Link} noLinkStyle>
                  Docs
                </Anchor>
              </li>
              <li>
                <Anchor href={ROUTES.pricing} as={Link} noLinkStyle>
                  Pricing
                </Anchor>
              </li>
              <li>
                <Anchor href={ROUTES.about} as={Link} noLinkStyle>
                  About us
                </Anchor>
              </li>
            </UList>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </React.Fragment>
  );
}
