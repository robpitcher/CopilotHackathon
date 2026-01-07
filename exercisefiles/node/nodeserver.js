// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

// Import required Node.js modules
const http = require('http');      // For creating the HTTP server
const url = require('url');        // For parsing URL query strings
const fs = require('fs');          // For file system operations
const readline = require('readline'); // For reading files line by line

// Load colors from JSON file
const colors = JSON.parse(fs.readFileSync('./colors.json', 'utf8'));

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

/**
 * Returns the hex color code for a given color name
 * @param {string} colorName - The name of the color
 * @returns {string|null} - The hex code or null if not found
 */
function returnColorCode(colorName) {
    const color = colors.find(c => c.color.toLowerCase() === colorName.toLowerCase());
    return color ? color.code.hex : null;
}

/**
 * Calculates the number of days between two dates
 * @param {string} date1 - First date in YYYY-MM-DD format
 * @param {string} date2 - Second date in YYYY-MM-DD format
 * @returns {number} - Number of days between the dates
 */
function daysBetweenDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Array of European countries with their ISO codes
// Used by the /RandomEuropeanCountry endpoint
const europeanCountries = [
    { country: 'Germany', isoCode: 'DE' },
    { country: 'France', isoCode: 'FR' },
    { country: 'Italy', isoCode: 'IT' },
    { country: 'Spain', isoCode: 'ES' },
    { country: 'Poland', isoCode: 'PL' },
    { country: 'Romania', isoCode: 'RO' },
    { country: 'Netherlands', isoCode: 'NL' },
    { country: 'Belgium', isoCode: 'BE' },
    { country: 'Greece', isoCode: 'GR' },
    { country: 'Portugal', isoCode: 'PT' },
    { country: 'Sweden', isoCode: 'SE' },
    { country: 'Austria', isoCode: 'AT' },
    { country: 'Hungary', isoCode: 'HU' },
    { country: 'Switzerland', isoCode: 'CH' },
    { country: 'Denmark', isoCode: 'DK' },
    { country: 'Finland', isoCode: 'FI' },
    { country: 'Norway', isoCode: 'NO' },
    { country: 'Ireland', isoCode: 'IE' },
    { country: 'Croatia', isoCode: 'HR' },
    { country: 'Bulgaria', isoCode: 'BG' }
];

// Function to read file line by line and return lines containing "Fusce"
// Returns a Promise that resolves with an array of matching lines
function getLineByLineFromTextFile() {
    return new Promise((resolve, reject) => {
        const lines = []; // Array to store matching lines
        const fileStream = fs.createReadStream('./sample.txt'); // Create read stream for the file // Create read stream for the file
        
        // Create readline interface to process file line by line
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Recognize all instances of CR LF as a single line break
        });

        // Event handler for each line read from the file
        rl.on('line', (line) => {
            if (line.includes('Fusce')) { // Check if line contains "Fusce"
                lines.push(line); // Add matching line to results array
            }
        });

        // Event handler when file reading is complete
        rl.on('close', () => {
            resolve(lines); // Resolve promise with all matching lines
        });

        // Event handler for any errors during file reading
        rl.on('error', (error) => {
            reject(error); // Reject promise with error
        });
    });
}

// Create HTTP server with request handler
const server = http.createServer((req, res) => {
    // Parse the incoming request URL and extract components
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname; // Get the path (e.g., '/get')
    const query = parsedUrl.query;       // Get query parameters as an object

    // Route: /get?key=value
    // Returns a greeting with the provided key parameter
    if (pathname === '/get') {
        const key = query.key; // Extract 'key' from query parameters
        if (key) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello ' + key); // Return greeting with the key
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('key not passed'); // Return error if key is missing
        }
    } 
    // Route: /DaysBetweenDates?date1=YYYY-MM-DD&date2=YYYY-MM-DD
    // Calculates the number of days between two dates
    else if (pathname === '/DaysBetweenDates') {
        const date1 = query.date1; // First date parameter
        const date2 = query.date2; // Second date parameter
        
        if (date1 && date2) {
            const d1 = new Date(date1);  // Parse first date
            const d2 = new Date(date2);  // Parse second date
            const diffTime = Math.abs(d2 - d1); // Calculate time difference in milliseconds
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
            
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Days between ${date1} and ${date2}: ${diffDays}`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('date1 and date2 parameters are required'); // Return error if dates are missing
        }
    }
    // Route: /GetLineByLineFromTextFile
    // Reads sample.txt and returns lines containing "Fusce"
    else if (pathname === '/GetLineByLineFromTextFile') {
        getLineByLineFromTextFile()
            .then(lines => {
                // Success: return matching lines as JSON with count
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ lines: lines, count: lines.length }));
            })
            .catch(error => {
                // Error: return error message
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file: ' + error.message);
            });
    }
    // Route: /RandomEuropeanCountry
    // Returns a randomly selected European country with its ISO code
    else if (pathname === '/RandomEuropeanCountry') {
        const randomIndex = Math.floor(Math.random() * europeanCountries.length); // Generate random index
        const randomCountry = europeanCountries[randomIndex]; // Get country at random index
        
        // Return the country and ISO code as JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            country: randomCountry.country,
            isoCode: randomCountry.isoCode
        }));
    }
    /**
     * Route: /health
     * Simple health-check endpoint for monitoring
     */
    else if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
    }
    // Default route: handle all unrecognized paths
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('method not supported'); // Return 404 for unsupported routes
    }
});

// Start the server on port 3000 (only when run directly, not when required as a module)
if (require.main === module) {
    server.listen(3000, () => {
        console.log('server is listening on port 3000'); // Log when server starts successfully
    });
} else {
    // When required as a module, start on 3000 if not already running
    server.listen(3000).on('error', () => {
        // Server already running, ignore
    });
}

// Export functions for testing
module.exports = {
    validatePhoneNumber,
    validateSpanishDNI,
    returnColorCode,
    daysBetweenDates,
    server
};