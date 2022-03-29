const axios = require('axios');
const fs = require('fs');
const baseURL = " https://recrutement-practice-default-rtdb.firebaseio.com/"
const endpoints = ["informations.json", "jobs.json", "users.json"];
const contents = new Map();

// TODO: Compiler proprement les fichiers
// TODO: Enregistrer les différents fichiers parser
// TODO: Refactorer si besoin
// TODO: NE PAS OUBLIER -> compiled fonctionne on doit juste y mettre les bonnes données -> se servir des objets générés et pas créer de nouveaux.

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
    sanitize()
    compileThem();

}

// function saveIntoFile(endpoint, jsonFromRequest) {
//     const dir = './endpoint';
//     // Création du dossier s'il n'existe pas
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//     }
//     contents.set(endpoint, jsonFromRequest);
//
//     // // Enregistrement de notre fichier
//     // fs.writeFile(`${dir}/${endpoint}`, JSON.stringify(jsonFromRequest), (err) => {
//     //     if (err) throw err;
//     //     console.log('\x1b[32m%s\x1b[0m', `Json from ${endpoint} saved successfully`);
//     // });
// }

function parseFields(contentElement) {
    if (contentElement.name) {
        contentElement.name = contentElement.name.replace(/4/g, 'a')
        contentElement.name = contentElement.name.replace(/1/g, 'i')
        contentElement.name = contentElement.name.replace(/3/g, 'e')
        contentElement.name = contentElement.name.replace(/0/g, 'o')
        contentElement.name = contentElement.name.charAt(0).toUpperCase() + contentElement.name.slice(1);
    }
    if (contentElement.city) {
        contentElement.city = contentElement.city.split('')
            .map((letter, index) => index === 0 ? letter.toUpperCase() : letter.toLowerCase()).join('').toString()
    }
    // if (contentElement.name === "#ERROR") delete contentElement.name;
    return contentElement
}

function sanitize() {
    let users = {};
    let informations = {};
    let jobs = {};
    contents.forEach(content => {
        for (let id in content) {
            console.log();
            const parsedContent = parseFields(content[id])
            if (parsedContent.name) informations[id] = parseFields(contents.get('users.json')[id]) || parsedContent.name;
            if (parsedContent.job) jobs[id] = parsedContent.job;
            if (parsedContent.age) users[id] = parseFields(contents.get('informations.json')[id]) || {age: parsedContent.age};
            if (parsedContent.city) users[id] = {...users[id], city: parsedContent.city};
        }
    })
    console.log(users);
}

async function compileThem() {
    let compiled = {}
    contents.forEach(content => {
        for (let keyObj in content) {
            compiled[keyObj] = {...compiled[keyObj], ...parseFields(content[keyObj])};
        }
    })
    // console.log('compiled')
    // console.log(compiled);
}

getJson()
