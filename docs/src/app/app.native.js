import React from 'react-native';
import Subheader from 'material-ui/lib/Subheader/Subheader';

const {
  StyleSheet,
  Text,
  View,
} = React;

class App extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>
          Material-UI
        </Text>
        <Subheader>
          Subheader
        </Subheader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    paddingTop: 15,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
