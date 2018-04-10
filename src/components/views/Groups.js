import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton
} from 'admin-on-rest';
import {
  Edit,
  Create,
  SimpleForm,
  DisabledInput,
  TextInput,
  BooleanInput
} from 'admin-on-rest';
import { TabbedForm, FormTab } from 'admin-on-rest';

import requiredField from '../mui/util/requiredField';
import RightsInput from '../mui/input/RightsInput/';

import Theme from '../../utils/Theme';
import RoleSelect from '../mui/input/RoleSelect';
import ChildListButton from '../mui/button/ChildListButton';
import { DependentInput } from 'aor-dependent-input';

export const GroupsList = props => (
  <div className="groupslist">
    <List
      title="yodorada.groups.titlelist"
      {...props}
      sort={{ field: 'groupname', order: 'ASC' }}
    >
      <Datagrid>
        <TextField
          source="id"
          label="ID"
          sortable={false}
          style={{ textAlign: 'center' }}
        />
        <TextField source="groupname" />
        <BooleanField source="enabled" />
        <ChildListButton
          label="yodorada.groups.children.users"
          child="users"
          {...props}
        />
        <EditButton />
      </Datagrid>
    </List>
  </div>
);

const checkGroupTypeAdmin = record => record.role === 100;
const checkGroupTypeNonAdmin = record => record.role !== 100;

export const GroupsEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Name">
        <DisabledInput source="id" label="ID" />
        <BooleanInput source="enabled" />
        <TextInput source="groupname" options={Theme.textFieldStyles} />
      </FormTab>

      <FormTab label="Rechte">
        <DependentInput resolve={checkGroupTypeNonAdmin}>
          <RightsInput source="rights" label="Anpassung" />
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
            Gruppe mit Rolle "Admins" hat keine Rechte-Einschränkung.
          </div>
        </DependentInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const validateGroupsCreation = values => {
  const errors = {};
  if (!values.groupname) {
    errors.groupname = requiredField;
  }
  if (!values.role) {
    errors.role = requiredField;
  }
  return errors;
};

export const GroupsCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateGroupsCreation} redirect="list">
      <div>Rechte können nach erstmaligem Speichern editiert werden.</div>
      <RoleSelect source="role" options={Theme.textFieldStyles} />
      <TextInput source="groupname" options={Theme.textFieldStyles} />
    </SimpleForm>
  </Create>
);
