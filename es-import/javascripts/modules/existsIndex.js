async function existsIndex (client,indexName) {
  try{
    let response = await client.indices.exists({
      index: indexName
    });
    if (response="true") {
      console.log("Index exists!");
    };
  } catch(e) {
    console.log(e);
  };
};

module.exports = existsIndex;