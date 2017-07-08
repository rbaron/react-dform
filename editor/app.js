import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { css } from 'aphrodite'

import { SchemaEditor } from '../src'
import styles from '../src/styles'

injectTapEventPlugin()


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      useLabelsAsKeys: true,
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={css(styles.body)}>
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
              allowedKeys={null}
              useLabelsAsKeys={this.state.useLabelsAsKeys} />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
