const fetch = require('node-fetch');

function requestHTTPS(method, url, headers, body) {
  return new Promise((resolve, reject) => {
    fetch(
      url, 
      {
        method,
        body,
        headers,
      }
    )
    .then(res => res.json())
    .then(json => resolve(json));
  });
  
}

function execute(url, headers, body, method) {
  return requestHTTPS(method, url, headers, body);
}

exports.HttpCall = class HttpCall {
  post(uri, headers, data) {
    return execute(uri, headers, data, "POST");
  }

  get(uri, headers) {
    return execute(uri, headers, undefined, "GET");
  }
}