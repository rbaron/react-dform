import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json'
import 'brace/theme/github'


import { DForm } from './dform'
import { exampleSchema, exampleSchemaLabelAsKeys } from './exampleSchemas'
import { validateSchema } from './validation'


const styles = StyleSheet.create({
  app: {
    display: 'flex',
    height: '100%',
  },
  editorCol: {
    width: '40%',
  },
  formCol: {
    width: '30%',
    'padding-right': '30px',
  },
  formStateCol: {
    width: '30%',
  },
  table: {
    'border-collapse': 'collapse',
  },
  borderTable: {
    'border': '1px solid black',
    padding: 4,
  },
  textarea: {
    width: '90%',
    'font-size': '15px',
  },
})

class SchemaEditor extends React.Component {
  static propTypes = {
    allowedKeys: PropTypes.instanceOf(Set),
    defaultSchema: PropTypes.object,
    onSchemaChange: PropTypes.func.isRequired,
    useLabelsAsKeys: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    onSchemaChange: () => {},
    useLabelsAsKeys: false,
  }

  constructor(props) {
    super(props)

    this.state = this._makeInitialState(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.onSchemaChange = this.onSchemaChange.bind(this)
    this._keyExtractor = this._keyExtractor.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.useLabelsAsKeys !== this.props.useLabelsAsKeys) {
      this.setState(this._makeInitialState(nextProps), () =>
        this.onSchemaChange(this.state.schemaText))
    }
  }

  componentDidMount() {
    this.onSchemaChange(this.state.schemaText)
  }

  _keyExtractor(args) {
    return this.props.useLabelsAsKeys ? args.label : args.id;
  }

  _makeInitialState(props) {
    const schema = props.defaultSchema || (props.useLabelsAsKeys ? exampleSchemaLabelAsKeys : exampleSchema)

    return {
      schema,
      schemaText: JSON.stringify(schema, null, 2),
      schemaError: null,
      formState: {
      },
    }
  }

  onFormChange(newFormState) {
    this.setState({formState: newFormState})
  }

  onSchemaChange(newSchema) {
    this.setState({schemaText: newSchema})

    try {
      const json = validateSchema(newSchema, this._keyExtractor, this.props.allowedKeys)
      this.setState({
        schema: json,
        schemaError: null,
      })
      this.props.onSchemaChange(json)
    } catch (e) {
      this.setState({schemaError: e.message});
    }
  }

  renderForm() {
    if (this.state.schemaError) {
      return (
        <div>
          Error on Schema:
          { this.state.schemaError }
        </div>
      )
    }

    return (
      <DForm
          keyExtractor={this._keyExtractor}
          onChange={this.onFormChange}
          state={this.state.formState}
          schema={this.state.schema}
          useLabelsAsKeys={this.props.useLabelsAsKeys} />
    )
  }

  renderFormState() {
    return (
      <table className={css(styles.table)}>
        <tbody>
          { Object.entries(this.state.formState).map(([k, v]) => (
              <tr key={k}>
                <td className={css(styles.borderTable)}>{k}</td>
                <td className={css(styles.borderTable)}>{`${v}`}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className={css(styles.app)}>
        <div className={css(styles.editorCol)}>
          <h1>Schema</h1>
          <AceEditor
              mode="json"
              theme="github"
              value={this.state.schemaText}
              onChange={schemaText => this.onSchemaChange(schemaText)}
              name="schema-editor-123"
              editorProps={{$blockScrolling: Infinity}}
          />
        </div>
        <div className={css(styles.formCol)}>
          <h1>Form</h1>
          { this.renderForm() }
        </div>
        <div className={css(styles.formStateCol)}>
          <h1>State</h1>
          { this.renderFormState() }
        </div>
      </div>
    )
  }
}

export { SchemaEditor }
