import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import LocalStorageUtils from './LocalStorageUtils';

export const AuthClient = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(process.env.REACT_APP_YODORADA_WEBSERVICE_API_HOST + '/login', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Realm: btoa(process.env.REACT_APP_YODORADA_WEBSERVICE_API_KEY),
        Authorization: 'Basic ' + btoa(username + ':' + password)
      })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json().then(obj => ({ obj, response })))
      .then(({ obj, response }) => {
        LocalStorageUtils.login(obj.data);
      });
  }
  if (type === AUTH_LOGOUT) {
    LocalStorageUtils.logout();
  }
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      LocalStorageUtils.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return LocalStorageUtils.token() ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};
