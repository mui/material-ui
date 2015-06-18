var React = require('react');
var mui = require('mui');
var ComponentDoc = require('../../component-doc.jsx');
var {Card, CardMedia, CardTitle, CardActions, CardText, CardHeader, FlatButton, Avatar} = mui;

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


    this.componentInfo = [];
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
      </ComponentDoc>
    );
  }

}

module.exports = CardPage;
