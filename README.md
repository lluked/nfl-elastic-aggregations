# NFL Elasticsearch Aggregations

Sample D3 Visualisations based on aggregations from elasticsearch, this project was originally based on [nfl-elastic-aggregations](https://github.com/stormpython/nfl-elastic-aggregations) but has been completely overhauled, after the changes mainly the data and concept remain.

## Changes:

- Data mapping has been updated to support elasticsearch 8.
- A simple node app has been made with express framework and pug templating in order to carry out logic.
- Search queries have been updated to support new mapping.
- The elasticsearch node module is now used instead of the elasticsearch.js client.
- Data for visualisations is returned via a router. This can be accessed at `/data/donut` or `/data/tree`.
- Visualisations have been completely rewritten for D3 v6 as originally they were created for D3 v3.
- This project has been setup with docker and docker-compose for easy deployment.
- A separate app has been created to ingest data automatically when bringing the compose stack up.

## Instructions
- Clone repo.
- Run `docker-compose up` in root directory.
- Visit `localhost:3000`.
