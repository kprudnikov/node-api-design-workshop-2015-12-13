'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');
const server = require('../src/hello-server');

describe('hello world', () => {
  before(done => server.listen(4000, done));
  after(() => server.close());

  it('should respond to requests',
    co.wrap(function* (){
      const response = yield fetch('http://localhost:4000');
      assert(response.ok, 'Hello world response');
      const text = yield response.text();
      assert(text === 'Hello World', 'Should say Hello World');
    }));
});