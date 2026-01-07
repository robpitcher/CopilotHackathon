// Exercise 6: Node path rules

/**
 * Validates a US phone number in the format XXX-XXX-XXXX
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phoneNumber);
}

/**
 * Validates a Spanish DNI (8 digits followed by a letter)
 * The letter is calculated based on the number
 * @param {string} dni - The DNI to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateSpanishDNI(dni) {
    const dniRegex = /^(\d{8})([A-Z])$/;
    const match = dni.match(dniRegex);
    if (!match) return false;
    
    const number = parseInt(match[1], 10);
    const letter = match[2];
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const expectedLetter = letters[number % 23];
    
    return letter === expectedLetter;
}

module.exports = {
    validatePhoneNumber,
    validateSpanishDNI
};
