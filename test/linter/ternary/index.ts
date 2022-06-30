import { RuleTester } from 'eslint';
import ternaryLinter from '../../../src/linter/ternary';
import readTestData from '../util';

const testTernaryLinter = async () => {
    const data = readTestData('ternary');
    new RuleTester().run('ternary-linter', ternaryLinter(), {
        valid: (await data('valid')).split('//'),
        invalid: (await data('invalid')).split('//').map((code) => ({
            code,
            errors: 1,
        })),
    });
};

export default testTernaryLinter;
