// eslint-disable-next-line
import { expect } from 'chai';
// eslint-disable-next-line
import * as Sinon from 'sinon';
import HTTPTransport from './HTTPTransport';

function createHTTPTransport() {
  return new HTTPTransport();
}

describe('Проверка методов HTTPTransport', () => {
  let xhr: Sinon.SinonFakeXMLHttpRequestStatic;
  let requests: Sinon.SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    // eslint-disable-next-line
    xhr = Sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('Проверка метода GET', () => {
    const http = createHTTPTransport();
    http.get('/test');
    const [request] = requests;
    expect(request.method).to.eq('GET');
    expect(request.url).to.eq('/test');
  });

  it('Проверка метода PUT', () => {
    const http = createHTTPTransport();
    http.put('/test');
    const [request] = requests;
    expect(request.method).to.eq('PUT');
    expect(request.url).to.eq('/test');
  });

  it('Проверка метода POST', () => {
    const http = createHTTPTransport();
    http.post('/test');
    const [request] = requests;
    expect(request.method).to.eq('POST');
    expect(request.url).to.eq('/test');
  });

  it('Проверка метода DELETE', () => {
    const http = createHTTPTransport();
    http.delete('/test');
    const [request] = requests;
    expect(request.method).to.eq('DELETE');
    expect(request.url).to.eq('/test');
  });
});
