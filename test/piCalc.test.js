//Install mocha for unit testing: https://mochajs.org/#installation: npm install --global mocha
import assert from 'assert';
import piCalc from '../static/picalc_main.js'; //Monte Carlo Simulation to calculate pi

describe('piCalc.js tests', () => {
    it('should return true', () => {
        assert.equal(typeof piCalc === 'function', true); //if the function is undefined i.e. gives no retun value, then test fails
    });
});