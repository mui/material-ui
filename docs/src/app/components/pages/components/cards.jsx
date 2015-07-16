let React = require('react');
let mui = require('material-ui');
let ComponentDoc = require('../../component-doc');

let {
  Avatar,
  Card,
  CardActions,
  CardExpandable,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
  FlatButton
} = mui;


class CardPage extends React.Component {

  constructor(props) {
    super(props);

    this.code = `
       <Card>
          <CardHeader
            title="Title"
            subtitle="Subtitle"
            avatar={<Avatar>A</Avatar>}/>
          <CardHeader
            title="Demo Url Based Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"/>
          <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardTitle title="Title" subtitle="Subtitle"/>
          <CardActions>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
        <Card initiallyExpanded={true}>
          <CardHeader
            title="Title"
            subtitle="Subtitle"
            avatar={<Avatar style={{color:'red'}}>A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>`;

    this.desc =
      'A card is a piece of paper with unique related data that serves as an '+
      'entry point to more detailed information. For example, a card could '+
      'contain a photo, text, and a link about a single subject.'+
      '\n\n'+
      'Cards have a constant width and variable height. The maximum height is '+
      'limited to the height of the available space on a platform, '+
      'but it can temporarily expand (for example, to display a comment field). '+
      'Cards do not flip over to reveal information on the back.';


    this.componentInfo = [
      {
        name: 'Card.Props',
        infoArray: [
          {
            name: 'initiallyExpanded',
            type: 'bool',
            header: 'optional',
            desc: 'Whether this card is initially expanded.',
          },
        ],
      },
      {
        name: 'Props',
        infoArray: [
          {
            name: 'expandable',
            type: 'bool',
            header: 'optional',
            desc: 'Whether this card component is expandable. Can be set on any child of the Card component.',
          },
          {
            name: 'showExpandableButton',
            type: 'bool',
            header: 'optional',
            desc: 'Whether this card component include a button to expand the card. CardTitle, CardHeader ' +
                  'and CardActions implement showExpandableButton. Any child component of Card can implements ' +
                  'showExpandableButton or forwards the property to a child component supporting it.',
          },
        ],
      },
    ];
  }

  render() {
    return (
      <ComponentDoc
        name="Card"
        code={this.code}
        desc={this.desc}
        componentInfo={this.componentInfo}>
          <Card>
            <CardHeader
              title="Title"
              subtitle="Subtitle"
              avatar={<Avatar style={{color:'red'}}>A</Avatar>}/>
            <CardHeader
              title="Demo Url Based Avatar"
              subtitle="Subtitle"
              avatar="http://lorempixel.com/100/100/nature/"/>
            <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
              <img src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardTitle title="Title" subtitle="Subtitle"/>
            <CardActions>
              <FlatButton label="Action1"/>
              <FlatButton label="Action2"/>
            </CardActions>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
          <br />
          <Card initiallyExpanded={true}>
            <CardHeader
              title="Title"
              subtitle="Subtitle"
              avatar={<Avatar style={{color:'red'}}>A</Avatar>}
              showExpandableButton={true}>
            </CardHeader>
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions expandable={true}>
              <FlatButton label="Action1"/>
              <FlatButton label="Action2"/>
            </CardActions>
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
      </ComponentDoc>
    );
  }

}

module.exports = CardPage;
