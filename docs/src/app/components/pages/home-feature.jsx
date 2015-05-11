var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link,
  mui = require('mui'),
  Paper = mui.Paper;

class HomeFeature extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zDepth: 0
    };

    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
  }

  render() {
    return (
      <Paper className="home-feature" zDepth={this.state.zDepth} 
        onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <h3 className="home-feature-heading">{this.props.heading}</h3>
        <Link to={this.props.route}><img className="home-feature-image" src={this.props.img} /></Link>
      </Paper>
    );
  }

  _onMouseOver() {
    this.setState({
      zDepth: 4
    });
  }

  _onMouseOut() {
    this.setState({
      zDepth: 0
    });
  }

}

HomeFeature.propTypes = {
  heading: React.PropTypes.string,
  route: React.PropTypes.string,
  img: React.PropTypes.string
};

module.exports = HomeFeature;
