Foo.propTypes = {
  optionalType: PropTypes.oneOf(['one', 'two']),
  requiredType: PropTypes.oneOf(['one', 'two']).isRequired,
};
