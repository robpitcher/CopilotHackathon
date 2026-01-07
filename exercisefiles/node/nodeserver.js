// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');

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
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('method not supported');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});