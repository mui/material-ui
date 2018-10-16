import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import recompose from 'modules/recompose'
import LayoutBody from 'web/modules/components/LayoutBody'
import Tab from 'web/modules/components/Tab'

const styles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing.unit * 3,
  },
})

class NavTabs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      route: this.props.router.route,
    }
  }

  state = {}

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleChange = (event, route) => {
    this.setState({
      route,
    })

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.props.routes.Router.pushRoute(route)
    }, 250)
  }

  timeout = null

  render() {
    const { classes, centered, navRoutes, Link } = this.props

    return (
      <div className={classes.root}>
        <LayoutBody>
          <Tabs
            centered={centered}
            fullWidth
            onChange={this.handleChange}
            indicatorColor="primary"
            scrollable={!centered}
            scrollButtons="off"
            value={this.state.route}
          >
            {navRoutes.map(routeInfo => (
              <Tab
                component={LinkTab}
                value={routeInfo.route}
                key={routeInfo.route}
                label={routeInfo.label}
              />
            ))}
          </Tabs>
        </LayoutBody>
      </div>
    )
  }
}

const LinkTab = props => (
  <Link
    variant="naked"
    route={routeInfo.route}
    onClick={event => {
      // ignore click for new tab / new window behavior
      // The logic was taken from https://github.com/zeit/next.js/blob/0989ecc2237f2f1edecea2f08ad55978d28c8c54/lib/link.js#L45
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        (event.nativeEvent && event.nativeEvent.which === 2)
      ) {
        return
      }

      event.preventDefault()
      props.onClick(event)
    }}
    {...props}
  />
);

NavTabs.propTypes = {
  centered: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  Link: PropTypes.any.isRequired,
  navRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      route: PropTypes.string.isRequired,
    })
  ),
  router: PropTypes.shape({
    route: PropTypes.string.isRequired,
  }),
  routes: PropTypes.shape({
    Router: PropTypes.object.isRequired,
  }).isRequired,
};

export default recompose.compose(
  withStyles(styles),
  withRouter
)(NavTabs);
