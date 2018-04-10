import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionList from 'material-ui/svg-icons/action/list';
import { push as pushAction } from 'react-router-redux';
import TranslationUtils from '../../../utils/TranslationUtils';

import { stringify } from 'query-string';

class ChildListButton extends Component {
  handleClick = () => {
    const { child, record, basePath } = this.props;
    const base = basePath.substr(1) + 'Id';
    const filters = {};
    filters[base] = record.id;
    const params = {
      sort: 'id',
      order: 'DESC',
      page: 1,
      perPage: 25,
      filter: filters
    };
    this.props.push(
      `/${child}?${stringify({
        ...params,
        filter: JSON.stringify(params.filter)
      })}`
    );
  };

  render() {
    const { label, buttonType } = this.props;
    if (buttonType === 'raised') {
      return (
        <RaisedButton
          primary
          label={<TranslationUtils label={label} />}
          icon={<ActionList />}
          onClick={this.handleClick}
          style={{ overflow: 'inherit' }}
        />
      );
    }
    return (
      <FlatButton
        primary
        label={<TranslationUtils label={label} />}
        icon={<ActionList />}
        onClick={this.handleClick}
        style={{ overflow: 'inherit' }}
      />
    );
  }
}

ChildListButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  child: PropTypes.string,
  label: PropTypes.string,
  buttonType: PropTypes.string
};

export default connect(null, {
  push: pushAction
})(ChildListButton);
