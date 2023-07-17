async function searchIndex (client, indexName, searchBody) {
  console.log("searchIndex called...");
  try{
    let response = await client.search({
      index: indexName,
      body: searchBody
    });
    console.log("--- Response ---");
    console.log(response);
    console.log("--- Hits ---");
    console.log(response.hits.hits);
  } catch(e) {
    console.log(e);
  };
};

module.exports = searchIndex;
