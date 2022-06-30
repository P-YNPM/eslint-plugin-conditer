import { RuleTester } from 'eslint';
import switchLinter from '../../../src/linter/switch';
import readTestData from '../util';

const testSwitchLinter = async () => {
    const data = readTestData('switch');
    new RuleTester().run('switch-linter', switchLinter(), {
        valid: (await data('valid')).split('//'),
        invalid: (await data('invalid')).split('//').map((code) => ({
            code,
            errors: 1,
        })),
    });
};

export default testSwitchLinter;
