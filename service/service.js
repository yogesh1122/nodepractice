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

async function verifyCartData(items){
  
  
  // let totalPrice=0;
  // for (const key in items) {
  //   if (Object.hasOwnProperty.call(items, key)) {
  //     const el = items[key];
  //     let objprice = el.quantity * el.price;    
  //     totalPrice = totalPrice + objprice
  //   }
  // }
  
  // excepted O/p :- 3,399.98
  console.log(totalPrice);
}

module.exports = { 
    fetchFakeAPI,
    getRandomNumber,
    verifyCartData
 }