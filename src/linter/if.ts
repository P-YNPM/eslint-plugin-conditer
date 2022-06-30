import { Rule } from 'eslint';
import { IfStatement } from 'estree';
import generateMeta from '../meta';
import {
    getDifferencesInNumberOfCharacters,
    nextStatementComparedToCurrentStatement,
} from '../util';

const ifLinter = (): Rule.RuleModule => {
    const messageId = 'if';
    const messages = {
        [messageId]:
            'The Consequent Code Block of If Statement is longer than its next Alternate Code Block',
    } as const;
    return {
        meta: generateMeta({
            messages,
            description:
                'Enforce Alternate Code Block of If Statement to have more code than its Consequent Code Block',
        }),
        create: (ruleContext: Rule.RuleContext) => ({
            IfStatement: (statement: IfStatement) => {
                const { consequent, alternate } = statement;
                // there is `else` or `else if`
                if (
                    alternate &&
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
                        node: statement,
                        messageId,
                    });
                }
            },
        }),
    };
};

export default ifLinter;
