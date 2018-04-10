/* eslint-disable */
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE
} from 'admin-on-rest';

import LocalStorageUtils from '../utils/LocalStorageUtils';

import { jsonApiHttpClient, queryParameters } from './fetch';

import TranslationUtils from '../utils/TranslationUtils';

export const RestClient = (apiUrl, httpClient = jsonApiHttpClient) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage
        };
        const filter = params.filter;
        const filterKeys = Object.keys(filter);
        if (filterKeys.length) {
          for (var i = filterKeys.length - 1; i >= 0; i--) {
            if (filter[filterKeys[i]] != undefined) {
              query[filterKeys[i]] = filter[filterKeys[i]];
            }
          }
        }
        url = `${apiUrl}/${resource}?${queryParameters(query)}`;

        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage
        };
        const filter = params.filter;
        const filterKeys = Object.keys(filter);
        if (filterKeys.length) {
          for (var i = filterKeys.length - 1; i >= 0; i--) {
            if (filter[filterKeys[i]] != undefined) {
              query[filterKeys[i]] = filter[filterKeys[i]];
            }
          }
        }
        url = `${apiUrl}/${resource}?${queryParameters(query)}`;
        break;
      }
      case GET_MANY: {
        const query = {
          filter: JSON.stringify({ id: params.ids })
        };
        url = `${apiUrl}/${resource}?${queryParameters(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json, status } = response;

    // if (status < 200 || status >= 300) {
    //     return Promise.reject(new HttpError((json && json.errors.message) || status, status));
    // }

    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('x-total-count')) {
          throw new Error('yodorada.errors.api.generic', {
            msg: 'The X-Total-Count header is missing in the HTTP Response.'
          });
        }
        return {
          data: json,
          total: parseInt(
            headers
              .get('x-total-count')
              .split('/')
              .pop(),
            10
          )
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      case UPDATE:
        if (resource == 'account') {
          LocalStorageUtils.updateAccountData(json);
        }
        return { data: json };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponseToREST(response, type, resource, params)
    );
  };
};
