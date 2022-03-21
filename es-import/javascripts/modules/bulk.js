async function bulkUpload (client,indexName,bodyData) {
  try{
    let response = await client.bulk({
      body:bodyData
      });
      // const count = await client.count({ index: indexName });
      // console.log("Successfully uploaded " + count.count + " documents to " + indexName + " index.");
      console.log(response);
      console.log("Successfully uploaded documents to " + indexName + " index.");
  } catch(e) {
      console.log(e);
  };
};

module.exports = bulkUpload;