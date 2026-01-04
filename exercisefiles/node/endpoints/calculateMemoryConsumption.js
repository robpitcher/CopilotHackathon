/**
 * GET /CalculateMemoryConsumption
 * Reports heap usage in GB
 */
function handleCalculateMemoryConsumption(query, res) {
    const memoryUsage = process.memoryUsage();
    const memoryInGB = (memoryUsage.heapUsed / (1024 * 1024 * 1024)).toFixed(2);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(memoryInGB);
}

module.exports = handleCalculateMemoryConsumption;
