// Exercise 6: Node path rules
// Exercise 6: nodeserver file rules
/**
 * Simple Node.js HTTP server exposing multiple utility endpoints.
 *
 * Endpoints:
 * - GET /get?key=VALUE
 *   -> 200 'hello VALUE' | 400 'key not passed'
 *
 * - GET /DaysBetweenDates?date1=YYYY-MM-DD&date2=YYYY-MM-DD
 *   -> 200 '<integer days>' | 400 'date1 and date2 parameters are required'
 *
 * - GET /Validatephonenumber?phoneNumber=+34#########
 *   -> 200 'valid' | 200 'invalid' | 400 'phoneNumber parameter is required'
 *
 * - GET /ValidateSpanishDNI?dni=########X
 *   -> 200 'valid' | 200 'invalid' | 400 'dni parameter is required'
 *
 * - GET /ReturnColorCode?color=NAME
 *   -> 200 '<hex code>' | 404 'color not found' | 400 'color parameter is required'
 *   Reads colors from colors.json in the same directory.
 *
 * - GET /TellMeAJoke
 *   -> 200 JSON { setup, punchline } | 500 on external API errors
 *
 * - GET /MoviesByDirector?director=NAME
 *   -> 200 JSON array of movie details | 404 if none | 400 if missing
 *   Uses OMDb API (apikey required). Filters movies by director.
 *
 * - GET /ParseUrl?someurl=ENCODED_URL
 *   -> 200 returns the host component | 400 'invalid url' or missing param
 *
 * - GET /GetFullTextFile
 *   -> 200 text: lines from sample.txt that contain 'Fusce'
 *
 * - GET /GetLineByLinefromtTextFile
 *   -> 200 JSON array: lines with 'Fusce' (streamed processing)
 *
 * - GET /CalculateMemoryConsumption
 *   -> 200 string: heapUsed in GB (toFixed(2))
 *
 * - GET /RandomEuropeanCountry
 *   -> 200 JSON { country, isoCode }
 *
 * Unknown paths -> 404 'method not supported'
 * On start -> Logs 'server is listening on port 3000'
 */

// Node core/external deps used by various endpoints
const http = require('http');     // HTTP server
const url = require('url');       // URL parsing (query/pathname)

// Import endpoint handlers
const handleGet = require('./endpoints/get');
const handleDaysBetweenDates = require('./endpoints/daysBetweenDates');
const handleValidatePhoneNumber = require('./endpoints/validatePhoneNumber');
const handleValidateSpanishDNI = require('./endpoints/validateSpanishDNI');
const handleReturnColorCode = require('./endpoints/returnColorCode');
const handleTellMeAJoke = require('./endpoints/tellMeAJoke');
const handleMoviesByDirector = require('./endpoints/moviesByDirector');
const handleParseUrl = require('./endpoints/parseUrl');
const handleGetFullTextFile = require('./endpoints/getFullTextFile');
const handleGetLineByLineFromTextFile = require('./endpoints/getLineByLineFromTextFile');
const handleCalculateMemoryConsumption = require('./endpoints/calculateMemoryConsumption');
const handleRandomEuropeanCountry = require('./endpoints/randomEuropeanCountry');
const handleHealth = require('./endpoints/health');

// OMDb API key placeholder for /MoviesByDirector. Replace or inject via env.
const OMDB_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

const server = http.createServer((req, res) => {
    // Parse pathname and query parameters from the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // /get: echo 'hello <key>' if key provided
    if (pathname === '/get') {
        handleGet(query, res);
    }
    // /DaysBetweenDates: compute absolute difference in days between two dates
    else if (pathname === '/DaysBetweenDates') {
        handleDaysBetweenDates(query, res);
    }
    // /Validatephonenumber: validate Spanish numbers (+34 + 9 digits)
    else if (pathname === '/Validatephonenumber') {
        handleValidatePhoneNumber(query, res);
    }
    // /ValidateSpanishDNI: validate DNI checksum letter
    else if (pathname === '/ValidateSpanishDNI') {
        handleValidateSpanishDNI(query, res);
    }
    // /ReturnColorCode: look up color hex code from colors.json
    else if (pathname === '/ReturnColorCode') {
        handleReturnColorCode(query, res, __dirname);
    }
    // /TellMeAJoke: fetch random joke from public API
    else if (pathname === '/TellMeAJoke') {
        handleTellMeAJoke(query, res);
    }
    // /MoviesByDirector: OMDb search + detail fetch to filter by director
    else if (pathname === '/MoviesByDirector') {
        handleMoviesByDirector(query, res, OMDB_API_KEY);
    }
    // /ParseUrl: parse provided URL and return host (domain[:port])
    else if (pathname === '/ParseUrl') {
        handleParseUrl(query, res);
    }
    // /GetFullTextFile: read entire file and filter lines containing 'Fusce'
    else if (pathname === '/GetFullTextFile') {
        handleGetFullTextFile(query, res, __dirname);
    }
    // /GetLineByLinefromtTextFile: stream file line-by-line and collect matches
    else if (pathname === '/GetLineByLinefromtTextFile') {
        handleGetLineByLineFromTextFile(query, res, __dirname);
    }
    // /CalculateMemoryConsumption: report heap usage in GB
    else if (pathname === '/CalculateMemoryConsumption') {
        handleCalculateMemoryConsumption(query, res);
    }
    // /RandomEuropeanCountry: return a random country from static list
    else if (pathname === '/RandomEuropeanCountry') {
        handleRandomEuropeanCountry(query, res);
    }
    // Health-check endpoint
    else if (pathname === '/health' || pathname === '/healthz') {
        handleHealth(query, res);
    }
    // Fallback: unmatched path
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('method not supported');
    }
});

// Start HTTP server on port 3000
server.listen(3000, () => {
    // Logs
    console.log('server is listening on port 3000');
});

module.exports = server;