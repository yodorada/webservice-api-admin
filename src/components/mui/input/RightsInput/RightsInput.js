import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RightsResources from './RightsResources';
import './styles.css';

class RightsInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(t) {
    var rights = [];

    for (var ref in this.refs) {
      rights.push({
        key: this.refs[ref].props.alias,
        label: this.refs[ref].props.label,
        resources: this.refs[ref].state.resources
      });
    }

    this.props.input.onChange(rights);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="rightsinput" style={{ marginTop: 20 }}>
        {this.props.input.value.map((right, n) => (
          <RightsResources
            ref={`rightsinput_${n}`}
            key={`rightsinput_${n}`}
            num={n}
            alias={right.key}
            resources={right.resources}
            label={right.label}
            onChange={targ => this.handleChange(targ)}
          />
        ))}
      </div>
    );
  }
}

RightsInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  input: PropTypes.object
};

RightsInput.defaultProps = {
  addField: true
};

export default RightsInput;
