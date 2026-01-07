// Exercise 6: Node path rules

const fs = require('fs');
const readline = require('readline');

/**
 * Reads a file line by line and returns lines containing "Fusce"
 * @returns {Promise<Array<string>>} - Promise that resolves with an array of matching lines
 */
async function getLineByLineFromTextFile() {
    return new Promise((resolve, reject) => {
        const lines = [];
        const fileStream = fs.createReadStream('./sample.txt');
        
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if (line.includes('Fusce')) {
                lines.push(line);
            }
        });

        rl.on('close', () => {
            resolve(lines);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = {
    getLineByLineFromTextFile
};
