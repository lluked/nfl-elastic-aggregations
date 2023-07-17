async function createIndex (client, indexName, indexMapping) {
  console.log("createIndex called...");
  try {
    let response = await client.indices.create({
      index: indexName,
      body: indexMapping
    });
    console.log(response);
    return(response.acknowledged);
  } catch(e) {
    console.log(e);
  };
};

module.exports = createIndex;
