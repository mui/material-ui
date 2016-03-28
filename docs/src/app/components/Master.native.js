import React from 'react-native';
import Subheader from '../../../../src/Subheader/Subheader.native';

const {
  StyleSheet,
  Text,
  View,
} = React;

class Master extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.head}>
          <Text style={styles.title}>
            Material-UI
          </Text>
        </View>
        <Subheader inset={true}>
          Subheader
        </Subheader>
        <Subheader inset={false}>
          Subheader
        </Subheader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#00bcd4',
  },
  title: {
    color: '#fff',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Master;
