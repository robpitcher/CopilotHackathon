const axios = require('axios');

/**
 * GET /TellMeAJoke
 * Fetches a random joke from public API
 */
function handleTellMeAJoke(query, res) {
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

module.exports = handleTellMeAJoke;
