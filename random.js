const axios = require('axios');
const randomInt = require('random-int');
setInterval(makePostRequest, 4000);

async function makePostRequest() {
  const id = "jainkinshuk112@gmail.com";
  const time = Date.now();
  const bp = randomInt(0,10);
  console.log(bp);
  console.log(time);
  const body = {
    id,
    time,
    bp
  };

    let res = await axios.post('http://localhost:5001/api/users', body);    

}

makePostRequest();