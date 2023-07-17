const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node:'http://es01:9200',
  auth: {
    username: "elastic",
    password: "changeme"
  }
});

module.exports = client;
