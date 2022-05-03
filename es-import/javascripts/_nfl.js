'use strict'

require('array.prototype.flatmap').shim();

var client = require('./modules/client.js');
var ping = require('./modules/ping.js');
var existsIndex = require('./modules/existsIndex.js');
var deleteIndex = require('./modules/deleteIndex.js');
var createIndex = require('./modules/createIndex.js');
var bulkUpload = require('./modules/bulkUpload.js');

const indexName = 'nfl'
const indexMapping = require('../mapping/nfl-2013.json');
const dataset = require('../data/nfl-2013.json');
const bodyData = dataset.flatMap(doc => [{ index: { _index: indexName } }, doc]);

async function setup() {
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

setup();
