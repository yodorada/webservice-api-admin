import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Face from 'material-ui/svg-icons/action/face';
import { push as pushAction } from 'react-router-redux';
import TranslationUtils from '../../../utils/TranslationUtils';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';

class AccountEditButton extends Component {
  handleClick = () => {
    this.props.push(`/account/${LocalStorageUtils.get('userId')}`);
  };

  render() {
    return (
      <FlatButton
        primary
        label={<TranslationUtils label="yodorada.buttons.account" />}
        icon={<Face />}
        onClick={this.handleClick}
        style={{ overflow: 'inherit' }}
      />
    );
  }
}

AccountEditButton.propTypes = {
  push: PropTypes.func
};

export default connect(null, {
  push: pushAction
})(AccountEditButton);
