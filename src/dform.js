import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderForm } from 'dform'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  line: {
    display: 'flex',
    'justify-content': 'space-between',
    'word-wrap': 'break-all',
  },
})

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
      'options': this.optionsFactory.bind(this),
    }
  }

  _makeKey(args) {
    return this.props.useLabelsAsKeys ? args.label : args.id;
  }

  booleanFactory(args) {
    const { state } = this.props
    const key = this._makeKey(args);
    return (
      <div key={key} className={css(styles.line)}>
        <label htmlFor={key}>{args.label}</label>
        <input
            type="checkbox"
            id={key}
            checked={state[key] || false}
            onChange={e => this.onChange(key, e.target.checked)} />
      </div>
    )
  }

  optionsFactory(args) {
    const { state } = this.props
    const key = this._makeKey(args)
    const optsWithUndef = [
      {id: undefined, label: undefined},
      ...args.options,
    ]
    const opts = optsWithUndef.map(option => {
      const key = this._makeKey(option)
      return <option key={key || 'undef'} value={key}>{option.label}</option>
    })
    return (
      <div key={key} className={css(styles.line)}>
        <label htmlFor={key}>{args.label}</label>
        <select
            id={key}
            value={state[key] || ''}
            onChange={e => this.onChange(key, e.target.value)}>
          {opts}
        </select>
      </div>
    )
  }

  stringFactory(args) {
    const { state } = this.props
    const key = this._makeKey(args);
    return (
      <div key={key} className={css(styles.line)}>
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
