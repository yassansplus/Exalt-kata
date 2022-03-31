const axios = require("axios");

function parsePayload(jsonifyContent, endpoint) {
    let toSave = [];
    for (let entrie in jsonifyContent) {
        toSave.push({[entrie]: jsonifyContent[entrie]})
    }
    axios.post('https://krat.es/4b8a05954b1586eb5df5/' + endpoint.split('.')[0], toSave, {"headers": {'Content-Type': 'application/json'}})
        .then(() => console.log("\x1b[32m", "🧙️record saved for " + endpoint))
        .catch(e => console.log("\x1b[31m", "error" + e));
}

function krates(parsedDataToSave) {
    console.log("\x1b[31m", "regenerate datas 🔴 all datas are deleted 🔴")
    axios.delete("https://krat.es/4b8a05954b1586eb5df5/")
        .then(() => {
            for (let parsedData in parsedDataToSave) {
                parsePayload(parsedDataToSave[parsedData], parsedData);
            }
        })
        .catch(e => console.log(e));

}
module.exports = krates;
