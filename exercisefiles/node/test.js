//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
const axios = require('axios');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http.get('http://localhost:3000/get', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });

    // Test get when key is equal to world
    it('should return "hello world" when key is world', (done) => {
        http.get('http://localhost:3000/get?key=world', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'hello world');
                done();
            });
        });
    });

    // Test validatephoneNumber with valid Spanish number
    it('should return "valid" for valid Spanish phone number', (done) => {
        http.get('http://localhost:3000/Validatephonenumber?phoneNumber=%2B34612345678', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
                done();
            });
        });
    });

    // Test validatephoneNumber with invalid number
    it('should return "invalid" for invalid phone number', (done) => {
        http.get('http://localhost:3000/Validatephonenumber?phoneNumber=123456', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'invalid');
                done();
            });
        });
    });

    // Test validateSpanishDNI with valid DNI
    it('should return "valid" for valid Spanish DNI', (done) => {
        http.get('http://localhost:3000/ValidateSpanishDNI?dni=12345678Z', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
                done();
            });
        });
    });

    // Test validateSpanishDNI with invalid DNI
    it('should return "invalid" for invalid Spanish DNI', (done) => {
        http.get('http://localhost:3000/ValidateSpanishDNI?dni=12345678A', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'invalid');
                done();
            });
        });
    });

    // Test returnColorCode for red
    it('should return "#FF0000" for color red', (done) => {
        http.get('http://localhost:3000/ReturnColorCode?color=red', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '#FF0000');
                done();
            });
        });
    });

    // Test daysBetweenDates
    it('should return correct days between two dates', (done) => {
        http.get('http://localhost:3000/DaysBetweenDates?date1=2024-01-01&date2=2024-01-10', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '9');
                done();
            });
        });
    });

    // Test ParseUrl
    it('should return host from parsed URL', (done) => {
        http.get('http://localhost:3000/ParseUrl?someurl=' + encodeURIComponent('https://example.com:8080/path'), (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'example.com:8080');
                done();
            });
        });
    });

    // Test CalculateMemoryConsumption
    it('should return memory consumption as a number string', (done) => {
        http.get('http://localhost:3000/CalculateMemoryConsumption', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.ok(!isNaN(parseFloat(data)));
                done();
            });
        });
    });

    // Test RandomEuropeanCountry
    it('should return a random European country with country and isoCode', (done) => {
        http.get('http://localhost:3000/RandomEuropeanCountry', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const result = JSON.parse(data);
                assert.ok(result.country);
                assert.ok(result.isoCode);
                done();
            });
        });
    });

    // Test TellMeAJoke
    it('should return a joke with setup and punchline or error', (done) => {
        http.get('http://localhost:3000/TellMeAJoke', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const result = JSON.parse(data);
                    assert.ok(result.setup);
                    assert.ok(result.punchline);
                } else if (res.statusCode === 500) {
                    assert.equal(data, 'Error fetching joke');
                }
                done();
            });
        });
    });

    // Test GetFullTextFile
    it('should return lines containing "Fusce" from sample.txt', (done) => {
        http.get('http://localhost:3000/GetFullTextFile', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.ok(data.includes('Fusce'));
                done();
            });
        });
    });

    // Test GetLineByLinefromtTextFile
    it('should return JSON array of lines containing "Fusce"', (done) => {
        http.get('http://localhost:3000/GetLineByLinefromtTextFile', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const result = JSON.parse(data);
                assert.ok(Array.isArray(result));
                assert.ok(result.length > 0);
                assert.ok(result[0].includes('Fusce'));
                done();
            });
        });
    });
});

// Exercise 6: Health-check endpoint
describe('Health-check endpoint', function () {
  // Ensure server is listening before tests
  before(function (done) {
    if (server.listening) return done();
    server.once('listening', done);
  });

  it('GET /health should return ok', async function () {
    try {
      const res = await axios.get('http://localhost:3000/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data, 'ok');
    } catch (err) {
      assert.fail(`Request failed: ${err.message}`);
    }
  });

  // Clean up
  after(function (done) {
    server.close(done);
  });
});
