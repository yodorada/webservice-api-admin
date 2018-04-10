import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'admin-on-rest';
import { Filter, ReferenceInput, SelectInput } from 'admin-on-rest';
import {
  Edit,
  Create,
  DisabledInput,
  TextInput,
  ReferenceField,
  BooleanInput,
  BooleanField
} from 'admin-on-rest';
import { TabbedForm, FormTab } from 'admin-on-rest';
import { DependentInput } from 'aor-dependent-input';

import PasswordInput from '../mui/input/PasswordInput';
import requiredField from '../mui/util/requiredField';
import RightsInput from '../mui/input/RightsInput/';

import Theme from '../../utils/Theme';

const UsersFilter = props => (
  <Filter {...props}>
    <ReferenceInput
      label="yodorada.users.references.groupname"
      source="groupsId"
      reference="groups"
      allowEmpty
    >
      <SelectInput optionText="groupname" />
    </ReferenceInput>
  </Filter>
);

export const UsersList = props => (
  <div className="userslist">
    <List
      title="yodorada.users.titlelist"
      filters={<UsersFilter />}
      {...props}
      sort={{ field: 'username', order: 'ASC' }}
    >
      <Datagrid>
        <TextField
          source="id"
          sortable={false}
          style={{ textAlign: 'center' }}
        />
        <ReferenceField
          label="yodorada.users.references.groupname"
          source="groupsId"
          reference="groups"
        >
          <TextField source="groupname" elStyle={Theme.referenceFieldStyles} />
        </ReferenceField>
        <TextField source="username" />
        <BooleanField source="enabled" />
        <EditButton />
      </Datagrid>
    </List>
  </div>
);

//(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}
const validateUsersEdit = values => {
  const errors = {};
  if (!values.username) {
    errors.username = requiredField;
  } else {
    let regex = /^([a-zA-Z0-9.\-_]){8,}$/i;
    if (values.username.match(regex) === null) {
      errors.username =
        'Muss aus mindestens 8 Zeichen bestehen. Zulässige Sonderzeichen: -_. (Minus, Unterstrich, Punkt)';
    }
  }
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
  if (!values.groupsId) {
    errors.groupsId = requiredField;
  }
  return errors;
};

const checkGroupTypeAdmin = record => record.role === 100;
const checkGroupTypeNonAdmin = record => record.role !== 100;

export const UsersEdit = props => (
  <Edit {...props}>
    <TabbedForm validate={validateUsersEdit}>
      <FormTab label="Einstellung">
        <DisabledInput source="id" label="ID" />
        <BooleanInput source="enabled" />
      </FormTab>

      <FormTab label="Name">
        <TextInput source="username" options={Theme.textFieldStyles} />
        <TextInput source="email" options={Theme.textFieldStyles} />
        <PasswordInput source="password" options={Theme.textFieldStyles} />
      </FormTab>

      <FormTab label="Rechte">
        <DependentInput resolve={checkGroupTypeNonAdmin}>
          <BooleanInput source="overrideGroupRights" />
          <DependentInput dependsOn="overrideGroupRights">
            <RightsInput source="rights" label="Anpassung" />
          </DependentInput>
        </DependentInput>
        <DependentInput resolve={checkGroupTypeAdmin}>
          <div
            style={{
              margin: '20px 0',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textAlign: 'center'
            }}
          >
            Benutzer aus Gruppe "Admins" hat keine Rechte-Einschränkung.
          </div>
        </DependentInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);
//^(?=.*[0-9])([a-zA-Z0-9.\-_]){8,}$
const validateUsersCreate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = requiredField;
  } else {
    let regex = /^([a-zA-Z0-9.\-_]){8,}$/i;
    if (values.username.match(regex) === null) {
      errors.username =
        'Muss aus mindestens 8 Zeichen bestehen. Zulässige Sonderzeichen: -_. (Minus, Unterstrich, Punkt)';
    }
  }
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
    let regex = /^(?=.*[0-9])([a-zA-Z0-9.\-_]){8,}$/i;
    if (values.password.match(regex) === null) {
      errors.password =
        'Muss aus mindestens 8 Zeichen bestehen und mindestens eine Zahl enthalten. Zulässige Sonderzeichen: -_. (Minus, Unterstrich, Punkt)';
    }
  }
  if (!values.groupsId) {
    errors.groupsId = requiredField;
  }
  return errors;
};

export const UsersCreate = props => (
  <Create {...props}>
    <TabbedForm validate={validateUsersCreate} redirect="list">
      <FormTab label="Einstellung">
        <BooleanInput source="enabled" />
        <ReferenceInput
          label="yodorada.users.references.groupname"
          source="groupsId"
          reference="groups"
          allowEmpty
        >
          <SelectInput optionText="groupname" />
        </ReferenceInput>
      </FormTab>

      <FormTab label="Name">
        <TextInput source="username" options={Theme.textFieldStyles} />
        <TextInput source="email" options={Theme.textFieldStyles} />
        <PasswordInput source="password" options={Theme.textFieldStyles} />
      </FormTab>

      <FormTab label="Rechte">
        <div style={{ margin: '20px 0 10px' }}>
          Rechte können nach erstmaligem Speichern editiert werden.
        </div>
      </FormTab>
    </TabbedForm>
  </Create>
);
