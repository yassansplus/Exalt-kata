const axios = require("axios");
const baseUrl = 'https://krat.es/4b8a05954b1586eb5df5/'

// We parse the payload to the good format according to Krates documentation. -> https://docs.krat.es/api/create
function parsePayload(jsonifyContent, endpoint) {
    let toSave = [];
    for (let entrie in jsonifyContent) {
        toSave.push({[entrie]: jsonifyContent[entrie]})
    }
    axios.post(baseUrl + endpoint.split('.')[0], toSave, {"headers": {'Content-Type': 'application/json'}})
        .then(() => console.log("\x1b[32m", "🧙️record saved for " + endpoint))
        .catch(e => console.log("\x1b[31m", "error" + e));
}

// Two step -> delete data then execute request
function krates(parsedDataToSave) {
    console.log("\x1b[31m", "regenerate datas 🔴 all datas are deleted 🔴")
    axios.delete(baseUrl)
        .then(() => {
            for (let parsedData in parsedDataToSave) {
                parsePayload(parsedDataToSave[parsedData], parsedData);
            }
        })
        .catch(e => console.log(e));

}

module.exports = krates;
