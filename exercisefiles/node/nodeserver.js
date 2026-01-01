// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/ReturnColorCode') {
        const color = query.color;
        if (color) {
            try {
                const colorsData = fs.readFileSync('./colors.json', 'utf8');
                const colors = JSON.parse(colorsData);
                const foundColor = colors.find(c => c.color.toLowerCase() === color.toLowerCase());
                if (foundColor) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(foundColor.code.hex);
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('color not found');
                }
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('error reading colors file');
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('color parameter is required');
        }
    }
    if (pathname === '/DaysBetweenDates') {
        const date1 = query.date1;
        const date2 = query.date2;
        if (date1 && date2) {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Days between dates: ' + diffDays);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('date1 and date2 parameters are required');
        }
    }
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
    if (pathname === '/Validatephonenumber') {
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
    if (pathname === '/ValidateSpanishDNI') {
        const dni = query.dni;
        if (dni) {
            const dniRegex = /^(\d{8})([A-Z])$/;
            const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const match = dni.match(dniRegex);
            if (match) {
                const number = parseInt(match[1], 10);
                const letter = match[2];
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
    if (pathname === '/TellMeAJoke') {
        axios.get('https://official-joke-api.appspot.com/random_joke')
            .then(response => {
                const joke = response.data;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    setup: joke.setup,
                    punchline: joke.punchline
                }));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('error fetching joke');
            });
        return;
    }
    if (pathname === '/ListFiles') {
        try {
            const currentDir = process.cwd();
            const files = fs.readdirSync(currentDir);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                currentDirectory: currentDir,
                files: files
            }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('error reading directory');
        }
    }
    if (pathname === '/CalculateMemoryConsumption') {
        const memoryUsage = process.memoryUsage();
        const memoryInGB = (memoryUsage.heapUsed / (1024 * 1024 * 1024)).toFixed(2);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            memoryConsumptionGB: parseFloat(memoryInGB)
        }));
    }

});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});