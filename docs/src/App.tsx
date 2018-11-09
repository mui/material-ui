import * as React from 'react';
import Layout from './layout/Layout';
import Router from './Pages/Router';

class App extends React.Component {
  render() {
    return (
      <Layout toggleDirection={console.log} toggleThemeType={console.log}>
        <Router />
      </Layout>
    );
  }
}

export default App;
