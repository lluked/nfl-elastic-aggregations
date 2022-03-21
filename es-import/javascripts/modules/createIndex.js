async function createIndex (client,indexName,indexMapping) {
  try{
    let response = await client.indices.create({
      index: indexName,
      body: indexMapping
    });
    if (response.acknowledged) {
      console.log("Successfully created " + response.index + " index.");
    };
  } catch(e) {
    console.log(e);
  };
};

module.exports = createIndex;