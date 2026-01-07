//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
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

    it('should return "Hello world" when key is equal to world', (done) => {
        http.get('http://localhost:3000/get?key=world', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Hello world');
                done();
            });
        });
    });

    it('should validate correct US phone number', () => {
        const result = server.validatePhoneNumber('123-456-7890');
        assert.equal(result, true);
    });

    it('should reject invalid phone number', () => {
        const result = server.validatePhoneNumber('123-456-789');
        assert.equal(result, false);
    });

    it('should validate correct Spanish DNI', () => {
        const result = server.validateSpanishDNI('12345678Z');
        assert.equal(result, true);
    });

    it('should reject invalid Spanish DNI', () => {
        const result = server.validateSpanishDNI('12345678A');
        assert.equal(result, false);
    });

    it('should return #FF0000 for red color', () => {
        const result = server.returnColorCode('red');
        assert.equal(result, '#FF0000');
    });

    it('should return #00FF00 for green color', () => {
        const result = server.returnColorCode('green');
        assert.equal(result, '#00FF00');
    });

    it('should return #0000FF for blue color', () => {
        const result = server.returnColorCode('blue');
        assert.equal(result, '#0000FF');
    });

    it('should calculate days between two dates', () => {
        const result = server.daysBetweenDates('2024-01-01', '2024-01-11');
        assert.equal(result, 10);
    });

    it('should calculate days between dates across months', () => {
        const result = server.daysBetweenDates('2024-01-31', '2024-02-10');
        assert.equal(result, 10);
    });
});
