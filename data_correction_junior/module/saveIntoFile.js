const fs = require("fs");

function saveIntoFile(endpoint, jsonSanized) {
    const dir = './endpoint';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    // Save file with given params
    fs.writeFile(`${dir}/${endpoint}`, JSON.stringify(jsonSanized), (err) => {
        if (err) throw err;
        console.log('\x1b[32m%s\x1b[0m', `Json from ${endpoint} saved successfully 🗒`);
    });
}

module.exports = saveIntoFile;
