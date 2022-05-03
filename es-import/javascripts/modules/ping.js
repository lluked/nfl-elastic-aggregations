async function ping (client) {
  console.log("ping called...");
  try {
    let response = await client.ping();
    console.log(response);
    return (response);
  } catch(e) {
    console.log(e);
    return (false);
  };
};

module.exports = ping;