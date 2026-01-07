// Exercise 6: Node path rules

/**
 * Handles the /health endpoint
 * @param {object} res - HTTP response object
 */
function handleHealthRoute(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
}

module.exports = {
    handleHealthRoute
};
