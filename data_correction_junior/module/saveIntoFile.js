const fs = require("fs");

function saveIntoFile(endpoint, jsonSanized) {
    const dir = './endpoint';
    // Création du dossier s'il n'existe pas
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    // Enregistrement de notre fichier
    fs.writeFile(`${dir}/${endpoint}`, JSON.stringify(jsonSanized), (err) => {
        if (err) throw err;
        console.log('\x1b[32m%s\x1b[0m', `Json from ${endpoint} saved successfully 🗒`);
    });
}

module.exports = saveIntoFile;
