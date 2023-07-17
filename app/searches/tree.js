const client = require('../client.js');

async function Search(callback) {
  await client.search({
    index: 'nfl',
    size: 0,
    body: {
      "query": {
        "bool": {
          "must": { "match": { "description": "TOUCHDOWN"}},
          "must_not": [
            { "match": { "description": "intercepted"}},
            { "match": { "description": "incomplete"}},
            { "match": { "description": "FUMBLES"}},
            { "match": { "description": "NULLIFIED"}}
          ]
        }
      },
      "aggs": {
        "teams": {
          "terms": {
            "field": "off.keyword",
            "exclude": "",
            "size": 5
          },
          "aggs": {
            "players": {
              "terms": {
                "field": "description",
                "include": "([a-z]?[.][a-z]+)",
                "size": 200
              },
              "aggs": {
                "qtrs": {
                  "terms": {
                    "field": "qtr",
                    "order": { "_count": "asc" }
                  }
                }
              }
            }
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
