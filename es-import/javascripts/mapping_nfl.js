var client = require('./modules/client.js');
var searchIndex = require('./modules/getIndexMapping.js');

const indexName = 'nfl';

searchIndex(client, indexName);