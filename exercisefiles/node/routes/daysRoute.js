// Exercise 6: Node path rules

/**
 * Handles the /DaysBetweenDates endpoint
 * @param {object} query - Query parameters from the request
 * @param {object} res - HTTP response object
 */
function handleDaysRoute(query, res) {
    const date1 = query.date1;
    const date2 = query.date2;
    
    if (date1 && date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Days between ${date1} and ${date2}: ${diffDays}`);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('date1 and date2 parameters are required');
    }
}

module.exports = {
    handleDaysRoute
};
