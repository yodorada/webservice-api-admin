import LocalStorageUtils from '../utils/LocalStorageUtils';

const fetchJson = (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: 'application/json'
    });
  requestHeaders.set('Realm', btoa(process.env.REACT_APP_YODORADA_WEBSERVICE_API_KEY));
  if (
    !(options && options.body && options.body instanceof FormData) &&
    !options.contentType
  ) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const token = LocalStorageUtils.token();
  if (token) {
    requestHeaders.set('Token', `${token}`);
  }
  return fetch(url, { ...options, headers: requestHeaders })
    .then(response =>
      response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text
      }))
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (headers.get('token') !== null) {
        LocalStorageUtils.set('token', headers.get('token'));
      }
      if (status < 200 || status >= 300) {
        let msg = 'Unknown error';
        if (
          json !== undefined &&
          json.hasOwnProperty('errors') &&
          json.errors.hasOwnProperty('message')
        ) {
          msg = json.errors.message;
        }
        if (status === 401) {
          LocalStorageUtils.logout();
        }
        return Promise.reject(status === 401 ? 'Unauthorized' : msg);
      }

      let scope = json.scope || '';
      let webservice = json.webservice || '';
      json = json.data || json;
      return { status, headers, body, json, scope, webservice };
    });
};

export const jsonApiHttpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  if (!options.contentType) {
    options.headers.set('Content-Type', 'application/json');
  } else {
    options.headers.set('Content-Type', options.contentType);
  }
  const token = LocalStorageUtils.token();
  if (token) {
    options.headers.set('Token', `${token}`);
  }
  return fetchJson(url, options);
};

export const queryParameters = data =>
  Object.keys(data)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');
