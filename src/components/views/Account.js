import React from 'react';
import { Edit, SimpleForm, DisabledInput, TextInput } from 'admin-on-rest';
import { required, ViewTitle } from 'admin-on-rest';

import PasswordInput from '../mui/input/PasswordInput';
import AccountEditButton from '../mui/button/AccountEditButton';
import Theme from '../../utils/Theme';
import TranslationUtils from '../../utils/TranslationUtils';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import requiredField from '../mui/util/requiredField';

import { Card, CardActions, CardText } from 'material-ui/Card';

const AccountEditActions = ({ basePath, data, refresh }) => <CardActions />;

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right'
};

export const AccountIndex = props => (
  <div className="account-overview">
    <Card>
      <CardActions style={cardActionStyle}>
        <AccountEditButton />
      </CardActions>
      <ViewTitle title={<TranslationUtils label="yodorada.page.account" />} />
      <CardText>
        <div>
          <strong>
            {<TranslationUtils label="resources.users.fields.username" />}:{' '}
          </strong>{' '}
          {`${LocalStorageUtils.get('username')}`}
        </div>
        <div>
          <strong>
            {<TranslationUtils label="resources.users.fields.email" />}:{' '}
          </strong>{' '}
          {`${LocalStorageUtils.get('email')}`}
        </div>
      </CardText>
    </Card>
  </div>
);

//(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}
const validateAccountEdit = values => {
  const errors = {};

  if (!values.email) {
    errors.email = requiredField;
  } else {
    let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (values.email.match(regex) === null) {
      errors.email = 'Bitte geben Sie eine korrekte Email Adresse an';
    }
  }
  if (!values.password) {
    errors.password = requiredField;
  } else {
    if (values.password !== '*****') {
      let regex = /^(?=.*[0-9])([a-zA-Z0-9.\-_]){8,}$/i;
      if (values.password.match(regex) === null) {
        errors.password =
          'Muss aus mindestens 8 Zeichen bestehen und mindestens eine Zahl enthalten. Zulässige Sonderzeichen: -_. (Minus, Unterstrich, Punkt)';
      }
    }
  }
  return errors;
};
export const AccountEdit = props => (
  <Edit
    title={<TranslationUtils label="yodorada.page.account" />}
    {...props}
    actions={<AccountEditActions />}
  >
    <SimpleForm validate={validateAccountEdit}>
      <DisabledInput source="username" />
      <TextInput
        source="email"
        options={Theme.textFieldStyles}
        required={required}
      />
      <PasswordInput source="password" />
    </SimpleForm>
  </Edit>
);
