async function getIndexMapping (client, indexName) {
  console.log("getIndexMapping called...");
  try{
    let response = await client.indices.getMapping({
      index: indexName
    });
    console.log("Mappings:\n", response[indexName].mappings.properties);
  } catch(e) {
    console.log(e);
  }
}

module.exports = getIndexMapping;
