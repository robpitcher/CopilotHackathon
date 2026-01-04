/**
 * GET /ValidateSpanishDNI?dni=########X
 * Validates Spanish DNI checksum letter
 */
function handleValidateSpanishDNI(query, res) {
    const dni = query.dni;
    if (dni) {
        const dniRegex = /^(\d{8})([A-Z])$/i;
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const match = dni.match(dniRegex);
        if (match) {
            const number = parseInt(match[1], 10);
            const letter = match[2].toUpperCase();
            const correctLetter = letters[number % 23];
            if (letter === correctLetter) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('valid');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('invalid');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('invalid');
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('dni parameter is required');
    }
}

module.exports = handleValidateSpanishDNI;
