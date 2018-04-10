import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Theme from '../../../../utils/Theme';
import TranslationUtils from '../../../../utils/TranslationUtils';
import RightsMethodInput from './RightsMethodInput';
import lowerCase from 'lodash/lowerCase';

class RightsResourceInput extends Component {
  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.state = {
      methods: this.props.methods,
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

  handleToggleClick(targ) {
    let methods = [];
    for (var ref in this.refs) {
      methods.push({
        method: this.refs[ref].props.method,
        state: this.refs[ref].state.checked
      });
    }
    this.setState({ methods: methods, update: true });
  }

  getCheckbox(num, m) {
    let toggled = false;
    let disabled = true;
    for (let i = 0; i < this.props.methods.length; i++) {
      if (this.props.methods[i].method === m) {
        disabled = false;
        toggled = this.props.methods[i].state;
        break;
      }
    }

    return disabled ? (
      <div />
    ) : (
      <RightsMethodInput
        active={toggled}
        ref={`resource_method_${num}`}
        num={num}
        method={m}
        onChange={targ => this.handleToggleClick(targ)}
      />
    );
  }

  render() {
    return (
      <div
        id={`resource_subitem_${this.props.num}`}
        key={`resource_subitem_${this.props.num}`}
        className={`resource_subitem resource_subitem_${this.props.num}`}
        style={Theme.rightsInputStyles.resourceRowStyles}
      >
        <div className="type">
          {
            <TranslationUtils
              label={`yodorada.inputs.rights.resource.type.${lowerCase(
                this.props.type
              )}`}
            />
          }{' '}
          <span className="alias"> api.tld/{this.props.resource}</span>
        </div>
        <div className="methods">
          <div className="method get">{this.getCheckbox(1, 'get')}</div>
          <div className="method post">{this.getCheckbox(2, 'post')}</div>
          <div className="method put">{this.getCheckbox(3, 'put')}</div>
          <div className="method delete">{this.getCheckbox(4, 'delete')}</div>
        </div>
      </div>
    );
  }
}

RightsResourceInput.propTypes = {
  num: PropTypes.number.isRequired,
  type: PropTypes.string,
  resource: PropTypes.string,
  methods: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default RightsResourceInput;
