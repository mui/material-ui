import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import Link from 'docs/src/modules/components/Link';

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
  },
  '& li': {
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
    fontWeight: 600,
    '& > a, & > div': {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover, &:focus': {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[50],
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

const PRODUCT_IDS = ['product-core', 'product-advanced', 'product-templates', 'product-design'];

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
              theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50',
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
        <Box>
          <Typography color="text.primary" variant="body2" fontWeight={600}>
            {name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        </Box>
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
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const productsMenuRef = React.useRef<HTMLDivElement | null>(null);
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
        setSubMenuOpen(true);
      }
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) return 0;
        if (prevValue === PRODUCT_IDS.length - 1) {
          return 0;
        }
        return prevValue + 1;
      });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) return 0;
        if (prevValue === 0) {
          return PRODUCT_IDS.length - 1;
        }
        return prevValue - 1;
      });
    }
    if (event.key === 'Escape') {
      setSubMenuOpen(false);
      setSubMenuIndex(null);
    }
  }
  return (
    <Navigation>
      <ul ref={navRef} role="menubar" onKeyDown={handleLeftRightArrow}>
        {FEATURE_TOGGLE.nav_products && (
          <li
            role="none"
            onMouseOver={() => setSubMenuOpen(true)}
            onFocus={() => setSubMenuOpen(true)}
            onMouseOut={() => setSubMenuOpen(false)}
            onBlur={() => setSubMenuOpen(false)}
          >
            <div
              role="menuitem"
              tabIndex={0}
              id="products-menu"
              ref={productsMenuRef}
              aria-haspopup
              aria-expanded={subMenuOpen ? 'true' : 'false'}
              onKeyDown={handleKeyDown}
            >
              Products
            </div>
            <Popper
              open={subMenuOpen}
              anchorEl={productsMenuRef.current}
              transition
              placement="bottom-start"
              style={{ zIndex: 1200 }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    variant="outlined"
                    sx={{
                      minWidth: 498,
                      overflow: 'hidden',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.200',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
                      boxShadow: (theme) =>
                        `0px 4px 20px ${
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
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                      },
                      '& a': { textDecoration: 'none' },
                    }}
                  >
                    <ul role="menu">
                      <li role="none">
                        <ProductSubMenu
                          id={PRODUCT_IDS[0]}
                          role="menuitem"
                          href={ROUTES.productCore}
                          icon={<IconImage name="product-core" />}
                          name="Core"
                          description="Ready to use, forever free, out-of-the-box, components."
                          onKeyDown={handleKeyDown}
                        />
                      </li>
                      <li role="none">
                        <ProductSubMenu
                          id={PRODUCT_IDS[1]}
                          role="menuitem"
                          href={ROUTES.productAdvanced}
                          icon={<IconImage name="product-advanced" />}
                          name={
                            <Box component="span" display="inline-flex" alignItems="center">
                              Advanced&nbsp;
                            </Box>
                          }
                          description="Powerful components for your complex apps."
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
                          description="Get a fully built template for you application."
                          onKeyDown={handleKeyDown}
                        />
                      </li>
                      <li role="none">
                        <ProductSubMenu
                          id={PRODUCT_IDS[3]}
                          role="menuitem"
                          href={ROUTES.productDesignKits}
                          icon={<IconImage name="product-designkits" />}
                          name="Design Kits"
                          description="Pick your favorite design tool to enjoy."
                          onKeyDown={handleKeyDown}
                        />
                      </li>
                    </ul>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </li>
        )}
        <li role="none">
          <Link role="menuitem" href={ROUTES.documentation}>
            Docs
          </Link>
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
      </ul>
    </Navigation>
  );
}
