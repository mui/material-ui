import React         from 'react';
import MUI           from 'material-ui';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager  from 'material-ui/lib/styles/theme-manager';
import Colors        from 'material-ui/lib/styles/colors';

import Tabela        from './tabela';

const { RaisedButton, Dialog, FontIcon } = MUI;

export default React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getInitialState () {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });

        this.setState({muiTheme: newMuiTheme});
    },

    render() {

        let containerStyle = {
            textAlign: 'center',
            paddingTop: '50px',
        };

        let standardActions = [
            { text: 'Okay' },
        ];

        return (
            <div style={containerStyle}>
                <Dialog title="Super Secret Password" actions={standardActions} ref="superSecretPasswordDialog">
                    <p>1-2-3-4-5</p>
                </Dialog>

                <h1>..</h1>
                <h2>example project</h2>

                <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

                <hr />

                <RaisedButton label="Botão com ícone" primary={true}>
                    <FontIcon className="material-icons">person</FontIcon>
                </RaisedButton>

                {/*<Tabela />*/}
            </div>
            );
    },

    _handleTouchTap() {
        this.refs.superSecretPasswordDialog.show();
    },

});