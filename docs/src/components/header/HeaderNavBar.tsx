import * as React from 'react';
import { styled, alpha, Theme } from '@mui/material/styles';
import { unstable_debounce as debounce } from '@mui/utils';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import ProductMenuItem from 'docs/src/components/action/ProductMenuItem';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import SvgBaseUiLogo from 'docs/src/icons/SvgBaseUiLogo';
import SvgPigmentLogo from 'docs/src/icons/SvgPigmentLogo';
import SvgToolpadLogo from 'docs/src/icons/SvgToolpadLogo';

const Navigation = styled('nav')(({ theme }) => [
  {
    '& > div': {
      cursor: 'default',
    },
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.text.secondary,
      fontWeight: theme.typography.fontWeightSemiBold,
      '& > a, & > button': {
        display: 'inline-block',
        color: 'inherit',
        font: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing('6px', '8px'),
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid transparent',
        '&:hover': {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: (theme.vars || theme).palette.grey[50],
          borderColor: (theme.vars || theme).palette.grey[100],
          '@media (hover: none)': {
            backgroundColor: 'initial',
            // Reset on touch devices, it doesn't add specificity
          },
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
          outlineOffset: '2px',
        },
      },
    },
  },
  theme.applyDarkStyles({
    '& li': {
      '& > a, & > button': {
        '&:hover': {
          color: (theme.vars || theme).palette.primary[50],
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.8),
          borderColor: (theme.vars || theme).palette.divider,
        },
      },
    },
  }),
]);

const PRODUCT_IDS = [
  'product-material',
  'product-base',
  'product-pigment',
  'product-toolpad',
  'product-advanced',
  'product-joy',
  'product-templates',
  'product-design',
];

const logoColor = (theme: Theme) => ({
  '& path': {
    ...theme.applyDarkStyles({
      fill: (theme.vars || theme).palette.primary[400],
    }),
  },
});

export default function HeaderNavBar() {
  // const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'products' | 'docs'>(null);
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const productsMenuRef = React.useRef<HTMLButtonElement>(null);
  // const docsMenuRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (typeof subMenuIndex === 'number') {
      document.getElementById(PRODUCT_IDS[subMenuIndex])?.focus();
    }
  }, [subMenuIndex]);

  function handleKeyDown(event: React.KeyboardEvent) {
    let menuItem;

    if (subMenuOpen === 'products') {
      menuItem = productsMenuRef.current!;
    } else {
      return;
    }

    const columns = 2;
    const totalItems = PRODUCT_IDS.length;

    if (event.key === 'ArrowDown' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        return (prevValue + columns) % totalItems;
      });
    }
    if (event.key === 'ArrowUp' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        return (prevValue - columns + totalItems) % totalItems;
      });
    }
    if (event.key === 'ArrowRight' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        return (prevValue + 1) % totalItems;
      });
    }
    if (event.key === 'ArrowLeft' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        return (prevValue - 1 + totalItems) % totalItems;
      });
    }
    if (event.key === 'Escape' || event.key === 'Tab') {
      menuItem.focus();
      setSubMenuOpen(null);
      setSubMenuIndex(null);
    }
  }

  const handleToggle = () => {
    setSubMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (productsMenuRef.current && productsMenuRef.current.contains(event.target)) {
      return;
    }
    setSubMenuOpen(false);
  };

  const setSubMenuOpenDebounced = React.useMemo(
    () => debounce(setSubMenuOpen, 40),
    [setSubMenuOpen],
  );

  const setSubMenuOpenUndebounce = (value: typeof subMenuOpen) => () => {
    setSubMenuOpenDebounced.clear();
    setSubMenuOpen(value);
  };

  React.useEffect(() => {
    return () => {
      setSubMenuOpenDebounced.clear();
    };
  }, [setSubMenuOpenDebounced]);

  return (
    <Navigation>
      <ul ref={navRef} onKeyDown={handleKeyDown}>
        <li
          onMouseEnter={setSubMenuOpenUndebounce('products')}
          onFocus={setSubMenuOpenUndebounce('products')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={setSubMenuOpenUndebounce(null)}
        >
          <ButtonBase
            ref={productsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen ? 'true' : 'false'}
            onClick={handleToggle}
            aria-controls={subMenuOpen ? 'products-popper' : undefined}
          >
            Products
          </ButtonBase>
          <Popper
            id="products-popper"
            open={subMenuOpen}
            anchorEl={productsMenuRef.current}
            transition
            placement="bottom-start"
            style={{ zIndex: 1200 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    mt: 1,
                    minWidth: 498,
                    overflow: 'clip',
                    boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.15)}`,
                    ...theme.applyDarkStyles({
                      bgcolor: 'primaryDark.900',
                      boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                    }),
                  })}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      component="div"
                      sx={{
                        p: 1,
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: 'repeat(1, minmax(0, 1fr))',
                          sm: 'repeat(2, minmax(0, 1fr))',
                        },
                        gap: '4px',
                      }}
                    >
                      <ProductMenuItem
                        id={PRODUCT_IDS[0]}
                        href={ROUTES.productMaterial}
                        icon={<SvgMuiLogomark height={20} width={20} sx={logoColor} />}
                        name="Material UI"
                        description="Ready-to-use foundational React components."
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[1]}
                        href={ROUTES.productBase}
                        icon={<SvgBaseUiLogo height={20} width={20} sx={logoColor} />}
                        name="Base UI"
                        description="Unstyled components and hooks."
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[2]}
                        href={ROUTES.pigmentDocs}
                        icon={<SvgPigmentLogo height={20} width={20} sx={logoColor} />}
                        name="Pigment CSS"
                        description="Zero-runtime CSS-in-JS."
                      />

                      <ProductMenuItem
                        id={PRODUCT_IDS[3]}
                        href={ROUTES.productToolpad}
                        icon={<SvgToolpadLogo height={20} width={20} sx={logoColor} />}
                        name="Toolpad"
                        description="Low-code admin builder."
                        chip={
                          <Chip
                            label="Beta"
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{
                              fontSize: '.625rem',
                              fontWeight: 'semiBold',
                              textTransform: 'uppercase',
                              letterSpacing: '.04rem',
                              height: '16px',
                              '& .MuiChip-label': {
                                px: '4px',
                              },
                            }}
                          />
                        }
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[4]}
                        href={ROUTES.productAdvanced}
                        icon={<IconImage name="product-advanced" />}
                        name="MUI X"
                        description="Advanced components for complex use cases."
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[5]}
                        href={ROUTES.joyDocs}
                        icon={<IconImage name="product-core" />}
                        name="Joy UI"
                        description="Beautiful foundational React components."
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[6]}
                        href={ROUTES.productTemplates}
                        icon={<IconImage name="product-templates" />}
                        name="Templates"
                        description="Fully built Material UI templates."
                      />
                      <ProductMenuItem
                        id={PRODUCT_IDS[7]}
                        href={ROUTES.productDesignKits}
                        icon={<IconImage name="product-designkits" />}
                        name="Design Kits"
                        description="Material UI in your favorite design tool."
                      />
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li>
          <Link href={ROUTES.pricing}>Pricing</Link>
        </li>
        <li>
          <Link href={ROUTES.about}>About us</Link>
        </li>
        <li>
          <Link href={ROUTES.blog}>Blog</Link>
        </li>
      </ul>
    </Navigation>
  );
}
