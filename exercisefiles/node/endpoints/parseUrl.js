/**
 * GET /ParseUrl?someurl=ENCODED_URL
 * Parses provided URL and returns host component
 */
function handleParseUrl(query, res) {
    const someurl = query.someurl;
    if (someurl) {
        try {
            const parsedSomeUrl = new URL(someurl);
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

module.exports = handleParseUrl;
