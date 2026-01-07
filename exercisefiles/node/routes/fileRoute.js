// Exercise 6: Node path rules

const { getLineByLineFromTextFile } = require('../fileUtils');

/**
 * Handles the /GetLineByLineFromTextFile endpoint
 * @param {object} res - HTTP response object
 */
async function handleFileRoute(res) {
    try {
        const lines = await getLineByLineFromTextFile();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ lines: lines, count: lines.length }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading file: ' + error.message);
    }
}

module.exports = {
    handleFileRoute
};
