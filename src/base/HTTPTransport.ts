enum METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
};

type OptionsType = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
};

const queryStringify = (data: Record<string, unknown>) : string => {
  const str = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
  return `?${str}`;
};

class HTTPTransport {
  get(url: string, options: Omit<OptionsType, 'method'> = {}) : Promise<XMLHttpRequest> {
    return this.#request(url, {...options, method: METHOD.GET}, options.timeout);
  }

  put = (url, options: Omit<OptionsType, 'method'> = {}) => {
    return this.#request(url, {...options, method: METHOD.PUT}, options.timeout);
  };

  post = (url, options: Omit<OptionsType, 'method'> = {}) => {
    return this.#request(url, {...options, method: METHOD.POST}, options.timeout);
  };

  delete = (url, options: Omit<OptionsType, 'method'> = {}) => {
    return this.#request(url, {...options, method: METHOD.DELETE}, options.timeout);
  };

  #request(url: string, options: OptionsType = {method: METHOD.GET}, timeout: number = 5000) : Promise<XMLHttpRequest> {
    const {method, headers = {}, data} = options;

    return new Promise((resolve, reject) => {
      if (method === METHOD.GET && data) {
        url += queryStringify(data);
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function() {
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


