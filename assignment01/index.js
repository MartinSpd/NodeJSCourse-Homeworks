'use strict';

    /**
     * Home assignment #1: Building a RESTful API
     * 
     */


  const http = require('http');
  const url = require('url');
  const stringDecoder = require('string_decoder').StringDecoder;
  const config = require('./config');

  const server = http.createServer((request, response) => {
    
    const parsedUrl = url.parse(request.url, true);

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const queryStringObject = parsedUrl.query;
    const method = request.method.toLocaleLowerCase();
    
    const headers = request.headers;

    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    
    request.on('data', (data) => {
      buffer += decoder.write(data)
    });

    request.on('end',() => {
      buffer += decoder.end();

      const chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? 
        router[trimmedPath] : handlers.notFound;

      const data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : buffer
      };
      chosenHandler(data, (statusCode, payload) => {
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        payload = typeof(payload) == 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(statusCode);
        response.end(payloadString);

        console.log(`Response: ${buffer}`);
      });

      console.log(
        `
        Request received with headers: ${headers}`
      );
    });
  });

  // run server
  server.listen(config.httpPort, () => {
    console.log(`Server is listening on port ${config.httpPort} in ${config.envName}.`);
  });

  // handlers
  let handlers = {};

  handlers.hello = (data, callback) => {
    callback(200, { 'greeting': 'Hello there!' } );
  };

  handlers.notFound = (data, callback) => {
    callback(404);
  };

  const router = {
    'hello' : handlers.hello
  };
  