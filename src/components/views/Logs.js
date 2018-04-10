import React from 'react';
import { List, Datagrid } from 'admin-on-rest';
import { TextField, ReferenceField, DateField } from 'admin-on-rest';

import Theme from '../../utils/Theme';
import LogsDialog from '../mui/util/LogsDialog';
import LogsShow from '../mui/util/LogsShow';

export const LogsList = props => (
  <div className="logslist">
    <List
      title="yodorada.logs.titlelist"
      {...props}
      sort={{ field: 'created', order: 'DESC' }}
    >
      <Datagrid styles={Theme.datagridStyles}>
        <TextField
          source="id"
          label="ID"
          sortable={false}
          style={{ textAlign: 'center' }}
        />
        <DateField source="created" showTime />
        <ReferenceField
          label="yodorada.logs.references.username"
          source="usersId"
          reference="users"
          linkType={false}
        >
          <TextField source="username" elStyle={Theme.referenceFieldStyles} />
        </ReferenceField>
        <TextField source="method" />
        <TextField source="resource" />
        <TextField source="httpStatusCode" />
        <LogsShow />
      </Datagrid>
    </List>
    <LogsDialog />
  </div>
);
