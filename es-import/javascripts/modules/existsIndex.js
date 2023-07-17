async function existsIndex (client, indexName) {
  console.log("existsIndex called...");
  try {
    let response = await client.indices.exists({
      index: indexName
    });
    console.log(response);
    return (response);
  } catch(e) {
    console.log(e);
  };
};

module.exports = existsIndex;
