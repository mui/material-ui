import fakeRestDataProvider from 'ra-data-fakerest';
import data from './data.json';

const dataProvider = fakeRestDataProvider(data, true);

export default dataProvider;
