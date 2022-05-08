'use strict'

require('array.prototype.flatmap').shim();

const client = require('./modules/client.js');

const ping = require('./modules/ping.js');
const existsIndex = require('./modules/existsIndex.js');
const deleteIndex = require('./modules/deleteIndex.js');
const createIndex = require('./modules/createIndex.js');
const bulkUpload = require('./modules/bulkUpload.js');

async function setup(client, indexName, indexMapping, bodyData) {
    // Test connection to Elasticsearch
    if (await ping(client)) {
        console.log("Ping Successful");
        // Check if index already exits
        if (await existsIndex(client, indexName)) {
            // Delete index if it already exists
            console.log("Index already exists");
            console.log("Deleting index for a fresh start");
            if (await deleteIndex(client, indexName)){
                console.log("Index deleted");
            };
        }
        else {
            console.log("Index doesn't exist");
        };
        // Create index
        if (await createIndex(client, indexName, indexMapping)){
            console.log("Index created");
            // Bulk upload data
            if (await bulkUpload(client, indexName, bodyData)) {
                console.log("Data indexed");
                console.log("Setup complete");
            }
            else {
                console.log("Failed to index documents");
                console.log("Setup failed");
            };
        }
        else {
            console.log("Failed to create index");
            console.log("Setup failed");
        };
    }
    else {
        console.log("Connection to elasticsearch failed");
        console.log("Setup failed");
    };
}

const nflIndexName = 'nfl'
const nflIndexMapping = require('../mapping/nfl-2013.json');
const nflDataset = require('../data/nfl-2013.json');
const nflBodyData = nflDataset.flatMap(doc => [{ index: { _index: nflIndexName } }, doc]);

setup(client, nflIndexName, nflIndexMapping, nflBodyData);
