import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Theme from '../../../../utils/Theme';
import RightsResourceInput from './RightsResourceInput';

class RightsResources extends Component {
  constructor(props) {
    super(props);
    this.handleSubToggleClick = this.handleSubToggleClick.bind(this);
    this.state = {
      resources: this.props.resources,
      update: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.update !== nextState.update && nextState.update;
  }

  componentDidUpdate() {
    this.setState({ update: false });
    this.props.onChange(this);
  }

  handleSubToggleClick(targ) {
    let res = [];
    for (var ref in this.refs) {
      res.push({
        key: this.refs[ref].props.resource,
        type: this.refs[ref].props.type,
        methods: this.refs[ref].state.methods
      });
    }
    this.setState({ resources: res, update: true });
  }

  render() {
    const { num, label } = this.props;

    return (
      <div key={`rights_parent_${num}`} className={`parentWrapper wrap_${num}`}>
        <h3 className="label">{label}</h3>
        <div className="labels">
          <div className="type" />
          <div className="methods">
            <div className="method get">LESEN</div>
            <div className="method post">SCHREIBEN</div>
            <div className="method put">BEARBEITEN</div>
            <div className="method delete">LÖSCHEN</div>
          </div>
        </div>
        <div
          className="rights_resources"
          style={Theme.rightsInputStyles.resourceStyles}
        >
          {this.props.resources.map((sub, n) => (
            <RightsResourceInput
              ref={`resource_sub_${n}`}
              key={`resource_sub_${n}`}
              num={n}
              resource={sub.key}
              type={sub.type}
              methods={sub.methods}
              onChange={targ => this.handleSubToggleClick(targ)}
            />
          ))}
        </div>
      </div>
    );
  }
}

RightsResources.propTypes = {
  num: PropTypes.number.isRequired,
  label: PropTypes.string,
  alias: PropTypes.string,
  resources: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default RightsResources;
