async function deleteIndex (client, indexName) {
  console.log("deleteIndex called...");
  try {
    let response = await client.indices.delete({
      index: indexName
    });
    console.log(response);
    return(response.acknowledged);
  } catch(e) {
    console.log(e);
  };
};

module.exports = deleteIndex;
