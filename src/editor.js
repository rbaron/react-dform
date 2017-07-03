import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite'

import { DForm } from './dform'
import { exampleSchema, exampleSchemaLabelAsKeys } from './exampleSchemas'


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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.useLabelsAsKeys !== this.props.useLabelsAsKeys) {
      this.setState(this._makeInitialState(nextProps))
    }
  }

  _makeInitialState(props) {
    const schema = props.defaultSchema || (props.useLabelsAsKeys ? exampleSchemaLabelAsKeys : exampleSchema)

    return {
      schema,
      schemaText: JSON.stringify(schema, null, 2),
      schemaError: null,
      formState: {
        showForm: true,
      },
    }

  }

  onFormChange(newFormState) {
    this.setState({formState: newFormState})
  }

  onSchemaChange(newSchema) {
    this.setState({schemaText: newSchema})
    try {
      const json = JSON.parse(newSchema)
      this.setState({
        schema: json,
        schemaError: null,
      })
      this.props.onSchemaChange(json)
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.setState({schemaError: e.message});
      }
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
          <textarea
              className={css(styles.textarea)}
              rows={30}
              value={this.state.schemaText}
              onChange={e => this.onSchemaChange(e.target.value)}/>
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
