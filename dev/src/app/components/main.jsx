import React         from 'react';
import MUI           from 'material-ui';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager  from 'material-ui/lib/styles/theme-manager';
import Colors        from 'material-ui/lib/styles/colors';

const { RaisedButton, Dialog,
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } = MUI;

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

                <Table fixedHeader={true} multiSelectable={true} selectable={true} onRowSelection={this._handleRowSelect}>
                    <TableHeader enableSelectAll={true} displaySelectAll={true}>
                        <TableRow>
                            <TableHeaderColumn key={0}>H1</TableHeaderColumn>
                            <TableHeaderColumn key={1}>H2</TableHeaderColumn>
                            <TableHeaderColumn key={2}>H3</TableHeaderColumn>
                            <TableHeaderColumn key={3}>H4</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false} showRowHover={true} displayRowCheckbox={true}>
                        { [1,2,3,4].map(function(e, i) {
                            return (<TableRow key={i} selectable={true}>
                                { [1,2,3,4].map(function(e, j) {
                                    return (<TableRowColumn key={j}>{'C' + j}</TableRowColumn>);
                                }) }
                            </TableRow>);
                        }) }
                    </TableBody>
                </Table>
            </div>
            );
    },

    _handleTouchTap() {
        this.refs.superSecretPasswordDialog.show();
    },

});