const axios = require('axios');


async function fetchFakeAPI() {
    const data = await axios.get(`https://randomuser.me/api/`)
    return data;
}

async function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function userCreateObj() {
      const res = await fetchFakeAPI()
      // console.log( res.data.results) ;
      const { gender,name,email,location:{ city,postcode,state,street:{name:streetname }},login:{password},} = res.data.results[0]
      
      //let name =`${title} ${first} ${last}`
      let obj =  {
        "gender":gender,
        "name": name,
        "email":email,
        "password":password,
        "address": {
        "street": streetname,
        "city": city,
        "state": state,
        "postcode": postcode
      },
    }
     return obj;
}
async function productCreateObj(){

}

module.exports = { 
    fetchFakeAPI,
    getRandomNumber,
    userCreateObj
 }