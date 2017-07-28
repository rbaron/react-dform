import React from 'react'
import ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'

import { DForm } from '../src'
import { exampleLabelsGif } from '../src/exampleSchemas'


const styles = StyleSheet.create({
  'boolean': {
    'margin-top': '10px',
  },
  'container': {
    'font-family': 'Roboto',
    'width': '350px',
    'margin': '0 auto',
  },
})


class App extends React.Component {

  onFormChange = newState => {
    console.log('New form state:', newState)
  }

  keyExtractor = field => field.label

  render() {
    return (
      <div className={css(styles.container)}>
        <h1>Example dynamic form</h1>
        <DForm
            keyExtractor={this.keyExtractor}
            onChange={this.onFormChange}
            schema={exampleLabelsGif}
         />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
