import React from 'react';
import { Field } from 'redux-form';
import { TextInput } from 'admin-on-rest';

import Theme from '../../../utils/Theme';
import TranslationUtils from '../../../utils/TranslationUtils';

const passwordFieldStyles = Object.assign(
  { type: 'password' },
  Theme.textFieldStyles
);

const PasswordInput = ({ ...props }) => (
  <div>
    <Field
      name="password"
      component={TextInput}
      options={passwordFieldStyles}
      {...props}
    />
    <div className="hint-text">
      <TranslationUtils label="yodorada.hints.fields.password" />
    </div>
  </div>
);
export default PasswordInput;
