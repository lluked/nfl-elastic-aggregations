const client = require('../client.js');

async function Search(callback) {
  await client.search({
    index: 'nfl',
    size: 5,
    body: {
      "query": {
        "bool": {
          "must": { "match": { "description": "TOUCHDOWN" }},
          "must_not": { "match": { "qtr": 5 }}
        }
      },
      "aggs": {
        "touchdowns": {
          "terms": {
            "field": "qtr",
            "order": { "_count" : "asc" }
          }
        }
      }
    }
  })
  .then(function (resp) {
    // console.log(resp);
    callback(resp);
  })
};

module.exports = {
  Search
};