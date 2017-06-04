import React from 'react';
import ReactDOM from 'react-dom';

import { SchemaEditor } from '../src'

class App extends React.Component {
  render() {
    return (
      <SchemaEditor />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
