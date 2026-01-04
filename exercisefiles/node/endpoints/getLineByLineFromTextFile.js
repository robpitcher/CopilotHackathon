const fs = require('fs');
const readline = require('readline');

/**
 * GET /GetLineByLinefromtTextFile
 * Streams file line-by-line and collects lines containing 'Fusce'
 */
function handleGetLineByLineFromTextFile(query, res, dirname) {
    const readFileLineByLine = () => {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(dirname + '/sample.txt');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            const matchingLines = [];
            rl.on('line', (line) => {
                if (line.includes('Fusce')) {
                    matchingLines.push(line);
                }
            });
            rl.on('close', () => {
                resolve(matchingLines);
            });
            rl.on('error', (err) => {
                reject(err);
            });
        });
    };

    readFileLineByLine()
        .then(lines => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(lines));
        })
        .catch(err => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
        });
}

module.exports = handleGetLineByLineFromTextFile;
