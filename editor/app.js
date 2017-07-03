import React from 'react';
import ReactDOM from 'react-dom';

import { SchemaEditor } from '../src'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      useLabelsAsKeys: false,
    }
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor='useLabelsAsKeys'>Use labels as keys?
            <input
                type='checkbox'
                id='useLabelsAsKeys'
                checked={this.state.useLabelsAsKeys}
                onChange={e => this.setState({useLabelsAsKeys: e.target.checked})} />
          </label>
        </div>
        <SchemaEditor
            useLabelsAsKeys={this.state.useLabelsAsKeys} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
