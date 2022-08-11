import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { unstable_debounce as debounce } from '@mui/utils';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
  },
  '& li': {
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    fontWeight: 700,
    '& > a, & > div': {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover, &:focus': {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[50],
        color:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[200] : theme.palette.grey[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'initial',
        },
      },
    },
    '& > div': {
      cursor: 'default',
    },
  },
}));

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
  href: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const ProductSubMenu = React.forwardRef<HTMLAnchorElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, href, ...props }, ref) {
    return (
      <Box
        component={Link}
        href={href}
        ref={ref}
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 2,
          '&:hover, &:focus': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[700], 0.4)
                : theme.palette.grey[50],
            outline: 'none',
            '@media (hover: none)': {
              backgroundColor: 'initial',
              outline: 'initial',
            },
          },
        }}
        {...props}
      >
        <Box
          sx={{
            px: 2,
            '& circle': {
              fill: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
            },
          }}
        >
          {icon}
        </Box>
        <div>
          <Typography color="text.primary" variant="body2" fontWeight={700}>
            {name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        </div>
      </Box>
    );
  },
);

function getNextIndex(eventKey: KeyboardEvent['key'], currentIndex: number, length: number) {
  if (eventKey === 'ArrowLeft') {
    return currentIndex === 0 ? length - 1 : currentIndex - 1;
  }
  if (eventKey === 'ArrowRight') {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  }
  return currentIndex;
}

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'products' | 'docs'>(null);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const productsMenuRef = React.useRef<HTMLDivElement | null>(null);
  const docsMenuRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (typeof subMenuIndex === 'number') {
      document.getElementById(PRODUCT_IDS[subMenuIndex])?.focus();
    }
  }, [subMenuIndex]);
  function handleLeftRightArrow(
    event: React.KeyboardEvent,
    target: EventTarget | HTMLElement | null = event.target,
  ) {
    if (navRef.current) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        let i = 0;
        while (i < navRef.current.children.length) {
          const child = navRef.current.children.item(i);
          if (child && (target === child || child.contains(target as Node))) {
            const prevSibling = navRef.current.children.item(
              getNextIndex(event.key, i, navRef.current.children.length),
            );
            const htmlElement = prevSibling ? (prevSibling.firstChild as HTMLElement) : null;
            if (htmlElement) {
              htmlElement.focus();
            }
          }
          i += 1;
        }
      }
    }
  }
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      handleLeftRightArrow(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }) as unknown as React.KeyboardEvent,
        productsMenuRef.current?.parentElement,
      );
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      handleLeftRightArrow(event, productsMenuRef.current?.parentElement);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (event.target === productsMenuRef.current) {
        setSubMenuOpen('products');
      }
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
    if (event.key === 'ArrowUp') {
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
    if (event.key === 'Escape') {
      setSubMenuOpen(null);
      setSubMenuIndex(null);
    }
  }

  const setSubMenuOpenDebounced = React.useMemo(
    () => debounce(setSubMenuOpen, 40),
    [setSubMenuOpen],
  );

  const setSubMenuOpenUndebounce = React.useMemo(
    () => (value: typeof subMenuOpen) => {
      setSubMenuOpenDebounced.clear();
      setSubMenuOpen(value);
    },
    [setSubMenuOpen, setSubMenuOpenDebounced],
  );

  React.useEffect(() => {
    return () => {
      setSubMenuOpenDebounced.clear();
    };
  }, [setSubMenuOpenDebounced]);

  return (
    <Navigation>
      <ul ref={navRef} role="menubar" onKeyDown={handleLeftRightArrow}>
        <li
          role="none"
          onMouseEnter={() => setSubMenuOpenUndebounce('products')}
          onFocus={() => setSubMenuOpenUndebounce('products')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={() => setSubMenuOpenUndebounce(null)}
        >
          <div
            role="menuitem"
            tabIndex={0}
            id="products-menu"
            ref={productsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'products' ? 'true' : 'false'}
            onKeyDown={handleKeyDown}
          >
            Products
          </div>
          <Popper
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
                  sx={(theme) => ({
                    minWidth: 498,
                    overflow: 'hidden',
                    borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
                    bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
                    boxShadow: `0px 4px 20px ${
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.72)
                        : 'rgba(170, 180, 190, 0.3)'
                    }`,
                    '& ul': {
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                    '& li:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                    },
                    '& a': { textDecoration: 'none' },
                  })}
                >
                  <ul role="menu">
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        role="menuitem"
                        href={ROUTES.productCore}
                        icon={<IconImage name="product-core" />}
                        name="MUI Core"
                        description="Ready-to-use foundational components, free forever."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        role="menuitem"
                        href={ROUTES.productAdvanced}
                        icon={<IconImage name="product-advanced" />}
                        name="MUI X"
                        description="Advanced and powerful components for complex use cases."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[2]}
                        role="menuitem"
                        href={ROUTES.productTemplates}
                        icon={<IconImage name="product-templates" />}
                        name="Templates"
                        description="Fully built, out-of-the-box, templates for your application."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[3]}
                        role="menuitem"
                        href={ROUTES.productDesignKits}
                        icon={<IconImage name="product-designkits" />}
                        name="Design kits"
                        description="Our components available in your favorite design tool."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[4]}
                        role="menuitem"
                        href={ROUTES.productToolpad}
                        icon={<IconImage name="product-toolpad" />}
                        name={
                          <Box
                            sx={{
                              display: 'flex',
                              component: 'span',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '150%',
                            }}
                          >
                            <div>MUI&nbsp;Toolpad</div>
                            <Chip size="small" label={'Alpha'} />
                          </Box>
                        }
                        description="Low-code tool builder, powered by MUI."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li
          role="none"
          onMouseEnter={() => setSubMenuOpenUndebounce('docs')}
          onFocus={() => setSubMenuOpenUndebounce('docs')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={() => setSubMenuOpenUndebounce(null)}
        >
          <div
            role="menuitem"
            tabIndex={0}
            id="products-menu"
            ref={docsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'docs' ? 'true' : 'false'}
          >
            Docs
          </div>
          <Popper
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
                    borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
                    bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
                    boxShadow: `0px 4px 20px ${
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.72)
                        : 'rgba(170, 180, 190, 0.3)'
                    }`,
                    '& ul': {
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                  })}
                >
                  <ul role="menu">
                    <MuiProductSelector />
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li role="none">
          <Link role="menuitem" href={ROUTES.pricing}>
            Pricing
          </Link>
        </li>
        <li role="none">
          <Link role="menuitem" href={ROUTES.about}>
            About us
          </Link>
        </li>
        <li role="none">
          <Link role="menuitem" href={ROUTES.blog}>
            Blog
          </Link>
        </li>
      </ul>
    </Navigation>
  );
}
