const axios = require('axios');
const sanitizeAndSave = require('./module/sanitizeAndSave');

const baseURL = " https://recrutement-practice-default-rtdb.firebaseio.com/"
const endpoints = ["informations.json", "jobs.json", "users.json"];
const contents = new Map();


//TODO: Save in Krates
// TODO: Unit test
async function getJson() {
    console.log('\x1b[33m%s\x1b[0m', 'traitements des endpoints et enregistrement dans les fichiers \n');
    // On récupère les données de chaque url
    for (const endpoint of endpoints) {
        console.log('On démarre les requête pour => ' + endpoint + '\n');
        await axios.get(`${baseURL}/${endpoint}`)
            .then(res => {
                contents.set(endpoint, res.data)
            })
            .catch(e => console.log(e));
    }
    sanitizeAndSave(contents)

}


getJson()
