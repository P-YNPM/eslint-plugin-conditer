/**
 * @fileoverview conditer: The conditional code blocks linter. Improve the readability Typescript and/or Javascript conditional code blocks
 * @author PoolOfDeath20
 */

import ifLinter from './linter/if';
import switchLinter from './linter/switch';
import ternaryLinter from './linter/ternary';

export default {
    rules: {
        if: ifLinter(),
        switch: switchLinter(),
        ternary: ternaryLinter(),
    },
};
