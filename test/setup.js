// eslint-disable-next-line
const globalJsdom = require('jsdom-global');

globalJsdom(
  '<!doctype html><html><head><meta charset="utf-8">' +
    '</head><body></body></html>',
  { url: 'http://locathost:3000' }
);
