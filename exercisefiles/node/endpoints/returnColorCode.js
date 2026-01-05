const fs = require('fs');

/**
 * GET /ReturnColorCode?color=NAME
 * Looks up color hex code from colors.json
 */
function handleReturnColorCode(query, res, dirname) {
    const color = query.color;
    if (color) {
        fs.readFile(dirname + '/colors.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading colors file');
                return;
            }
            const colors = JSON.parse(data);
            const foundColor = colors.find(c => c.color.toLowerCase() === color.toLowerCase());
            if (foundColor) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(foundColor.code.hex);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('color not found');
            }
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('color parameter is required');
    }
}

module.exports = handleReturnColorCode;
