const parseFields = require("./parseField");
const createCompiled = require("./compiler");
const saveIntoFile = require("./saveIntoFile");

// This function will Sanitize datas from httpRequest then save them into file which have their name.
function sanitizeAndSave(contents) {
    let compiled = {};
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
            compiled = {...compiled, ...createCompiled(informations[id], jobs[id], users[id], id)}

        }
    })
    // saveThemAll
    saveIntoFile('users.json', users);
    saveIntoFile('informations.json', informations);
    saveIntoFile('jobs.json', jobs);
    saveIntoFile('compiled.json', compiled);
    return {jobs,users,informations,compiled}

}

module.exports = sanitizeAndSave;
