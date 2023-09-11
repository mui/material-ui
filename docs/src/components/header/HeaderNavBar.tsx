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
import Link from 'docs/src/modules/components/Link';
import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';

const Navigation = styled('nav')(({ theme }) => [
  {
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      color: (theme.vars || theme).palette.text.primary,
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      '& > a, & > button': {
        display: 'inline-block',
        color: 'inherit',
        font: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing('8px', 1),
        borderRadius: (theme.vars || theme).shape.borderRadius,
        '&:hover': {
          color: (theme.vars || theme).palette.grey[700],
          backgroundColor: (theme.vars || theme).palette.grey[50],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'initial',
          },
        },
        '&:focus-visible': {
          color: (theme.vars || theme).palette.grey[700],
          outline: 0,
          backgroundColor: (theme.vars || theme).palette.grey[100],
        },
      },
      '& > div': {
        cursor: 'default',
      },
    },
  },
  theme.applyDarkStyles({
    '& li': {
      '& > a, & > button': {
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[700],
          color: (theme.vars || theme).palette.primaryDark[200],
        },
        '&:focus-visible': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[600],
          color: (theme.vars || theme).palette.primaryDark[100],
        },
      },
    },
  }),
]);

const PRODUCT_IDS = [
  'product-core',
  'product-advanced',
  'product-templates',
  'product-design',
  'product-toolpad',
];

type ProductSubMenuProps = {
  icon: React.ReactElement;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
  href: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const ProductSubMenu = React.forwardRef<HTMLAnchorElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, chip, href, ...props }, ref) {
    return (
      <Box
        component={Link}
        href={href}
        ref={ref}
        sx={[
          (theme) => ({
            display: 'flex',
            alignItems: 'center',
            py: 2,
            pr: 3,
            '&:hover, &:focus': {
              backgroundColor: (theme.vars || theme).palette.grey[50],
              outline: 0,
              '@media (hover: none)': {
                backgroundColor: 'initial',
                outline: 'initial',
              },
            },
          }),
          (theme) =>
            theme.applyDarkStyles({
              '&:hover, &:focus': {
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
              },
            }),
        ]}
        {...props}
      >
        <Box
          sx={[
            (theme) => ({
              px: 2,
              '& circle': {
                fill: (theme.vars || theme).palette.grey[100],
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                '& circle': {
                  fill: (theme.vars || theme).palette.primaryDark[700],
                },
              }),
          ]}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="text.primary" variant="body2" fontWeight="bold">
            {name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        </Box>
        {chip}
      </Box>
    );
  },
);

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'products' | 'docs'>(null);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const productsMenuRef = React.useRef<HTMLButtonElement | null>(null);
  const docsMenuRef = React.useRef<HTMLButtonElement | null>(null);
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
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  variant="outlined"
                  sx={[
                    (theme) => ({
                      minWidth: 498,
                      overflow: 'hidden',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                      ...theme.applyDarkStyles({
                        borderColor: 'primaryDark.700',
                        bgcolor: 'primaryDark.900',
                        boxShadow: `0px 4px 20px ${alpha(theme.palette.background.paper, 0.72)}`,
                      }),
                      '& ul': {
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                      },
                      '& li:not(:last-of-type)': {
                        borderBottom: '1px solid',
                        borderColor: 'grey.100',
                      },
                      '& a': { textDecoration: 'none' },
                    }),
                    (theme) =>
                      theme.applyDarkStyles({
                        '& li:not(:last-of-type)': {
                          borderColor: 'primaryDark.700',
                        },
                      }),
                  ]}
                >
                  <ul>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        href={ROUTES.productCore}
                        icon={<IconImage name="product-core" />}
                        name="MUI Core"
                        description="Ready-to-use foundational React components, free forever."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        href={ROUTES.productAdvanced}
                        icon={<IconImage name="product-advanced" />}
                        name="MUI X"
                        description="Advanced and powerful components for complex use cases."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[2]}
                        href={ROUTES.productTemplates}
                        icon={<IconImage name="product-templates" />}
                        name="Templates"
                        description="Fully built, out-of-the-box, templates for your application."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[3]}
                        href={ROUTES.productDesignKits}
                        icon={<IconImage name="product-designkits" />}
                        name="Design kits"
                        description="Our components available in your favorite design tool."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[4]}
                        href={ROUTES.productToolpad}
                        icon={<IconImage name="product-toolpad" />}
                        name="MUI Toolpad"
                        chip={<Chip label="Beta" size="small" color="primary" variant="outlined" />}
                        description="Low-code admin builder."
                      />
                    </li>
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li
          onMouseEnter={setSubMenuOpenUndebounce('docs')}
          onFocus={setSubMenuOpenUndebounce('docs')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={setSubMenuOpenUndebounce(null)}
        >
          <ButtonBase
            ref={docsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'docs' ? 'true' : 'false'}
            onClick={handleClickMenu('docs')}
            aria-controls={subMenuOpen === 'docs' ? 'docs-popper' : undefined}
          >
            Docs
          </ButtonBase>
          <Popper
            id="docs-popper"
            open={subMenuOpen === 'docs'}
            anchorEl={docsMenuRef.current}
            transition
            placement="bottom-start"
            style={{ zIndex: 1200, pointerEvents: subMenuOpen === 'docs' ? undefined : 'none' }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    minWidth: 498,
                    overflow: 'hidden',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                    ...theme.applyDarkStyles({
                      borderColor: 'primaryDark.700',
                      bgcolor: 'primaryDark.900',
                      boxShadow: `0px 4px 20px ${alpha(theme.palette.background.paper, 0.72)}`,
                    }),
                    '& ul': {
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                  })}
                >
                  <ul>
                    <MuiProductSelector />
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
