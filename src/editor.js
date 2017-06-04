import React from 'react'
import ReactDOM from 'react-dom'

import { DForm } from './dform'

import styles from './editor.css'

const defaultSchema = {
    cond: {
      type: 'equals',
      field_id: 'showForm',
      field_value: true,
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
      }, {
          type: 'string',
          id: 'input4',
          label: 'input4',
      }],
    }],
}

class SchemaEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schema: defaultSchema,
      schemaText: JSON.stringify(defaultSchema, null, 2),
      schemaError: null,
      formState: {
        showForm: true,
      },
    }
    this.onFormChange = this.onFormChange.bind(this)
    this.onSchemaChange = this.onSchemaChange.bind(this)
  }

  onFormChange(newFormState) {
    this.setState({formState: newFormState})
  }

  onSchemaChange(newSchema) {
    this.setState({schemaText: newSchema})
    try {
      this.setState({
        schema: JSON.parse(newSchema),
        schemaError: null,
      })
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
          schema={this.state.schema} />
    )
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.col}>
          <h1>Schema</h1>
          <textarea
              className={styles.textarea}
              rows={30}
              value={this.state.schemaText}
              onChange={e => this.onSchemaChange(e.target.value)}/>
        </div>
        <div className={styles.col}>
          <h1>Form</h1>
          { this.renderForm() }
        </div>
      </div>
    )
  }
}

export { SchemaEditor }
