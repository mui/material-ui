/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { unstable_debounce as debounce } from '@mui/utils';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import SvgBaseUiLogo from 'docs/src/icons/SvgBaseUiLogo';
import SvgPigmentLogo from 'docs/src/icons/SvgPigmentLogo';

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
  'product-joy',
  'product-advanced',
  'product-toolpad',
  'product-templates',
  'product-design',
];

type ProductSubMenuProps = {
  icon: React.ReactElement<any>;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
  href: string;
} & Omit<React.JSX.IntrinsicElements['a'], 'ref'>;

const ProductSubMenu = React.forwardRef<HTMLAnchorElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, chip, href, ...props }, ref) {
    return (
      <Box
        component={Link}
        href={href}
        ref={ref}
        sx={(theme) => ({
          p: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid transparent',
          borderRadius: '8px',
          transition: '100ms ease-in background-color, border',
          '&:hover, &:focus': {
            backgroundColor: (theme.vars || theme).palette.grey[50],
            borderColor: (theme.vars || theme).palette.divider,
            outline: 0,
            '@media (hover: none)': {
              backgroundColor: 'initial',
              outline: 'initial',
            },
          },
          ...theme.applyDarkStyles({
            '&:hover, &:focus': {
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
            },
          }),
        })}
        {...props}
      >
        <Box
          sx={{
            height: '36px',
            width: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Typography color="text.primary" variant="body2" fontWeight="semiBold">
              {name}
            </Typography>
            {chip}
          </Box>
          <Typography color="text.secondary" variant="body2" fontSize="0.813rem">
            {description}
          </Typography>
        </div>
      </Box>
    );
  },
);

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'products' | 'docs'>(null);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const productsMenuRef = React.useRef<HTMLButtonElement>(null);
  const docsMenuRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (typeof subMenuIndex === 'number') {
      document.getElementById(PRODUCT_IDS[subMenuIndex])?.focus();
    }
  }, [subMenuIndex]);

  function handleKeyDown(event: React.KeyboardEvent) {
    let menuItem;

    if (subMenuOpen === 'products') {
      menuItem = productsMenuRef.current!;
    } else if (subMenuOpen === 'docs') {
      menuItem = docsMenuRef.current!;
    } else {
      return;
    }

    if (event.key === 'ArrowDown' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        if (prevValue === PRODUCT_IDS.length - 1) {
          return 0;
        }
        return prevValue + 1;
      });
    }
    if (event.key === 'ArrowUp' && subMenuOpen === 'products') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) {
          return 0;
        }
        if (prevValue === 0) {
          return PRODUCT_IDS.length - 1;
        }
        return prevValue - 1;
      });
    }
    if (event.key === 'Escape' || event.key === 'Tab') {
      menuItem.focus();
      setSubMenuOpen(null);
      setSubMenuIndex(null);
    }
  }

  const setSubMenuOpenDebounced = React.useMemo(
    () => debounce(setSubMenuOpen, 40),
    [setSubMenuOpen],
  );

  const setSubMenuOpenUndebounce = (value: typeof subMenuOpen) => () => {
    setSubMenuOpenDebounced.clear();
    setSubMenuOpen(value);
  };

  const handleClickMenu = (value: typeof subMenuOpen) => () => {
    setSubMenuOpenDebounced.clear();
    setSubMenuOpen(subMenuOpen ? null : value);
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
            aria-expanded={subMenuOpen === 'products' ? 'true' : 'false'}
            onClick={handleClickMenu('products')}
            aria-controls={subMenuOpen === 'products' ? 'products-popper' : undefined}
          >
            Products
          </ButtonBase>
          <Popper
            id="products-popper"
            open={subMenuOpen === 'products'}
            anchorEl={productsMenuRef.current}
            transition
            placement="bottom-start"
            style={{
              zIndex: 1200,
              pointerEvents: subMenuOpen === 'products' ? undefined : 'none',
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    mt: 1,
                    p: 1,
                    minWidth: 498,
                    overflow: 'hidden',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.15)}`,
                    '& ul': {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: '8px',
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                    '& a': { textDecoration: 'none' },
                    ...theme.applyDarkStyles({
                      bgcolor: 'primaryDark.900',
                      boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                    }),
                  })}
                >
                  <ul>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        href={ROUTES.productMaterial}
                        icon={<SvgMuiLogomark height={24} width={24} />}
                        name="Material UI"
                        description="Ready-to-use foundational React components."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        href={ROUTES.productBase}
                        icon={<SvgBaseUiLogo height={24} width={24} />}
                        name="Base UI"
                        description="Unstyled components and hooks."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[2]}
                        href={ROUTES.pigmentDocs}
                        icon={<SvgPigmentLogo height={24} width={24} />}
                        name="Pigment CSS"
                        description="Zero-runtime CSS-in-JS."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[3]}
                        href={ROUTES.joyDocs}
                        icon={<IconImage name="product-core" />}
                        name="Joy UI"
                        description="Beautiful foudational React components."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[4]}
                        href={ROUTES.productAdvanced}
                        icon={<IconImage name="product-advanced" />}
                        name="MUI X"
                        description="Advanced components for complex use cases."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[5]}
                        href={ROUTES.productToolpad}
                        icon={<IconImage name="product-toolpad" />}
                        name="Toolpad"
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
                        description="Low-code admin builder."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[6]}
                        href={ROUTES.productTemplates}
                        icon={<IconImage name="product-templates" />}
                        name="Templates"
                        description="Fully built Material UI templates."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[7]}
                        href={ROUTES.productDesignKits}
                        icon={<IconImage name="product-designkits" />}
                        name="Design Kits"
                        description="Material UI in your favorite design tool."
                      />
                    </li>
                  </ul>
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
