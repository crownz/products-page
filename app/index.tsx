import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Styles from './index.css';

import App from './components/App';

ReactDOM.render(
  <div className={Styles.container}>
    <App />
  </div>,
  document.getElementById('root')
);
