/**
 * GET /health or /healthz
 * Simple liveness probe; returns 'ok' when the server is running
 */
function handleHealth(query, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
}

module.exports = handleHealth;
