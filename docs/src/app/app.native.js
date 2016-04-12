import React, {
  AppRegistry,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Presets,
  LookRoot,
} from 'react-look-native';

import Master from './components/Master.native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
});

const config = Presets['react-native'];

const App = () => (
  <ScrollView style={styles.root}>
    <StatusBar
      backgroundColor="#0090A3"
      translucent={true}
      barStyle="light-content"
    />
    <LookRoot config={config}>
      <Master />
    </LookRoot>
  </ScrollView>
);

export default {
  start() {
    AppRegistry.registerComponent('MaterialUIDocs', () => App);
  },
};
