# react-dform

Schema-based dynamic forms for React. It uses the schema defined as expected by [dform](https://github.com/rbaron/dform). In addition to the dynamic form component (`DForm`), there's also a built-in `SchemaEditor` component for creating and validating schemas:

![Built-in schema editor](http://i.imgur.com/GVC3KPE.gif)

# Installation

```sh
$ npm install react-dform
```

# Example

 In the following example, the `schema` variable defines a schema in which `input3` is only shown if `input1` is `true` _and_ `input2` is not empty:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { DForm } from 'react-dform'

const schema = {
  cond: {
    type: 'always_true',
  },
  fields: [{
    type: 'boolean',
    id: 'input1',
    label: 'input1',
  }, {
    type: 'string',
    id: 'input2',
    label: 'input2',
  }],
  children: [{
    cond: {
      type: 'and',
      conds: [{
        type: 'truthy',
        field_id: 'input1',
      }, {
        type: 'not_empty',
        field_id: 'input2',
      }],
    },
    fields: [{
      type: 'boolean',
      id: 'input3',
      label: 'input3',
    }],
  }],
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <DForm schema={schema} state={this.state} onChange={this.setState.bind(this)} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
)
```

# Running the editor

There are two ways to run the editor:

1. In your own app:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaEditor } from 'react-dform'

class App extends React.Component {
  render() {
    return (
      <SchemaEditor onSchemaChange={s => console.log('New valid schema:', s)} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app'),
);
```

2. Cloning this repo and running:

```sh
$ npm run watch
```

This will run a dev server with the editor on http://localhost:8080/.

# License

MIT
