import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderForm } from 'dform'


class DForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    useLabelsAsKeys: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    useLabelsAsKeys: false,
  }

  constructor(props) {
    super(props)

    this.inputFactories = {
      'boolean': this.booleanFactory.bind(this),
      'string': this.stringFactory.bind(this),
    }
  }

  _makeKey(args) {
    return this.props.useLabelsAsKeys ? args.label : args.id;
  }

  booleanFactory(args) {
    const { state } = this.props
    const key = this._makeKey(args);
    return (
      <div key={key}>
        <label htmlFor={key}>{args.label}
          <input
              type="checkbox"
              id={key}
              checked={state[key] || false}
              onChange={e => this.onChange(key, e.target.checked)} />
        </label>
      </div>
    )
  }

  stringFactory(args) {
    const { state } = this.props
    const key = this._makeKey(args);
    return (
      <div key={key}>
        <label htmlFor={key}>{args.label}</label>
        <input
            type="text"
            id={key}
            value={state[key] || ''}
            onChange={e => this.onChange(key, e.target.value)} />
      </div>
    )
  }

  onChange(key, newVal) {
    const { onChange, state } = this.props
    this.props.onChange({
      ...state,
      [key]: newVal,
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
