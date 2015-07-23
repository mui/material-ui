let React = require('react');
let { AppBar, AppCanvas, Styles, Mixins } = require('material-ui');

let IconButton = require('icon-button');
let ArrowBack = require('svg-icons/navigation/arrow-back');

let CodeExample = require('../code-example/code-example');
let FullWidthSection = require('../full-width-section');

let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

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

    getStyles() {
        return {
            headline: {
                //headline
                fontSize: '24px',
                lineHeight: '32px',
                paddingTop: '16px',
                marginBottom: '12px',
                letterSpacing: '0',
                fontWeight: Typography.fontWeightNormal,
                color: Typography.textDarkBlack
            }
        };
    },

    goBack() {
        window.history.back();
    },

    render() {
        let styles = this.getStyles();

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

        let imgStyle = {
            height: 120,
            margin: "0 auto",
            display: "block",
            transformOrigin: "20% 100% 0",
            transform: "translate3d(80px,0,0)",
        };

        let waterfall = {
            minHeight: 64,
            maxHeight: 210,
            // overflow hidden is needed because image may be translated outside
            // of viewport creating horizontal scroll
            children: <div style={{overflow: 'hidden'}}>
                <img style={imgStyle} src="images/material-ui-logo.svg" />
            </div>
        };

        waterfall.onHeightChange = function({height, titleElement, slideElement}){
            // interpolate opacity
            let interpolation = (height - waterfall.minHeight) / (waterfall.maxHeight - waterfall.minHeight);
            let h1Opacity =  1 - interpolation;

            titleElement.querySelector('h1').style.opacity = h1Opacity;
            let imgStyle = slideElement.querySelector('img').style;
            imgStyle.transform = 'translate3d(80px,0,0) scale3d('+interpolation+', '+interpolation+', 1)';
            imgStyle.opacity = interpolation;
        };

        let getTitle = (styles) => {
            return <h1 style={this.mergeAndPrefix(styles.title, {opacity: 0})}>Waterfall AppBar</h1>;
        };

        return (
            <AppCanvas>
                <AppBar
                    title={getTitle}
                    iconElementLeft={<IconButton onClick={this.goBack}><ArrowBack /></IconButton>}
                    iconElementRight={githubButton}
                    position="waterfall"
                    waterfall={waterfall}
                />
                <FullWidthSection>
                    <h2 style={styles.headline}>Waterfall AppBar</h2>
                    <CodeExample code={
`let imgStyle = {
    height: 120,
    margin: "0 auto",
    display: "block",
    transformOrigin: "20% 100% 0",
    transform: "translate3d(80px,0,0)",
};

let waterfall = {
    minHeight: 64,
    maxHeight: 210,
    // overflow hidden is needed because image may be translated outside
    // of viewport creating horizontal scroll
    children: <div style={{overflow: 'hidden'}}>
        <img style={imgStyle} src="images/material-ui-logo.svg" />
    </div>
};

waterfall.onHeightChange = function({height, titleElement, slideElement}){
    // interpolate opacity
    let interpolation = (height - waterfall.minHeight) / (waterfall.maxHeight - waterfall.minHeight);
    let h1Opacity =  1 - interpolation;

    titleElement.querySelector('h1').style.opacity = h1Opacity;
    let imgStyle = slideElement.querySelector('img').style;
    imgStyle.transform = 'translate3d(80px,0,0) scale3d('+interpolation+', '+interpolation+', 1)';
    imgStyle.opacity = interpolation;
};

let getTitle = (styles) => {
    return <h1 style={this.mergeAndPrefix(styles.title, {opacity: 0})}>Waterfall AppBar</h1>;
};
<AppBar
    title={getTitle}
    iconElementLeft={<IconButton onClick={this.goBack}><ArrowBack /></IconButton>}
    iconElementRight={githubButton}
    position="waterfall"
    waterfall={waterfall}
/>`
                    }/>
                    <ul>{contentItems}</ul>
                </FullWidthSection>

            </AppCanvas>
        );
    }
});

module.exports = AppBarWaterfall;
