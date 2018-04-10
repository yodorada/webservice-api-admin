var AppConfig = require('../config.json');
let localStorage = global.window.localStorage;
let namespace = AppConfig.namespace + ':';

let omit = [
  'id',
  'userId',
  'config',
  'created',
  'changed',
  'password',
  'enabled',
  'overrideGroupRights',
  'rights',
  'token',
  'tokenExpires'
];

function clear() {
  localStorage.clear();
}

function get(key) {
  return localStorage.getItem(namespace + key);
}
function set(key, value) {
  localStorage.setItem(namespace + key, value);
}
function remove(key) {
  localStorage.removeItem(namespace + key);
}

function setObject(key, object) {
  set(key, JSON.stringify(object));
}

function getObject(key) {
  return JSON.parse(get(key));
}

function isLogged() {
  return (
    get('token') !== null && get('userId') !== null && get('auth') !== null
  );
}

function login(obj) {
  set('token', obj.token);
  set('tokenExpires', obj.tokenExpires);
  set('username', obj.username);
  set('email', obj.email);
  set('userId', obj.id);
  set('config', JSON.stringify(obj.config));
  set(
    'auth',
    btoa(obj.token + ':' + obj.role) + ':' + btoa(JSON.stringify(obj.rights))
  );
  let userVars = {};
  let omitLogin = ['username', 'email'];
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    let value = obj[key];
    if (!omit.includes(key) && !omitLogin.includes(key)) {
      userVars[key] = value;
    }
  }
  set('userVars', JSON.stringify(userVars));
}

function updateAccountData(obj) {
  set('username', obj.username);
  set('tokenExpires', obj.tokenExpires);
  set('email', obj.email);
  let userVars = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    let value = obj[key];
    if (!omit.includes(key)) {
      userVars[key] = value;
    }
  }
  set('userVars', JSON.stringify(userVars));
}

function getAccountData() {
  let accountData = {
    username: get('username'),
    email: get('email'),
    id: get('userId')
  };
  let userVars = JSON.parse(get('userVars'));
  for (let key in userVars) {
    if (!userVars.hasOwnProperty(key) || accountData.hasOwnProperty(key))
      continue;
    accountData[key] = userVars[key];
  }
  return accountData;
}

function logout() {
  remove('token');
  remove('username');
  remove('email');
  remove('userId');
  remove('auth');
  remove('userVars');
  remove('tokenExpires');
  remove('config');
}

function role() {
  const auth = get('auth');
  if (auth === null) {
    return;
  }
  return parseInt(atob(get('auth').split(':')[0]).split(':')[1], 10);
}

function rights() {
  const auth = get('auth');
  if (auth === null) {
    return;
  }
  return JSON.parse(atob(auth.split(':')[1]));
}

function token() {
  return get('token');
}

const LocalStorageUtils = {
  clear,
  get,
  set,
  setObject,
  getObject,
  token,
  remove,
  login,
  logout,
  role,
  rights,
  updateAccountData,
  getAccountData,
  isLogged
};

export default LocalStorageUtils;
