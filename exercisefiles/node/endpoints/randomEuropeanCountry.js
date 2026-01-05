// Static reference data for /RandomEuropeanCountry
const europeanCountries = [
    { country: 'Albania', isoCode: 'AL' },
    { country: 'Andorra', isoCode: 'AD' },
    { country: 'Austria', isoCode: 'AT' },
    { country: 'Belarus', isoCode: 'BY' },
    { country: 'Belgium', isoCode: 'BE' },
    { country: 'Bosnia and Herzegovina', isoCode: 'BA' },
    { country: 'Bulgaria', isoCode: 'BG' },
    { country: 'Croatia', isoCode: 'HR' },
    { country: 'Cyprus', isoCode: 'CY' },
    { country: 'Czech Republic', isoCode: 'CZ' },
    { country: 'Denmark', isoCode: 'DK' },
    { country: 'Estonia', isoCode: 'EE' },
    { country: 'Finland', isoCode: 'FI' },
    { country: 'France', isoCode: 'FR' },
    { country: 'Germany', isoCode: 'DE' },
    { country: 'Greece', isoCode: 'GR' },
    { country: 'Hungary', isoCode: 'HU' },
    { country: 'Iceland', isoCode: 'IS' },
    { country: 'Ireland', isoCode: 'IE' },
    { country: 'Italy', isoCode: 'IT' },
    { country: 'Latvia', isoCode: 'LV' },
    { country: 'Liechtenstein', isoCode: 'LI' },
    { country: 'Lithuania', isoCode: 'LT' },
    { country: 'Luxembourg', isoCode: 'LU' },
    { country: 'Malta', isoCode: 'MT' },
    { country: 'Moldova', isoCode: 'MD' },
    { country: 'Monaco', isoCode: 'MC' },
    { country: 'Montenegro', isoCode: 'ME' },
    { country: 'Netherlands', isoCode: 'NL' },
    { country: 'North Macedonia', isoCode: 'MK' },
    { country: 'Norway', isoCode: 'NO' },
    { country: 'Poland', isoCode: 'PL' },
    { country: 'Portugal', isoCode: 'PT' },
    { country: 'Romania', isoCode: 'RO' },
    { country: 'Russia', isoCode: 'RU' },
    { country: 'San Marino', isoCode: 'SM' },
    { country: 'Serbia', isoCode: 'RS' },
    { country: 'Slovakia', isoCode: 'SK' },
    { country: 'Slovenia', isoCode: 'SI' },
    { country: 'Spain', isoCode: 'ES' },
    { country: 'Sweden', isoCode: 'SE' },
    { country: 'Switzerland', isoCode: 'CH' },
    { country: 'Ukraine', isoCode: 'UA' },
    { country: 'United Kingdom', isoCode: 'GB' },
    { country: 'Vatican City', isoCode: 'VA' }
];

/**
 * GET /RandomEuropeanCountry
 * Returns a random country from static list
 */
function handleRandomEuropeanCountry(query, res) {
    const randomIndex = Math.floor(Math.random() * europeanCountries.length);
    const randomCountry = europeanCountries[randomIndex];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(randomCountry));
}

module.exports = handleRandomEuropeanCountry;
