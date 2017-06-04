import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderForm } from 'dform'


class DForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.inputFactories = {
      'boolean': this.booleanFactory.bind(this),
      'string': this.stringFactory.bind(this),
    }
  }

  booleanFactory(args) {
    const { state } = this.props
    return (
      <div key={args.id}>
        <label htmlFor={args.id}>{args.label}</label>
        <input
            type="checkbox"
            id={args.id}
            value={state[args.id] || false}
            onChange={e => this.onChange(args.id, e.target.checked)} />
      </div>
    )
  }

  stringFactory(args) {
    const { state } = this.props
    return (
      <div key={args.id}>
        <label htmlFor={args.id}>{args.label}</label>
        <input
            type="text"
            id={args.id}
            value={state[args.id] || ''}
            onChange={e => this.onChange(args.id, e.target.value)} />
      </div>
    )
  }

  onChange(id, newVal) {
    const { onChange, state } = this.props
    this.props.onChange({
      ...state,
      [id]: newVal,
    });
  }

  render() {
    const { state, schema } = this.props
    return (
      <div>
      { renderForm(state, schema, this.inputFactories) }
      </div>
    )
  }
}

export { DForm }
