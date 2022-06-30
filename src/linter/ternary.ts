import { Rule } from 'eslint';
import { ConditionalExpression } from 'estree';
import generateMeta from '../meta';
import {
    getDifferencesInNumberOfCharacters,
    nextStatementComparedToCurrentStatement,
} from '../util';

const ternaryLinter = (): Rule.RuleModule => {
    const messageId = 'ternary';
    const messages = {
        [messageId]:
            'The Consequent Statement of Ternary Block is longer than its Alternate Statement',
    } as const;
    return {
        meta: generateMeta({
            messages,
            description:
                'Enforce Alternate Statement of Ternary Operator to have more code than its Consequent Statement',
        }),
        create: (ruleContext: Rule.RuleContext) => ({
            ConditionalExpression: (expression: ConditionalExpression) => {
                const { consequent, alternate } = expression;
                if (
                    'less' ===
                    nextStatementComparedToCurrentStatement({
                        next: getDifferencesInNumberOfCharacters(
                            alternate.range,
                        ),
                        current: getDifferencesInNumberOfCharacters(
                            consequent.range,
                        ),
                    })
                ) {
                    ruleContext.report({
                        node: expression,
                        messageId,
                    });
                }
            },
        }),
    };
};

export default ternaryLinter;
