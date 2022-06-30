import {
    getDifferencesInNumberOfCharacters,
    nextStatementComparedToCurrentStatement,
} from '../../src/util';
import { expect } from 'chai';

describe('Linter Util', () => {
    it('should return the positive differences in number of characters based on the range', () => {
        expect(getDifferencesInNumberOfCharacters([0, 10])).to.equal(10);
    });
    it('should return the negative differences in number of characters based on the range', () => {
        expect(getDifferencesInNumberOfCharacters([10, 0])).to.equal(-10);
    });
    it('should return more if the current number is larger than the next number', () => {
        expect(
            nextStatementComparedToCurrentStatement({
                current: 1,
                next: 2,
            }),
        ).to.equal('more');
    });
    it('should return equal if the next number is equal to the current number', () => {
        expect(
            nextStatementComparedToCurrentStatement({
                current: 1,
                next: 1,
            }),
        ).to.equal('equal');
    });
    it('should return less if the next number is smaller than the current number', () => {
        expect(
            nextStatementComparedToCurrentStatement({
                current: 1,
                next: 0,
            }),
        ).to.equal('less');
    });
});
