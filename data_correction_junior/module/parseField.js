
function parseFields(tobeParsed) {
    if (tobeParsed.name) {
        tobeParsed.name = tobeParsed.name.replace(/4/g, 'a');
        tobeParsed.name = tobeParsed.name.replace(/1/g, 'i');
        tobeParsed.name = tobeParsed.name.replace(/3/g, 'e');
        tobeParsed.name = tobeParsed.name.replace(/0/g, 'o');
        tobeParsed.name = tobeParsed.name.charAt(0).toUpperCase() + tobeParsed.name.slice(1);
    }
    if (tobeParsed.city) {
        tobeParsed.city = tobeParsed.city.split('')
            .map((letter, index) => index === 0 ? letter.toUpperCase() : letter.toLowerCase()).join('').toString();
    }
    if (tobeParsed.name === "#ERROR") {
        tobeParsed.name = undefined;
    }

    return tobeParsed;
}

module.exports= parseFields;
