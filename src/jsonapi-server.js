'use strict';

const jsonApi = require('jsonapi-server');

jsonApi.listen = (port, callback) => {
  jsonApi.setConfig({port, base: 'rest'});

  jsonApi.start();
  if (callback) {
    process.nextTick(callback);
  }
}

const Joi = jsonApi.Joi;

jsonApi.define({
  resource: "articles",
  handlers: new jsonApi.MemoryHandler(),
  attributes: {
    title: Joi.string().required(),
    body: Joi.string().required(),
    publishedAt: Joi.date().iso()
  },

  examples: [{
    // id is always a string (for memory handler)
    id: '11',
    // type always multiple
    type: 'articles',
    title: 'Hello World',
    body: 'Exciting'
  },
  {
    id: '12',
    type: 'articles',
    title: 'Fresh news',
    body: 'Astonishing'
  }
  ]
});

module.exports = jsonApi;