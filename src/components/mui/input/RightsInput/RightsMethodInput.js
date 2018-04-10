import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

class RightsMethodInput extends Component {
  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.state = {
      checked: this.props.active
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.active !== nextProps.active) {
      this.setState({ checked: nextProps.active });
    }
  }

  componentDidUpdate() {
    this.props.onChange(this);
  }

  handleToggleClick(evt, chk) {
    this.setState({ checked: chk });
  }

  render() {
    return (
      <Toggle
        label=""
        toggled={this.state.checked}
        disabled={this.props.disabled}
        labelPosition="right"
        style={{ width: 'auto', margin: 'auto' }}
        onToggle={(evt, checked) => this.handleToggleClick(evt, checked)}
      />
    );
  }
}

RightsMethodInput.propTypes = {
  method: PropTypes.string,
  active: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default RightsMethodInput;
