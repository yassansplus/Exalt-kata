const fs = require('fs')
const es = require('event-stream');

let lineNr = 0;

let lineReaded = '';

function checkline() {

    lineReaded = lineReaded.replace('[', '');
    lineReaded = lineReaded.replace('},', '}');
    lineReaded = lineReaded.replace(']', '');
    return JSON.parse(lineReaded)
}

var s = fs.createReadStream('input.json')
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {

            // pause the readstream
            s.pause();

            lineNr += 1;

            lineReaded += line.trim();
            if (line.trim() === '},' || line.trim() === '}') {
                const user = checkline();
                lineReaded = '';
                if (user.id === parseInt(process.argv[2])) {
                    console.log(user.name);
                    s.resume()
                }
            }


            // resume the readstream, possibly from a callback
            s.resume();
        })
            .on('error', function (err) {
                console.log('Error while reading file.', err);
            })
            .on('end', function () {
                console.log('Read entire file.')
            })
    );
