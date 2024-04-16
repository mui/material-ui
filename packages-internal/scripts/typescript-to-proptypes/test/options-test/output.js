import PropTypes from 'prop-types';
function Foo(props) {
  const { PropA, TestProps } = props;
  return <div></div>;
}

Foo.propTypes = {
  // Proptypes generated automatically
  PropA: PropTypes.string.isRequired,
  TestProps: PropTypes.object.isRequired,
};

export default Foo;
