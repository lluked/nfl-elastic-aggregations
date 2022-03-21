'use strict'

require('array.prototype.flatmap').shim()

var client = require('./modules/client.js');
var ping = require('./modules/ping.js');
var existsIndex = require('./modules/existsIndex.js');
var deleteIndex = require('./modules/deleteIndex.js');
var createIndex = require('./modules/createIndex.js');
var bulk = require('./modules/bulk.js');

const indexName = 'nfl'
const indexMapping = require('../mapping/nfl-2013.json');
const dataset = require('../data/nfl-2013.json');
const bodyData = dataset.flatMap(doc => [{ index: { _index: indexName } }, doc])

async function setup() {
    await ping(client);
    await deleteIndex(client,indexName);
    await createIndex(client,indexName,indexMapping)
    await existsIndex(client,indexName);
    await bulk(client,indexName,bodyData);
}

setup();
