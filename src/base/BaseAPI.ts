const BASE_API_URL = 'https://ya-praktikum.tech/api/v2';
const RESOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const getUrl = (url: string) => `${BASE_API_URL}/${url}`;
export const getResource = (url: string) => `${RESOURCE_URL}${url}`;
export const ContentTypeHeader = {
  'Content-Type': 'application/json',
};

abstract class BaseAPI {
  create() {}

  request() {}

  update() {}

  delete() {}
}

export default BaseAPI;
