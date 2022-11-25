//describe — a logical grouping of tests, “Simple Math Test”
//it — a single test, “it.. should return x”
//assert — how you validate your test works or fails, “assert.equal(1+ 1, 2)”
import assert from 'assert';

describe('Simple Math Test', () => {
    it('should return 2', () => {
        assert.equal(1 + 1, 2);
    });
    it('should return 9', () => {
        assert.equal(3 * 3, 9);
    });
});