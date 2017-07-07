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
    keyExtractor: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    keyExtractor: field => field.id,
  }

  constructor(props) {
    super(props)

    this.inputFactories = {
      'boolean': this.booleanFactory.bind(this),
      'string': this.stringFactory.bind(this),
      'options': this.optionsFactory.bind(this),
    }
  }

  booleanFactory(args) {
    const { keyExtractor, state } = this.props
    const key = keyExtractor(args);
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
    const { keyExtractor, state } = this.props
    const key = keyExtractor(args)
    const optsWithUndef = [
      {id: undefined, label: undefined},
      ...args.options,
    ]
    const opts = optsWithUndef.map((option, i) => {
      const key = keyExtractor(option)
      return <option key={i} value={key}>{option.label}</option>
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
    const { keyExtractor, state } = this.props
    const key = keyExtractor(args);
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

  renderForm() {
    const { state, schema } = this.props
    try {
      return renderForm(state, schema, this.inputFactories)
    } catch (e) {
      return `Error while rendering form: ${e}`;
    }
  }

  onChange(key, newVal) {
    const { onChange, state } = this.props
    this.props.onChange({
      ...state,
      [key]: newVal,
    });
  }

  render() {
    return (
      <div>
        { this.renderForm() }
      </div>
    )
  }
}

export { DForm }
