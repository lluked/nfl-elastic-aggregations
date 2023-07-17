var client = require('./modules/client.js');
var searchIndex = require('./modules/searchIndex.js');

const indexName = 'nfl';

const searchBody = {
  query: {
    match: { "description": "TOUCHDOWN" }
  },
};

searchIndex(client, indexName, searchBody);
