enum METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type OptionsType = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
};

type HTTPMethod = (
  url: string,
  options?: Omit<OptionsType, 'method'>
) => Promise<XMLHttpRequest>;

const queryStringify = (data: Record<string, unknown>): string => {
  const str = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `?${str}`;
};

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const { data } = options;
    if (data) {
      url += queryStringify(data);
    }
    return this.#request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout
    );
  };

  put: HTTPMethod = (url, options = {}) =>
    this.#request(url, { ...options, method: METHOD.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.#request(url, { ...options, method: METHOD.POST }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.#request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  #request(
    url: string,
    options: OptionsType = { method: METHOD.GET },
    timeout: number = 5000
  ): Promise<XMLHttpRequest> {
    const { method, headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        if (xhr.status >= 400) {
          reject(Error('Ошибка запроса'));
        }

        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
