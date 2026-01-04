// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');

const OMDB_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

const europeanCountries = [
    { country: 'Albania', isoCode: 'AL' },
    { country: 'Andorra', isoCode: 'AD' },
    { country: 'Austria', isoCode: 'AT' },
    { country: 'Belarus', isoCode: 'BY' },
    { country: 'Belgium', isoCode: 'BE' },
    { country: 'Bosnia and Herzegovina', isoCode: 'BA' },
    { country: 'Bulgaria', isoCode: 'BG' },
    { country: 'Croatia', isoCode: 'HR' },
    { country: 'Cyprus', isoCode: 'CY' },
    { country: 'Czech Republic', isoCode: 'CZ' },
    { country: 'Denmark', isoCode: 'DK' },
    { country: 'Estonia', isoCode: 'EE' },
    { country: 'Finland', isoCode: 'FI' },
    { country: 'France', isoCode: 'FR' },
    { country: 'Germany', isoCode: 'DE' },
    { country: 'Greece', isoCode: 'GR' },
    { country: 'Hungary', isoCode: 'HU' },
    { country: 'Iceland', isoCode: 'IS' },
    { country: 'Ireland', isoCode: 'IE' },
    { country: 'Italy', isoCode: 'IT' },
    { country: 'Latvia', isoCode: 'LV' },
    { country: 'Liechtenstein', isoCode: 'LI' },
    { country: 'Lithuania', isoCode: 'LT' },
    { country: 'Luxembourg', isoCode: 'LU' },
    { country: 'Malta', isoCode: 'MT' },
    { country: 'Moldova', isoCode: 'MD' },
    { country: 'Monaco', isoCode: 'MC' },
    { country: 'Montenegro', isoCode: 'ME' },
    { country: 'Netherlands', isoCode: 'NL' },
    { country: 'North Macedonia', isoCode: 'MK' },
    { country: 'Norway', isoCode: 'NO' },
    { country: 'Poland', isoCode: 'PL' },
    { country: 'Portugal', isoCode: 'PT' },
    { country: 'Romania', isoCode: 'RO' },
    { country: 'Russia', isoCode: 'RU' },
    { country: 'San Marino', isoCode: 'SM' },
    { country: 'Serbia', isoCode: 'RS' },
    { country: 'Slovakia', isoCode: 'SK' },
    { country: 'Slovenia', isoCode: 'SI' },
    { country: 'Spain', isoCode: 'ES' },
    { country: 'Sweden', isoCode: 'SE' },
    { country: 'Switzerland', isoCode: 'CH' },
    { country: 'Ukraine', isoCode: 'UA' },
    { country: 'United Kingdom', isoCode: 'GB' },
    { country: 'Vatican City', isoCode: 'VA' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/get') {
        const key = query.key;
        if (key) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('hello ' + key);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('key not passed');
        }
    }
    else if (pathname === '/DaysBetweenDates') {
        const date1 = query.date1;
        const date2 = query.date2;
        if (date1 && date2) {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(String(diffDays));
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('date1 and date2 parameters are required');
        }
    }
    else if (pathname === '/Validatephonenumber') {
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
    else if (pathname === '/ValidateSpanishDNI') {
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
    else if (pathname === '/ReturnColorCode') {
        const color = query.color;
        if (color) {
            fs.readFile(__dirname + '/colors.json', 'utf8', (err, data) => {
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
    else if (pathname === '/TellMeAJoke') {
        axios.get('https://official-joke-api.appspot.com/random_joke')
            .then(response => {
                const joke = response.data;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    setup: joke.setup,
                    punchline: joke.punchline
                }));
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error fetching joke');
            });
    }
    else if (pathname === '/MoviesByDirector') {
        const director = query.director;
        if (director) {
            // Search for movies, then filter by director
            axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(director)}&type=movie`)
                .then(async response => {
                    if (response.data.Response === 'True') {
                        // Get detailed info for each movie to verify director
                        const moviePromises = response.data.Search.map(movie =>
                            axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`)
                        );
                        const movieDetails = await Promise.all(moviePromises);
                        const directorMovies = movieDetails
                            .map(m => m.data)
                            .filter(m => m.Director && m.Director.toLowerCase().includes(director.toLowerCase()));

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(directorMovies));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'No movies found' }));
                    }
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error fetching movies');
                });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('director parameter is required');
        }
    }
    else if (pathname === '/ParseUrl') {
        const someurl = query.someurl;
        if (someurl) {
            try {
                const parsedSomeUrl = new URL(someurl);
                const result = {
                    protocol: parsedSomeUrl.protocol,
                    host: parsedSomeUrl.host,
                    port: parsedSomeUrl.port || '',
                    path: parsedSomeUrl.pathname,
                    querystring: parsedSomeUrl.search,
                    hash: parsedSomeUrl.hash
                };
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(parsedSomeUrl.host);
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('invalid url');
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('someurl parameter is required');
        }
    }
    else if (pathname === '/GetFullTextFile') {
        fs.readFile(__dirname + '/sample.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }
            const lines = data.split('\n').filter(line => line.includes('Fusce'));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(lines.join('\n'));
        });
    }
    else if (pathname === '/GetLineByLinefromtTextFile') {
        const readFileLineByLine = () => {
            return new Promise((resolve, reject) => {
                const fileStream = fs.createReadStream(__dirname + '/sample.txt');
                const rl = readline.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity
                });
                const matchingLines = [];
                rl.on('line', (line) => {
                    if (line.includes('Fusce')) {
                        matchingLines.push(line);
                    }
                });
                rl.on('close', () => {
                    resolve(matchingLines);
                });
                rl.on('error', (err) => {
                    reject(err);
                });
            });
        };

        readFileLineByLine()
            .then(lines => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(lines));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
            });
    }
    else if (pathname === '/CalculateMemoryConsumption') {
        const memoryUsage = process.memoryUsage();
        const memoryInGB = (memoryUsage.heapUsed / (1024 * 1024 * 1024)).toFixed(2);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(memoryInGB);
    }
    else if (pathname === '/RandomEuropeanCountry') {
        const randomIndex = Math.floor(Math.random() * europeanCountries.length);
        const randomCountry = europeanCountries[randomIndex];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(randomCountry));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('method not supported');
    }
});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});