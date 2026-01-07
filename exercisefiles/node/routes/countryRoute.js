// Exercise 6: Node path rules

const { europeanCountries } = require('../countryData');

/**
 * Handles the /RandomEuropeanCountry endpoint
 * @param {object} res - HTTP response object
 */
function handleCountryRoute(res) {
    const randomIndex = Math.floor(Math.random() * europeanCountries.length);
    const randomCountry = europeanCountries[randomIndex];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        country: randomCountry.country,
        isoCode: randomCountry.isoCode
    }));
}

module.exports = {
    handleCountryRoute
};
