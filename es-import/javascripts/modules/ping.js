async function ping (client) {
  try{
    let response = await client.ping();
      if (response="true") {      
      console.log("Connection made to Elasticsearch!");
    };
  } catch(e) {
    console.log(e);
  };
};

module.exports = ping;