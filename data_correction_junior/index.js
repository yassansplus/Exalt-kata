const axios = require('axios');
const fs = require('fs');
const baseURL = " https://recrutement-practice-default-rtdb.firebaseio.com/"
const endpoints = ["informations.json", "jobs.json", "users.json"];
const contents = new Map();
const compiled = {};

// TODO: Compiler proprement les fichiers ✅
// TODO: Enregistrer les différents fichiers parser
// TODO: Refactorer si besoin
// TODO: NE PAS OUBLIER -> compiled fonctionne on doit juste y mettre les bonnes données -> se servir des objets générés et pas créer de nouveaux. ✅
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
    sanitize()

}


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
    if (contentElement.name === "#ERROR") {
        contentElement.name = undefined
    }

    return contentElement
}


function sanitize() {
    let users = {};
    let informations = {};
    let jobs = {};
    contents.forEach(content => {
        for (let id in content) {
            const parsedContent = parseFields(content[id])
            if (parsedContent.name) informations[id] = {name: parseFields(contents.get('users.json')[id]).name || parsedContent.name};
            if (parsedContent.job) jobs[id] = {job: parsedContent.job};
            if (parsedContent.age) users[id] = {age: parseFields(contents.get('informations.json')[id]).age} || {age: parsedContent.age};
            if (parsedContent.city) users[id] = {...users[id], city: parsedContent.city};
            createCompiled(informations[id], jobs[id], users[id], id)

        }
    })


}

function createCompiled(information, job, user, id) {
    console.log(id)
    compiled[id] = {
        ...(information ? {name: information.name} : {}),
        ...(user?.city ? {city: user.city} : {}),
        ...(user?.age ? {age: user.age} : {}),
        ...(job?.job ? {job: job.job} : {}),

    };

}

function saveIntoFile(endpoint, jsonSanized) {
    const dir = './endpoint';
    // Création du dossier s'il n'existe pas
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    contents.set(endpoint, jsonSanized);

    // Enregistrement de notre fichier
    fs.writeFile(`${dir}/${endpoint}`, JSON.stringify(jsonSanized), (err) => {
        if (err) throw err;
        console.log('\x1b[32m%s\x1b[0m', `Json from ${endpoint} saved successfully`);
    });
}

getJson()
