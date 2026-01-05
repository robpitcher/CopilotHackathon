/**
 * GET /get?key=VALUE
 * Returns 'hello VALUE' if key is provided, otherwise 400 error
 */
function handleGet(query, res) {
    const key = query.key;
    if (key) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('hello ' + key);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('key not passed');
    }
}

module.exports = handleGet;
