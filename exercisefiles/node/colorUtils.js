// Exercise 6: Node path rules

const fs = require('fs');

// Load colors from JSON file
const colors = JSON.parse(fs.readFileSync('./colors.json', 'utf8'));

/**
 * Returns the hex color code for a given color name
 * @param {string} colorName - The name of the color
 * @returns {string|null} - The hex code or null if not found
 */
function returnColorCode(colorName) {
    const color = colors.find(c => c.color.toLowerCase() === colorName.toLowerCase());
    return color ? color.code.hex : null;
}

module.exports = {
    returnColorCode
};
