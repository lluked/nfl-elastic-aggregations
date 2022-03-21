async function getIndexMapping (client,indexName,callback) {
  try{
    let response = await client.indices.getMapping({
      index: indexName,
    });
    console.log("Mappings:\n", response[indexName].mappings.properties );
    callback();
  } catch(e) {
    console.log(e);
  }
}

module.exports = getIndexMapping;