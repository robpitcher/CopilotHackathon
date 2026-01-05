const fs = require('fs');

/**
 * GET /GetFullTextFile
 * Reads entire file and filters lines containing 'Fusce'
 */
function handleGetFullTextFile(query, res, dirname) {
    fs.readFile(dirname + '/sample.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
            return;
        }
        const lines = data.split('\n').filter(line => line.includes('Fusce'));
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(lines.join('\n'));
    });
}

module.exports = handleGetFullTextFile;
