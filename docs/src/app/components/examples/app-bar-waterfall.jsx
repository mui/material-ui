let React = require('react');
let { AppBar, AppCanvas, Styles, Mixins } = require('material-ui');

let IconButton = require('icon-button');
let ArrowBack = require('svg-icons/navigation/arrow-back');

let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

let Spring = require('react-motion/lib/Spring').Spring;


let AppBarWaterfall = React.createClass({

    mixins: [Mixins.StylePropable],

    contextTypes: {
        router: React.PropTypes.func
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    },

    goBack() {
        window.history.back();
    },

    render() {

        let githubButton = (
            <IconButton
                iconStyle={{
                  color: Colors.darkWhite
                }}
                iconClassName="muidocs-icon-custom-github"
                href="https://github.com/callemall/material-ui/tree/master/docs/src/app/components/examples/app-bar-waterfall.jsx"
                linkButton={true} />
        );

        let contentItems = [], i;
        for(i = 0; i < 100; i++) {
            contentItems.push(<li>Item {i}</li>);
        }

        const waterfall = {
            minHeight: 64,
            maxHeight: 210,
            spring: Spring
        };

        let getTitleElement = (height, styles) => {
            // interpolate opacity
            let interpolation = (height - waterfall.minHeight) / (waterfall.maxHeight - waterfall.minHeight);
            let h1Opacity =  1 - interpolation;

            let imgStyle = {
                height: 130,
                marginLeft: 18,
                transformOrigin: "20% 0 0",
                transform: `scale3d(${interpolation}, ${interpolation}, 1)`,
                opacity: interpolation
            };

            return (
                <div>
                    <h1 style={this.mergeAndPrefix(styles.title, {opacity: h1Opacity})}>Waterfall AppBar</h1>
                    <img style={imgStyle} src="images/material-ui-logo.svg" />
                </div>
                );
        };

        return (
            <AppCanvas>
                <AppBar
                    title={getTitleElement}
                    iconElementLeft={<IconButton onClick={this.goBack}><ArrowBack /></IconButton>}
                    iconElementRight={githubButton}
                    waterfall={waterfall}
                >
                </AppBar>
                <div style={{paddingTop: waterfall.maxHeight}}>
                    <h1>Waterfall AppBar</h1>
                    <ul>{contentItems}</ul>
                </div>

            </AppCanvas>
        );
    }
});

module.exports = AppBarWaterfall;
