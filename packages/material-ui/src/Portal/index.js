import ReactDOM from 'react-dom';
import Portal from './Portal';
import LegacyPortal from './LegacyPortal';

export default (ReactDOM.createPortal ? Portal : LegacyPortal);
