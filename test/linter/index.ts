import testSwitchLinter from './switch';
import testTernaryLinter from './ternary';

describe('Linter', () => {
    it('should report error for invalid use case and do nothing for valid use case', async () => {
        await testTernaryLinter();
        await testSwitchLinter();
    });
});
