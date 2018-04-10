import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';
import TranslationUtils from '../../../utils/TranslationUtils';

class LogsShow extends Component {
  render() {
    const { record, onLogShow } = this.props;
    return (
      <FlatButton
        primary
        label={<TranslationUtils label="aor.action.show" />}
        icon={<ImageEye />}
        onClick={() => onLogShow(record)}
        style={{ overflow: 'inherit' }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogShow: record => {
      dispatch({ type: 'LOGS_SHOW', record: record });
    }
  };
};
export default connect(null, mapDispatchToProps)(LogsShow);
