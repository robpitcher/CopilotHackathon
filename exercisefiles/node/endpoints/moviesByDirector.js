const axios = require('axios');

/**
 * GET /MoviesByDirector?director=NAME
 * Uses OMDb API to search and filter movies by director
 */
function handleMoviesByDirector(query, res, omdbApiKey) {
    const director = query.director;
    if (director) {
        // Search for movies, then filter by director
        axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${encodeURIComponent(director)}&type=movie`)
            .then(async response => {
                if (response.data.Response === 'True') {
                    // Get detailed info for each movie to verify director
                    const moviePromises = response.data.Search.map(movie =>
                        axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdbID}`)
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

module.exports = handleMoviesByDirector;
