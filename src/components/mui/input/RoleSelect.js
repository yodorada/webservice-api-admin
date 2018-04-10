import React from 'react';
import { Field } from 'redux-form';
import { SelectInput } from 'admin-on-rest';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';

const currentRole = LocalStorageUtils.role();

const defaultChoices = [
  { id: 100, rolename: 'yodorada.groups.roles.admins' },
  { id: 200, rolename: 'yodorada.groups.roles.editors' },
  { id: 300, rolename: 'yodorada.groups.roles.users' }
];
const newChoices = defaultChoices.filter(function(i) {
  return currentRole === 100 || i.id >= 200;
});

const RoleSelect = ({ ...props }) => (
  <Field
    name="role"
    component={SelectInput}
    optionText="rolename"
    choices={newChoices}
    label="resources.groups.fields.role"
    {...props}
  />
);
export default RoleSelect;
