async function deleteIndex (client,indexName) {
  try{
    let response = await client.indices.delete({
      index: indexName
    });
    if (response.acknowledged) {
      console.log("Successfully deleted " + indexName + " index.");
    };
  } catch(e) {
    console.log(e);
  };
};

module.exports = deleteIndex;