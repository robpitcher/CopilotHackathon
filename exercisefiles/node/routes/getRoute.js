// Exercise 6: Node path rules

/**
 * Handles the /get endpoint
 * @param {object} query - Query parameters from the request
 * @param {object} res - HTTP response object
 */
function handleGetRoute(query, res) {
    const key = query.key;
    if (key) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello ' + key);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('key not passed');
    }
}

module.exports = {
    handleGetRoute
};
