let React = require('react');
let { Avatar, FontIcon, List, ListItem, Styles } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let FileFolder = require('svg-icons/file/folder');
let { Colors } = Styles;

class AvatarsPage extends React.Component {

  render() {

    let code = `
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

    let desc = null;

    let componentInfo = [
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
            name: 'size',
            type: 'number',
            header: 'default: 40',
            desc: 'This is the size of the avatar in pixels'
          },
          {
            name: 'src',
            type: 'string',
            header: 'optional',
            desc: 'If passed in, this component will render an img element. Otherwise, a div will be rendered.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the root element.'
          },
        ]
      }
    ];

    let imageAvatar = <Avatar src="images/uxceo-128.jpg" />;
    let svgAvatar = <Avatar icon={<FileFolder />} />;
    let customSvgAvatar = <Avatar icon={<FileFolder />} color={Colors.orange200} backgroundColor={Colors.pink400} />;
    let fontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />;
    let customFontAvatar = <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} color={Colors.blue300} backgroundColor={Colors.indigo900} />;
    let letterAvatar = <Avatar>A</Avatar>;
    let customLetterAvatar = <Avatar color={Colors.deepOrange300} backgroundColor={Colors.purple500}>A</Avatar>;

    return (
      <ComponentDoc
        name="Avatars"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <List>
          <ListItem leftAvatar={imageAvatar} disabled={true}>Image Avatar</ListItem>
          <ListItem leftAvatar={svgAvatar} disabled={true}>SvgIcon Avatar</ListItem>
          <ListItem leftAvatar={customSvgAvatar} disabled={true}>SvgIcon Avatar with custom colors</ListItem>
          <ListItem leftAvatar={fontAvatar} disabled={true}>FontIcon Avatar</ListItem>
          <ListItem leftAvatar={customFontAvatar} disabled={true}>FontIcon Avatar with custom colors</ListItem>
          <ListItem leftAvatar={letterAvatar} disabled={true}>Letter Avatar</ListItem>
          <ListItem leftAvatar={customLetterAvatar} disabled={true}>Letter Avatar with custom colors</ListItem>
        </List>

      </ComponentDoc>
    );

  }

}

module.exports = AvatarsPage;
