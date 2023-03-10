const axios = require('axios');


async function fetchFakeAPI() {
    const data = await axios.get('https://randomuser.me/api/?exc=login')
    return data;
}

async function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

module.exports = { 
    fetchFakeAPI,
    getRandomNumber
 }