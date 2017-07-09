import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { activeFields, defaultState, renderForm } from 'dform'
import { StyleSheet, css } from 'aphrodite'

import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const styles = StyleSheet.create({
  line: {
    'display': 'flex',
    'justify-content': 'space-between',
    'word-wrap': 'break-all',
    'margin': '10px 0',
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
    this.state = defaultState(props.schema, props.keyExtractor)
  }

  componentWillMount() {
    this.props.onChange(this.filterState())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schema !== this.props.schema) {
      this.setState(
        defaultState(nextProps.schema, nextProps.keyExtractor),
        () => nextProps.onChange(this.filterState()))
    }
  }

  booleanFactory(args) {
    const { keyExtractor } = this.props
    const key = keyExtractor(args);
    return (
      <div key={key} className={css(styles.line)}>
        <Toggle
          label={args.label}
          toggled={this.state[key]}
          onToggle={(evt, checked) => this.onChange(key, checked)}
        />
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
      return <MenuItem key={i} value={key} primaryText={option.label} />
    })
    return (
      <div key={key} className={css(styles.line)}>
        <SelectField
          floatingLabelText={args.label}
          fullWidth={true}
          value={this.state[key]}
          onChange={(evt, idx, val) => this.onChange(key, val)}
        >
          {opts}
        </SelectField>
      </div>
    )
  }

  stringFactory(args) {
    const { keyExtractor } = this.props
    const key = keyExtractor(args);
    return (
      <div key={key} className={css(styles.line)}>
        <TextField
          floatingLabelText={args.label}
          fullWidth={true}
          multiLine={true}
          onChange={(evt, val) => this.onChange(key, val)}
        />
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
