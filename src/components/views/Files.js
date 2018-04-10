import React from 'react';
import { List, Datagrid } from 'admin-on-rest';
import { TextField, ImageField } from 'admin-on-rest';
import { Edit, Create, ImageInput, SimpleForm, required } from 'admin-on-rest';
import { DeleteButton } from 'admin-on-rest';

import Theme from '../../utils/Theme';

export const FilesList = props => (
  <div className="fileslist">
    <List
      title="yodorada.files.titlelist"
      {...props}
      sort={{ field: 'filename', order: 'ASC' }}
    >
      <Datagrid styles={Theme.datagridStyles}>
        <TextField
          source="id"
          label="ID"
          sortable={false}
          style={{ textAlign: 'center' }}
        />
        <TextField source="filename" style={{ maxWidth: 150 }} />
        <ImageField source="path.absolute" sortable={false} />
        <DeleteButton />
      </Datagrid>
    </List>
  </div>
);

export const FilesDetail = props => (
  <Edit {...props}>
    <SimpleForm>
      <ImageField source="path.absolute" title="filename" />
    </SimpleForm>
  </Edit>
);

export const FilesCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ImageInput
        source="pictures"
        label="Bild-Upload"
        multiple={true}
        accept="image/*"
        required={required}
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
