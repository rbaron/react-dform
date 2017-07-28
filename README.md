# react-dform

<p align="center">
  <img src="http://i.imgur.com/NQryLC7.gif" />
</p>

[dform](https://github.com/rbaron/dform) is a set of libraries for managing dynamic forms. The dynamic forms are described through a JSON schema. Client libraries, such as this one, read a dform JSON schema and render forms accordingly.

This repository hosts a React client library for the web that takes as input a dform JSON schema and renders the appropiate dynamic form.

For React Native applications, check out [react-native-dform](https://github.com/rbaron/react-native-dform).

# Installation

```sh
$ npm install react-dform
```
or
```sh
$ yarn add react-dform
```

# Usage

This package exports a `<DForm>` component, which receives a `schema` prop and also a `onChange` callback function, which will be called whenever there's a change in the form's state.

# Example

This example is available in the `app/` directory. Note that, since this library relies on `material-ui`
for rendering each form input, it is unfortunately necessary to both call `injectTapEventPlugin()` and wrap
our application in the `<MuiThemeProvider>` component.


```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { DForm } from '../src'
import { exampleLabelsGif } from '../src/exampleSchemas'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

class App extends React.Component {

  onFormChange = newState => {
    console.log('New form state:', newState)
  }

  keyExtractor = field => field.label

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>Example dynamic form</h1>
          <DForm
              keyExtractor={this.keyExtractor}
              onChange={this.onFormChange}
              schema={exampleLabelsGif}
           />
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
```

The variable `exampleLabelsGif` contains the following dform schema, which describes the dynamic behavior of the form:

```javascript
export const exampleLabelsGif = {
  cond: {
    type: 'always_true'
  },
  fields: [{
    type: 'boolean',
    label: 'Example boolean'
  }, {
    type: 'options',
    label: 'Example options',
    options: [{
      label: 'Option #1'
    }, {
      label: 'Option #2'
    }, {
      label: 'Option #3'
    }],
  }],
  children: [{
    cond: {
      type: 'and',
      conds: [{
        type: 'truthy',
        field_id: 'Example boolean'
      }, {
        type: 'equals',
        field_id: 'Example options',
        field_value: 'Option #2'
      }],
    },
    fields: [{
      type: 'string',
      label: 'Example string'
    }],
    children: [{
      cond: {
        type: 'equals',
        field_id: 'Example string',
        field_value: 'Expected value',
      },
      fields: [{
        type: 'date',
        label: 'Example date',
      }],
    }],
  }],
}
```

To try this example, clone this repository and run:

```sh
$ npm run watch
```

This will run a dev server with the editor on http://localhost:8080/.

# License

MIT.
