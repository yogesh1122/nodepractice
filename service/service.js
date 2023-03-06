const axios = require('axios');


async function fetchFakeAPI() {
    const data = await axios.get('https://randomuser.me/api/?exc=login')
    return data;
}

module.exports = { 
    fetchFakeAPI
 }