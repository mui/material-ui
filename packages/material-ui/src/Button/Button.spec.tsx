import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';
import { expectType } from '@material-ui/types';

const log = console.log;

const TestOverride = React.forwardRef<HTMLDivElement, { x?: number }>((props, ref) => (
  <div ref={ref} />
));

const FakeIcon = () => <div>Icon</div>;

const ButtonTest = () => (
  <div>
    <Button>I am a button!</Button>
    <Button color="inherit">Contrast</Button>
    <Button disabled>Disabled</Button>
    <Button href="#link-button">Link</Button>
    <Button size="small">Small</Button>
    <Button variant="contained">Contained</Button>
    <Button variant="outlined" color="primary" aria-label="add">
      Outlined
    </Button>
    <Button tabIndex={1} title="some button">
      Title
    </Button>
    <Button component="a">Simple Link</Button>
    <Button component={(props) => <a {...props} />}>Complex Link</Button>
    <Button component={ReactRouterLink} to="/open-collective">
      Link
    </Button>
    <Button href="/open-collective">Link</Button>
    <Button component={ReactRouterLink} to="/open-collective">
      Link
    </Button>
    <Button href="/open-collective">Link</Button>
    // By default the underlying component is a button element:
    <Button
      ref={(elem) => {
        expectType<HTMLButtonElement | null, typeof elem>(elem);
      }}
      onClick={(e) => {
        expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
        log(e);
      }}
    >
      Button
    </Button>
    // If an href is provided, an anchor is used:
    <Button
      href="/open-collective"
      ref={(elem) => {
        expectType<HTMLAnchorElement | null, typeof elem>(elem);
      }}
      onClick={(e) => {
        expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof e>(e);
        log(e);
      }}
    >
      Link
    </Button>
    // If a component prop is specified, use that:
    <Button<'div'>
      component="div"
      ref={(elem) => {
        expectType<HTMLDivElement | null, typeof elem>(elem);
      }}
      onClick={(e) => {
        expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof e>(e);
        log(e);
      }}
    >
      Div
    </Button>
    {
      // Can't have an onClick handler if the overriding component doesn't specify one:
      // @ts-expect-error
      <Button<typeof TestOverride> component={TestOverride} onClick={log}>
        TestOverride
      </Button>
    }
    <Button startIcon={FakeIcon}>Start Icon</Button>
    <Button endIcon={FakeIcon}>endIcon</Button>
  </div>
);

const ReactRouterLinkTest = () => {
  const ButtonLink = (props: ButtonProps<typeof ReactRouterLink>) => (
    <Button {...props} component={ReactRouterLink} />
  );

  const reactRouterButtonLink1 = (
    <ButtonLink color="primary" to="/">
      Go Home
    </ButtonLink>
  );

  const MyLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    return <ReactRouterLink innerRef={ref} {...props} />;
  });

  const reactRouterButtonLink2 = (
    <Button color="primary" component={MyLink} to="/router-future">
      Go Home
    </Button>
  );
};
