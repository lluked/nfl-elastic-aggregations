async function bulkUpload (client, indexName, bodyData) {
  console.log("bulkUpload called...");
  try {
    let response = await client.bulk({
      body:bodyData
      });
      console.log(response)
      return(response);
  } catch(e) {
      console.log(e);
  };
};

module.exports = bulkUpload;
