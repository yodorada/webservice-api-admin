import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import TranslationUtils from '../../../utils/TranslationUtils';

const DisabledInputWithDefault = ({
  value,
  label,
  record,
  resource,
  source
}) => (
  <TextField
    value={value}
    floatingLabelText={<TranslationUtils label={label} />}
    disabled
  />
);

DisabledInputWithDefault.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string
};

export default DisabledInputWithDefault;
