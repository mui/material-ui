var React = require('react');
var mui = require('mui');
var Colors = mui.Styles.Colors;
var Avatar = mui.Avatar;
var FontIcon = mui.FontIcon;
var List = mui.List;
var ListItem = mui.ListItem;
var ComponentDoc = require('../../component-doc.jsx');
var FileFolder = require('../../svg-icons/file-folder.jsx');

class AvatarsPage extends React.Component {

  render() {

    var code = `
      //image avatar
      <Avatar src="images/uxceo-128.jpg" />

      //SvgIcon avatar
      <Avatar icon={<FileFolder />} />

      //SvgIcon avatar with custom colors
      <Avatar
        icon={<FileFolder />}
        color={Colors.orange200}
        backgroundColor={Colors.pink400} />

      //FontIcon avatar
      <Avatar
        icon={
          <FontIcon className="muidocs-icon-communication-voicemail" />
        } />

      //FontIcon avatar with custom colors
      <Avatar
        icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
        color={Colors.blue300}
        backgroundColor={Colors.indigo900} />

      //Letter avatar
      <Avatar>A</Avatar>

      //Letter avatar with custom colors
      <Avatar
        color={Colors.deepOrange300}
        backgroundColor={Colors.purple500}>
        A
      </Avatar>
    `;

    var desc = null;

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'icon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be used inside the avatar.'
          },
          {
            name: 'backgroundColor',
            type: 'string',
            header: 'default: grey400',
            desc: 'The backgroundColor of the avatar. Does not apply to image avatars.'
          },
          {
            name: 'color',
            type: 'string',
            header: 'default: white',
            desc: 'The icon or letter color.'
          },
          {
            name: 'src',
            type: 'string',
            header: 'optional',
            desc: 'If passed in, this component will render an img element. Otherwise, a div will be rendered.'
          }
        ]
      }
    ];

    var imageAvatar = <Avatar src="images/uxceo-128.jpg" />;
    var svgAvatar = <Avatar icon={<FileFolder />} />;
    var customSvgAvatar = <Avatar icon={<FileFolder />} color={Colors.orange200} backgroundColor={Colors.pink400} />;
    var fontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />;
    var customFontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} color={Colors.blue300} backgroundColor={Colors.indigo900} />;
    var letterAvatar = <Avatar>A</Avatar>;
    var customLetterAvatar = <Avatar color={Colors.deepOrange300} backgroundColor={Colors.purple500}>A</Avatar>;

    return (
      <ComponentDoc
        name="Avatars"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <List>
          <ListItem leftAvatar={imageAvatar} disableTouchTap={true}>Image Avatar</ListItem>
          <ListItem leftAvatar={svgAvatar} disableTouchTap={true}>SvgIcon Avatar</ListItem>
          <ListItem leftAvatar={customSvgAvatar} disableTouchTap={true}>SvgIcon Avatar with custom colors</ListItem>
          <ListItem leftAvatar={fontAvatar} disableTouchTap={true}>FontIcon Avatar</ListItem>
          <ListItem leftAvatar={customFontAvatar} disableTouchTap={true}>FontIcon Avatar with custom colors</ListItem>
          <ListItem leftAvatar={letterAvatar} disableTouchTap={true}>Letter Avatar</ListItem>
          <ListItem leftAvatar={customLetterAvatar} disableTouchTap={true}>Letter Avatar with custom colors</ListItem>
        </List>

      </ComponentDoc>
    );

  }

}

module.exports = AvatarsPage;
