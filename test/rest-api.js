'use strict';

const chai = require('chai');
const assert = chai.assert;

const fetch = require('node-fetch');
const co = require('co');
const server = require('../src/jsonapi-server');

describe('REST API', () => {
  before(done => server.listen(5000, done));
  after(() => server.close());

  it('should respond to requests',
    co.wrap(function* (){
      const response = yield fetch('http://localhost:5000/rest/articles');
      assert(response.ok, '/articles response');
      const json = yield response.json();
      console.log(json);
      assert(json.data[0].id === '11', 'Should have data');
    }));
});