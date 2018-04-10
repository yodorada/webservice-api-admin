import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'admin-on-rest';
import {
  Filter,
  ReferenceInput,
  SelectInput,
  BooleanField
} from 'admin-on-rest';

import Theme from '../../utils/Theme';

const BundlesFilter = props => (
  <Filter {...props}>
    <ReferenceInput
      label="yodorada.bundles.references.projectname"
      source="projectsId"
      reference="projects"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const BundlesList = props => (
  <div className="bundleslist">
    <List
      title="yodorada.bundles.titlelist"
      filters={<BundlesFilter />}
      {...props}
      sort={{ field: 'id', order: 'ASC' }}
    >
      <Datagrid>
        <TextField
          source="id"
          sortable={false}
          style={{ textAlign: 'center' }}
        />
        <ReferenceField
          label="yodorada.bundles.references.projectname"
          source="projectsId"
          reference="projects"
          linkType={false}
        >
          <TextField source="name" elStyle={Theme.referenceFieldStyles} />
        </ReferenceField>
        <TextField source="deviceName" />
        <TextField source="deviceDescription" />
        <BooleanField source="enabled" />
      </Datagrid>
    </List>
  </div>
);
