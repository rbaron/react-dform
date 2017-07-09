import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { activeFields, renderForm } from 'dform'
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
    this.state = {}
  }

  booleanFactory(args) {
    const { keyExtractor } = this.props
    const key = keyExtractor(args);
    return (
      <div key={key} className={css(styles.line)}>
        <label htmlFor={key}>{args.label}</label>
        <input
            type="checkbox"
            id={key}
            checked={this.state[key] || false}
            onChange={e => this.onChange(key, e.target.checked)} />
      </div>
    )
  }

  optionsFactory(args) {
    const { keyExtractor } = this.props
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
            value={this.state[key] || ''}
            onChange={e => this.onChange(key, e.target.value)}>
          {opts}
        </select>
      </div>
    )
  }

  stringFactory(args) {
    const { keyExtractor } = this.props
    const key = keyExtractor(args);
    return (
      <div key={key} className={css(styles.line)}>
        <label htmlFor={key}>{args.label}</label>
        <input
            type="text"
            id={key}
            value={this.state[key] || ''}
            onChange={e => this.onChange(key, e.target.value)} />
      </div>
    )
  }

  renderForm() {
    const { schema } = this.props
    try {
      return renderForm(this.state, schema, this.inputFactories)
    } catch (e) {
      return `Error while rendering form: ${e}`;
    }
  }

  filterState() {
    const { keyExtractor, schema } = this.props
    const keys = activeFields(this.state, schema).map(keyExtractor)
    return keys.reduce((acc, k) => {
      if (this.state[k] !== undefined) {
        return { ...acc, [k]: this.state[k] }
      } else {
        return acc
      }
    }, {})
  }

  onChange(key, newVal) {
    const { onChange } = this.props
    this.setState({
      [key]: newVal
    }, () => onChange(this.filterState()))
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
