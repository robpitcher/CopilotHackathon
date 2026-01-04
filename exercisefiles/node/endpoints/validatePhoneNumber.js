/**
 * GET /Validatephonenumber?phoneNumber=+34#########
 * Validates Spanish phone numbers (+34 followed by 9 digits)
 */
function handleValidatePhoneNumber(query, res) {
    const phoneNumber = query.phoneNumber;
    if (phoneNumber) {
        // Spanish phone number format: +34 followed by 9 digits
        const spanishPhoneRegex = /^\+34[0-9]{9}$/;
        if (spanishPhoneRegex.test(phoneNumber)) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('valid');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('invalid');
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('phoneNumber parameter is required');
    }
}

module.exports = handleValidatePhoneNumber;
