import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import { unstable_debounce as debounce } from '@mui/utils';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
// import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';

const Navigation = styled('nav')(({ theme }) => [
  {
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      color: (theme.vars || theme).palette.text.primary,
      '& > a, & > div': {
        padding: theme.spacing(1, 1.2),
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
        textDecoration: 'none',
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
        gap: 4,
      },
    },
  },
  theme.applyDarkStyles({
    '& li': {
      '& > a, & > div': {
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[700],
          color: (theme.vars || theme).palette.primaryDark[200],
        },
        '&:focus-visible': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[700],
          color: (theme.vars || theme).palette.primaryDark[100],
        },
      },
    },
  }),
]);

const PopperContainer = styled(Paper)(({ theme }) => [
  {
    marginTop: 6,
    paddingBottom: 14,
    minWidth: 498,
    overflow: 'hidden',
    boxShadow: `0px 4px 20px ${alpha(theme.palette.grey[300], 0.5)}`,
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    '& a': { textDecoration: 'none' },
  },
  theme.applyDarkStyles({
    backgroundColor: (theme.vars || theme).palette.primaryDark[900],
    borderColor: (theme.vars || theme).palette.divider,
    boxShadow: `0px 4px 20px ${alpha(theme.palette.background.paper, 0.7)}`,
  }),
]);

const CategoryLabelDivider = styled(Typography)(({ theme }) => [
  {
    padding: theme.spacing(2, 2.5, 1, 2.5),
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    letterSpacing: '.08rem',
    color: (theme.vars || theme).palette.grey[600],
  },
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
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1.5,
          mx: 1.5,
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: 'transparent',
          '&:hover, &:focus': {
            borderColor: 'divider',
            backgroundColor: (theme.vars || theme).palette.grey[50],
            outline: 0,
            '@media (hover: none)': {
              backgroundColor: 'initial',
              outline: 'initial',
            },
          },
          ...theme.applyDarkStyles({
            '&:hover, &:focus': {
              borderColor: 'divider',
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
            },
          }),
          ...props,
        })}
      >
        {icon}
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
  // const docsMenuRef = React.useRef<HTMLDivElement | null>(null);
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
          <Box
            component="div"
            role="menuitem"
            tabIndex={0}
            ref={productsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'products' ? 'true' : 'false'}
            onKeyDown={handleKeyDown}
          >
            Products
          </Box>
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
                <PopperContainer variant="outlined">
                  <ul role="menu">
                    <li role="none">
                      <CategoryLabelDivider>Core products</CategoryLabelDivider>
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        role="menuitem"
                        href={ROUTES.materialDocs}
                        icon={<IconImage height={30} width={28} name="product-material" />}
                        name="Material UI"
                        description="React components implementing Google's Material Design."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        role="menuitem"
                        href={ROUTES.baseDocs}
                        icon={<IconImage height={30} width={30} name="product-base" />}
                        name="Base UI"
                        description="Unstyled React UI components and low-level hooks."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        role="menuitem"
                        href={ROUTES.joyDocs}
                        icon={<IconImage height={30} width={30} name="product-joy" />}
                        name="Joy UI"
                        description="React UI components that spark joy."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    {/* <li role="none">
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
                    </li> */}
                    <li role="none">
                      <Divider sx={{ mt: 1 }} />
                    </li>
                    <li role="none">
                      <CategoryLabelDivider>Advanced products</CategoryLabelDivider>
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        role="menuitem"
                        href={ROUTES.advancedComponents}
                        icon={<IconImage height={30} width={30} name="product-advanced" />}
                        name="MUI X"
                        description="Advanced and powerful components for complex use cases."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[4]}
                        role="menuitem"
                        href={ROUTES.toolpadDocs}
                        icon={<IconImage height={30} width={30} name="product-toolpad" />}
                        name="Toolpad"
                        chip={<Chip label="Beta" size="small" color="primary" />}
                        description="Low-code admin builder."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                  </ul>
                </PopperContainer>
              </Fade>
            )}
          </Popper>
        </li>
        {/* <li
          role="none"
          onMouseEnter={() => setSubMenuOpenUndebounce('docs')}
          onFocus={() => setSubMenuOpenUndebounce('docs')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={() => setSubMenuOpenUndebounce(null)}
        >
          <div
            role="menuitem"
            tabIndex={0}
            ref={docsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'docs' ? 'true' : 'false'}
          >
            Docs
            <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
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
                <PopperContainer variant="outlined">
                  <ul role="menu">
                    <MuiProductSelector />
                  </ul>
                </PopperContainer>
              </Fade>
            )}
          </Popper>
        </li> */}
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
