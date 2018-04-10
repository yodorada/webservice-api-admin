import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import messages from './languages';

import GroupsIcon from 'material-ui/svg-icons/social/people';
import UsersIcon from 'material-ui/svg-icons/social/person';

import './media/scss/App.css';

import Theme from './utils/Theme';
import CustomRoutes from './utils/CustomRoutes';

import { AuthClient } from './utils/AuthClient';
import fileUpload from './utils/fileUpload';
import { RestClient } from './api/RestClient';

import Menu from './utils/Menu';
import LocalStorageUtils from './utils/LocalStorageUtils';
import reducers from './utils/reducers/';

import { Dashboard } from './components/views/Dashboard';
import { AccountIndex, AccountEdit } from './components/views/Account';
import { LogsList } from './components/views/Logs';
import {
  GroupsList,
  GroupsEdit,
  GroupsCreate
} from './components/views/Groups';
import { UsersList, UsersEdit, UsersCreate } from './components/views/Users';
import uniqueId from 'lodash/uniqueId';

var AppConfig = require('./config.json');

const customRestClient = fileUpload(RestClient(process.env.REACT_APP_YODORADA_WEBSERVICE_API_HOST));

const currentRole = LocalStorageUtils.role();
const isLogged = LocalStorageUtils.isLogged();

const serviceResources = [
  {
    name: 'account',
    list: AccountIndex,
    edit: AccountEdit,
    options: { hiddenInNav: true }
  },
  {
    name: 'groups',
    list: GroupsList,
    edit: GroupsEdit,
    create: GroupsCreate,
    remove: Delete,
    icon: GroupsIcon
  },
  {
    name: 'users',
    list: UsersList,
    edit: UsersEdit,
    create: UsersCreate,
    remove: Delete,
    icon: UsersIcon
  },
  { name: 'logs', list: LogsList, options: { hiddenInNav: true } }
];

const filterResources = res => {
  if (!isLogged) {
    return true;
  }
  if (currentRole < 200) {
    return true;
  }
  if (currentRole < 200 && (res.name === 'groups' || res.name === 'users')) {
    return true;
  }
  if (
    currentRole > 100 &&
    currentRole < 300 &&
    (res.name === 'groups' || res.name === 'users')
  ) {
    // if(currentRole > 100 && currentRole < 300 && res.name === 'users') {
    return true;
  }
  if (
    res.name !== 'groups' &&
    res.name !== 'users' &&
    res.name !== 'logs' &&
    res.name !== 'files'
  ) {
    return true;
  }
  return false;
};

const mapResources = res => {
  if (currentRole > 100 && currentRole < 300 && res.name === 'groups') {
    let newRes = res;
    delete newRes.create;
    delete newRes.remove;
    return newRes;
  }
  return res;
};

const App = () => (
  <Admin
    menu={Menu}
    customReducers={reducers}
    title={AppConfig.adminTitle}
    customRoutes={CustomRoutes}
    theme={Theme.yodorada}
    dashboard={Dashboard}
    authClient={AuthClient}
    restClient={customRestClient}
    locale="de"
    messages={messages}
  >
    {serviceResources
      .filter(r => filterResources(r))
      .map(r => mapResources(r))
      .map(r => <Resource key={uniqueId(r.name)} {...r} />)}
  </Admin>
);

export default App;
