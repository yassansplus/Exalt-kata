const axios = require('axios');
const sanitizeAndSave = require('./module/sanitizeAndSave');
const krates = require('./module/krates');

const baseURL = " https://recrutement-practice-default-rtdb.firebaseio.com/";
const endpoints = ["informations.json", "jobs.json", "users.json"];
const contents = new Map();

async function getJson() {
    console.log('\x1b[33m%s\x1b[0m', 'Okay let\'s gOoOoOOOoo  \n');
    // Getting data from differents URL
    for (const endpoint of endpoints) {
        console.log('⚡ Request for => ' + endpoint + '\n');
        await axios.get(`${baseURL}/${endpoint}`)
            .then(res => contents.set(endpoint, res.data))
            .catch(e => console.log(e));
    }
    return new Promise(((resolve, reject) => {
        const sanitizedData = sanitizeAndSave(contents);
        if (sanitizedData) {
            resolve(sanitizedData);
        } else {
            reject("an error occured");
        }
    }));
}


getJson().then(sanitizedData => krates(sanitizedData)).catch(e => console.log(e));

