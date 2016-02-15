import React from 'react-native';

const {
  StyleSheet,
  Text,
  View,
} = React;

const propTypes = {
  /**
   * Node that will be placed inside the `Subheader`.
   */
  children: React.PropTypes.node,

  /**
   * If true, the `Subheader` will be indented by `72px`.
   */
  inset: React.PropTypes.bool,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

const Subheader = (props) => {
  const {
    children,
    inset,
    style,
    ...other,
  } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.welcome}>
        {children}
      </Text>
    </View>
  );
};

Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;

const styles = StyleSheet.create({
  root: {
    height: 48,
    flex: 0,
    justifyContent: 'center',
    backgroundColor: '#fff', // To show the box sizing
  },
  welcome: {
    fontWeight: '500',
    paddingLeft: 16,
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
});


export default Subheader;
