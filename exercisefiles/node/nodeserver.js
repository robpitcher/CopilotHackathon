// Exercise 6: nodeserver file rules
// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

// Import required Node.js modules
const http = require('http');
const url = require('url');

// Import utility modules
const { validatePhoneNumber, validateSpanishDNI } = require('./validators');
const { returnColorCode } = require('./colorUtils');
const { daysBetweenDates } = require('./dateUtils');

// Import route handlers
const { handleGetRoute } = require('./routes/getRoute');
const { handleDaysRoute } = require('./routes/daysRoute');
const { handleFileRoute } = require('./routes/fileRoute');
const { handleCountryRoute } = require('./routes/countryRoute');
const { handleHealthRoute } = require('./routes/healthRoute');

// Create HTTP server with request handler
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/get') {
        handleGetRoute(query, res);
    } else if (pathname === '/DaysBetweenDates') {
        handleDaysRoute(query, res);
    } else if (pathname === '/GetLineByLineFromTextFile') {
        handleFileRoute(res);
    } else if (pathname === '/RandomEuropeanCountry') {
        handleCountryRoute(res);
    } else if (pathname === '/health') {
        handleHealthRoute(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('method not supported');
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