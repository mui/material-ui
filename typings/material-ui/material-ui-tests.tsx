///<reference path='../react/react.d.ts' />
///<reference path='../react/react-addons-linked-state-mixin.d.ts' />
///<reference path='material-ui.d.ts' />

import * as React from "react";
import * as LinkedStateMixin from "react-addons-linked-state-mixin";
import Checkbox = require("material-ui/lib/checkbox");
import Colors = require("material-ui/lib/styles/colors");
import AppBar = require("material-ui/lib/app-bar");
import Badge = require("material-ui/lib/badge");
import IconButton = require("material-ui/lib/icon-button");
import FlatButton = require("material-ui/lib/flat-button");
import Avatar = require("material-ui/lib/avatar");
import FontIcon = require("material-ui/lib/font-icon");
import Typography = require("material-ui/lib/styles/typography");
import RaisedButton = require("material-ui/lib/raised-button");
import FloatingActionButton = require("material-ui/lib/floating-action-button");
import Card = require("material-ui/lib/card/card");
import CardHeader = require("material-ui/lib/card/card-header");
import DatePicker = require("material-ui/lib/date-picker/date-picker");
import CardText = require("material-ui/lib/card/card-text");
import CardActions = require("material-ui/lib/card/card-actions");
import Dialog = require("material-ui/lib/dialog");
import DropDownMenu = require("material-ui/lib/drop-down-menu");
import RadioButtonGroup = require("material-ui/lib/radio-button-group");
import RadioButton = require("material-ui/lib/radio-button");
import Toggle = require("material-ui/lib/toggle");
import TextField = require("material-ui/lib/text-field");
import SelectField = require("material-ui/lib/select-field");
import IconMenu = require("material-ui/lib/menus/icon-menu");
import Menu = require('material-ui/lib/menus/menu');
import MenuItem = require('material-ui/lib/menus/menu-item');
import MenuDivider = require('material-ui/lib/menus/menu-divider');
import ThemeManager = require('material-ui/lib/styles/theme-manager');
import GridList = require('material-ui/lib/grid-list/grid-list');
import GridTile = require('material-ui/lib/grid-list/grid-tile');


import NavigationClose = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/navigation/close", but they aren't defined yet.
import FileFolder = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/file/folder", but they aren't defined yet.
import ToggleStar = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/toggle/star", but they aren't defined yet.
import ActionGrade = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/action/grade", but they aren't defined yet.
import ToggleStarBorder = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/toggle/star-border", but they aren't defined yet.
import ArrowDropRight = require("material-ui/lib/svg-icon");  // TODO: Should actually import the actual "material-ui/lib/svg-icons/toggle/star-border", but they aren't defined yet.

type CheckboxProps = __MaterialUI.CheckboxProps;
type MuiTheme = __MaterialUI.Styles.MuiTheme;
type TouchTapEvent = __MaterialUI.TouchTapEvent;

class MaterialUiTests extends React.Component<{}, {}> implements React.LinkedStateMixin {

    // injected with mixin
    linkState: <T>(key: string) => React.ReactLink<T>;
    dialog: Dialog;

    private touchTapEventHandler(e: TouchTapEvent) {
        this.dialog.show();
    }
    private formEventHandler(e: React.FormEvent) {
    }
    private selectFieldChangeHandler(e: TouchTapEvent, si: number, mi: any) {
    }

    render() {

        // "http://material-ui.com/#/customization/themes"
        let muiTheme: MuiTheme = ThemeManager.getMuiTheme({
            palette: {
                accent1Color: Colors.cyan100
            },
            spacing: {

            }
        });

        // "http://material-ui.com/#/customization/inline-styles"
        let element: React.ReactElement<any>;
        element = <Checkbox
            id="checkboxId1"
            name="checkboxName1"
            value="checkboxValue1"
            label="went for a run today"
            style={{
                width: '50%',
                margin: '0 auto'
            }}
            iconStyle={{
                fill: '#FF4081'
            }}/>
        element = React.createElement<CheckboxProps>(Checkbox, {
            id: "checkboxId1", name: "checkboxName1", value: "checkboxValue1", label: "went for a run today", style: {
                width: '50%',
                margin: '0 auto'
            }, iconStyle: {
                fill: '#FF4081'
            }
        });

        // "http://material-ui.com/#/components/appbar"
        element = <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more" />
        element = <AppBar
            title="Title"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />} />;

        // "http://material-ui.com/#/components/avatars"
        //image avatar
        element = <Avatar src="images/uxceo-128.jpg" />;
        //SvgIcon avatar
        element = <Avatar icon={<FileFolder />} />;
        //SvgIcon avatar with custom colors
        element = <Avatar
            icon={<FileFolder />}
            color={Colors.orange200}
            backgroundColor={Colors.pink400} />;
        //FontIcon avatar
        element = <Avatar
            icon={
            <FontIcon className="muidocs-icon-communication-voicemail" />
            } />;
        //FontIcon avatar with custom colors
        element = <Avatar
            icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
            color={Colors.blue300}
            backgroundColor={Colors.indigo900} />;
        //Letter avatar
        element = <Avatar>A</Avatar>;
        //Letter avatar with custom colors
        element = <Avatar
            color={Colors.deepOrange300}
            backgroundColor={Colors.purple500}>
            </Avatar>

        // "http://material-ui.com/#/components/badge"
        element = <Badge badgeContent={<span>Hello</span>}>
                    <Avatar color={Colors.deepOrange300} />
                  </Badge>;
        element = <Badge
                    primary
                    badgeContent={<span>Hello</span>}
                    badgeStyle={{height: '24px', width: '24px'}}
                  >
                    This text has a badge!
                  </Badge>;

        // "http://material-ui.com/#/components/buttons"
        element = <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">
        <FontIcon style={{ color: Typography.textFullWhite }} className="muidocs-icon-custom-github"/>
            </FlatButton>;
        element = <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true} label="GitHub">
        <FontIcon style={{ color: Typography.textFullWhite }} className="muidocs-icon-custom-github"/>
            </RaisedButton>;
        element = <FloatingActionButton secondary={true} mini={true} linkButton={true}
            href="https://github.com/callemall/material-ui" >
            <ToggleStar />
            </FloatingActionButton>;

        // "http://material-ui.com/#/components/cards"
        element = <Card initiallyExpanded={true}>
        <CardHeader
            title="Title"
            subtitle="Subtitle"
            avatar={<Avatar style={{ color: 'red' }}>A</Avatar>}
            showExpandableButton={true}>
            </CardHeader>
        <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
        <CardActions expandable={true}>
        <FlatButton label="Action1"/>
        <FlatButton label="Action2"/>
            </CardActions>
        <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
            </Card>;

        // "http://material-ui.com/#/components/date-picker"
        element = <DatePicker
            floatingLabelText="Floating Label Text" />;
        element = <DatePicker
            hintText="Hint Text" />;

        // "http://material-ui.com/#/components/dialog"
        let standardActions = [
            { text: 'Cancel' },
            { text: 'Submit', onTouchTap: this.touchTapEventHandler, ref: 'submit' }
        ];

        element = <Dialog
            title="Dialog With Standard Actions"
            actions={standardActions}
            actionFocus="submit"
            modal={true}>
            The actions in this window are created from the json that's passed in.
            </Dialog>;

        //Custom Actions
        let customActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.touchTapEventHandler} />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.touchTapEventHandler} />
        ];

        element = <Dialog
            title="Dialog With Custom Actions"
            actions={customActions}
            modal={false}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}>
            The actions in this window were passed in as an array of react objects.
            </Dialog>;


        // "http://material-ui.com/#/components/dropdown-menu"
        let menuItems = [
            { payload: '1', text: 'Never' },
            { payload: '2', text: 'Every Night' },
            { payload: '3', text: 'Weeknights' },
            { payload: '4', text: 'Weekends' },
            { payload: '5', text: 'Weekly' },
        ];
        element = <DropDownMenu menuItems={menuItems} />;

        // "http://material-ui.com/#/components/icons"
        element = <FontIcon className= "material-icons" color= { Colors.red500 } > home</FontIcon>;

        // "http://material-ui.com/#/components/icon-buttons"
        //Method 1: muidocs-icon-github is defined in a style sheet.
        element = <IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>;
        //Method 2: ActionGrade is a component created using mui.SvgIcon.
        element = <IconButton tooltip= "Star" touch= { true}>
        <ActionGrade/>
            </IconButton >;
        //Method 3: Manually creating a mui.FontIcon component within IconButton
        element = <IconButton tooltip= "Sort" disabled= {true}>
        <FontIcon className="muidocs-icon-custom-sort"/>
            </IconButton>;
        //Method 4: Using Google material-icons
        element = <IconButton iconClassName="material-icons" tooltipPosition="bottom-center"
            tooltip="Sky">settings_system_daydream</IconButton>;

        // "http://material-ui.com/#/components/icon-menus"
        element = <IconMenu iconButtonElement={<IconButton />}>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>;

        // "http://material-ui.com/#/components/left-nav"


        // "http://material-ui.com/#/components/lists"


        // "http://material-ui.com/#/components/menus"
        element = <Menu>
                <MenuItem primaryText="Maps" />
                <MenuItem primaryText="Books" />
                <MenuItem primaryText="Flights" />
                <MenuItem primaryText="Apps" />
            </Menu>;
        element = <Menu desktop={true} width={320}>
                <MenuItem primaryText="Bold" secondaryText="&#8984;B" />
                <MenuItem primaryText="Italic" secondaryText="&#8984;I" />
                <MenuItem primaryText="Underline" secondaryText="&#8984;U" />
                <MenuItem primaryText="Strikethrough" secondaryText="Alt+Shift+5" />
                <MenuItem primaryText="Superscript" secondaryText="&#8984;." />
                <MenuItem primaryText="Subscript" secondaryText="&#8984;," />
                <MenuDivider />
                <MenuItem primaryText="Paragraph styles" rightIcon={<ArrowDropRight />} />
                <MenuItem primaryText="Align" rightIcon={<ArrowDropRight />} />
                <MenuItem primaryText="Line spacing" rightIcon={<ArrowDropRight />} />
                <MenuItem primaryText="Numbered list" rightIcon={<ArrowDropRight />} />
                <MenuItem primaryText="List options" rightIcon={<ArrowDropRight />} />
                <MenuDivider />
                <MenuItem primaryText="Clear formatting" secondaryText="&#8984;/" />
            </Menu>;

        // "http://material-ui.com/#/components/paper"


        // "http://material-ui.com/#/components/progress"


        // "http://material-ui.com/#/components/refresh-indicator"


        // "http://material-ui.com/#/components/sliders"


        // "http://material-ui.com/#/components/switches"
        element = <Checkbox
            name="checkboxName2"
            value="checkboxValue2"
            label="fed the dog"
            defaultChecked={true}/>;
        element = <Checkbox
            name = "checkboxName3"
            value = "checkboxValue3"
            label = "built a house on the moon"
            disabled = {true}/>;
        element = <Checkbox
            name="checkboxName4"
            value="checkboxValue4"
            checkedIcon={<ToggleStar />}
            unCheckedIcon={<ToggleStarBorder />}
            label="custom icon" />;

        element = <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
        <RadioButton
            value="light"
            label="prepare for light speed"
            style={{ marginBottom: 16 }} />;
        <RadioButton
            value="not_light"
            label="light speed too slow"
            style={{ marginBottom: 16 }}/>;
        <RadioButton
            value="ludicrous"
            label="go to ludicrous speed"
            style={{ marginBottom: 16 }}
            disabled={true}/>
            </RadioButtonGroup>;

        element = <Toggle
            name="toggleName1"
            value="toggleValue1"
            label="activate thrusters"/>;

        element = <Toggle
            name = "toggleName2"
            value = "toggleValue2"
            label = "auto-pilot"
            defaultToggled = { true}/>;

        element = <Toggle
            name="toggleName3"
            value="toggleValue3"
            label="initiate self-destruct sequence"
            disabled={true}/>;

        // "http://material-ui.com/#/components/snackbar"


        // "http://material-ui.com/#/components/table"


        // "http://material-ui.com/#/components/tabs"


        // "http://material-ui.com/#/components/text-fields"
        element = <TextField
            hintText="Hint Text" />;
        element = <TextField
            hintText="Hint Text"
            defaultValue="Default Value" />;
        element = <TextField
            hintText = "Hint Text"
            value = { "value" }
            underlineStyle = {{ borderColor: Colors.green500 }}
            onChange = { this.formEventHandler } />;
        element = <TextField
            hintText="Custom Underline Focus Color"
            underlineFocusStyle={{ borderColor: Colors.amber900 }} />;
        element = <TextField
            hintText = "Hint Text"
            valueLink = { this.linkState<string>('valueLinkValue') } />;
        element = <TextField
            hintText="Hint Text (MultiLine)"
            multiLine={true} />;
        element = <TextField
            hintText = "The hint text can be as long as you want, it will wrap."
            multiLine = { true} />;
        element = <TextField
            hintText="Hint Text"
            errorText="The error text can be as long as you want, it will wrap." />;
        element = <TextField
            hintText = "Hint Text"
            errorText = { "error text" }
            onChange = { this.formEventHandler } />;
        element = <TextField
            hintText="Hint Text (custom error color)"
            errorText={"error text"}
            errorStyle={{ color: 'orange' }}
            onChange={ this.formEventHandler }
            defaultValue="Custom error color" />;
        element = <TextField
            hintText = "Disabled Hint Text"
            disabled = { true} />;
        element = <TextField
            hintText="Disabled Hint Text"
            disabled={true}
            defaultValue="Disabled With Value" />;

        //Select Fields
        let arbitraryArrayMenuItems = [
            {
                id: 0,
                name: "zero",
            },
        ];
        element = <SelectField
            value = { 0 }
            onChange = { this.selectFieldChangeHandler }
            hintText = "Hint Text"
            menuItems = { menuItems } />;
        element = <SelectField
            valueLink={this.linkState('selectValueLinkValue') }
            floatingLabelText="Float Label Text"
            valueMember="id"
            displayMember="name"
            menuItems={arbitraryArrayMenuItems} />;
        element = <SelectField
            valueLink = { this.linkState('selectValueLinkValue2') }
            floatingLabelText = "Float Custom Label Text"
            floatingLabelStyle = {{ color: "red" }}
            valueMember = "id"
            displayMember = "name"
            menuItems = { arbitraryArrayMenuItems } />;
        element = <SelectField
            value={0}
            onChange={ this.selectFieldChangeHandler }
            menuItems={arbitraryArrayMenuItems} />;

        //Floating Hint Text Labels
        element = <TextField
            hintText = "Hint Text"
            floatingLabelText = "Floating Label Text" />;
        element = <TextField
            hintText="Hint Text"
            defaultValue="Default Value"
            floatingLabelText="Floating Label Text" />;
        element = <TextField
            hintText = "Hint Text"
            floatingLabelText = "Floating Label Text"
            value = { "value" }
            onChange = { this.formEventHandler } />;
        element = <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
            valueLink={this.linkState<string>('floatingValueLinkValue') } />;
        element = <TextField
            hintText = "Hint Text (MultiLine)"
            floatingLabelText = "Floating Label Text"
            multiLine = { true} />;
        element = <TextField
            hintText="Hint Text"
            errorText={"floating text"}
            floatingLabelText="Floating Label Text"
            onChange={this.formEventHandler } />;
        element = <TextField
            hintText = "Hint Text"
            errorText = { "error text" }
            defaultValue = "abc"
            floatingLabelText = "Floating Label Text"
            onChange = { this.formEventHandler } />;
        element = <TextField
            hintText="Disabled Hint Text"
            disabled={true}
            floatingLabelText="Floating Label Text" />;
        element = <TextField
            hintText = "Disabled Hint Text"
            disabled = { true}
            defaultValue = "Disabled With Value"
            floatingLabelText = "Floating Label Text" />;
        element = <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password" />;
            

        // "http://material-ui.com/#/components/time-picker"


        // "http://material-ui.com/#/components/toolbars"
        
        // "http://material-ui.com/#/components/grid-list"
        element = <GridList
            cols={3}
            padding={50}
            cellHeight={200} />;
            
        element = <GridTile
            title="GridTileTitle"
            actionIcon={<h1>GridTile</h1>}
            actionPosition="left"
            titlePosition="top"
            titleBackground="rgba(0, 0, 0, 0.4)"
            cols={2}
            rows={1} >
            <h1>Children are Required!</h1>
            </GridTile>;

        return element;
    }
}
