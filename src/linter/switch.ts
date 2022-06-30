import { Rule } from 'eslint';
import { SwitchStatement, Statement } from 'estree';
import generateMeta from '../meta';
import {
    getDifferencesInNumberOfCharacters,
    getLengthOfCodeBlock,
    nextStatementComparedToCurrentStatement,
} from '../util';

const hasNestedBreakOrReturnStatement = (statement: Statement): boolean => {
    const body: ReadonlyArray<Statement> =
        // @ts-ignore
        statement.body;
    if (!body) {
        return false;
    }
    return body.some((statement) => {
        if (
            statement.type === 'BreakStatement' ||
            statement.type === 'ReturnStatement'
        ) {
            return true;
        }
        return hasNestedBreakOrReturnStatement(statement);
    });
};

const checkConsequentHasNested = (
    statements: ReadonlyArray<Statement>,
): boolean =>
    statements.some((statement) => {
        switch (statement.type) {
            case 'BreakStatement':
            case 'ReturnStatement':
                return false;
            default:
                return !hasNestedBreakOrReturnStatement(statement);
        }
    });

const switchLinter = (): Rule.RuleModule => {
    const messageId = 'switch';
    const messages = {
        [messageId]:
            'The SwitchCase Code Block is longer than its next SwitchCase Code Block',
    } as const;
    return {
        meta: generateMeta({
            messages,
            description:
                'Enforce Cases of Switch Case Statement to be arranged in ascending order according on its respective code length',
        }),
        create: (ruleContext: Rule.RuleContext) => ({
            SwitchStatement: (statement: SwitchStatement) => {
                const { cases } = statement;
                const isReportable = cases.some((currentCase, index) => {
                    const nextCase = cases[index + 1];
                    // if there is no consequent for the case
                    if (!nextCase?.consequent?.length) {
                        return false;
                    }
                    const resultOfComparison =
                        nextStatementComparedToCurrentStatement({
                            next: getDifferencesInNumberOfCharacters(
                                nextCase.range,
                            ),
                            current: getDifferencesInNumberOfCharacters(
                                currentCase.range,
                            ),
                        });
                    switch (resultOfComparison) {
                        case 'more':
                        case 'equal':
                            return false;
                        case 'less': {
                            const previousCase = cases[index - 1];
                            const numberOfContinuousCases = !(
                                previousCase &&
                                checkConsequentHasNested(
                                    previousCase.consequent,
                                )
                            )
                                ? !checkConsequentHasNested(
                                      currentCase.consequent,
                                  )
                                    ? []
                                    : [currentCase]
                                : cases.filter(
                                      (currentCase, currentCaseIndex) => {
                                          if (currentCaseIndex > index) {
                                              return false;
                                          }
                                          const { consequent } = currentCase;
                                          const lastConsequent =
                                              consequent[consequent.length - 1];
                                          if (!lastConsequent) {
                                              // because it's continuous case, hence it's consequent is empty
                                              return true;
                                          } else if (
                                              lastConsequent.type ===
                                                  'BreakStatement' ||
                                              lastConsequent.type ===
                                                  'ReturnStatement'
                                          ) {
                                              return false;
                                          } else {
                                              return checkConsequentHasNested(
                                                  consequent,
                                              );
                                          }
                                      },
                                  );
                            if (!numberOfContinuousCases.length) {
                                return true;
                            } else if (numberOfContinuousCases.length) {
                                const previousCasesBeforeCurrentCase =
                                    cases.filter(
                                        (currentCase, currentCaseIndex) => {
                                            if (currentCaseIndex >= index) {
                                                return false;
                                            }
                                            const { consequent } = currentCase;
                                            const lastConsequent =
                                                consequent[
                                                    consequent.length - 1
                                                ];
                                            if (!lastConsequent) {
                                                // because it's continuous case, hence it's consequent is empty
                                                return true;
                                            } else if (
                                                lastConsequent.type ===
                                                    'BreakStatement' ||
                                                lastConsequent.type ===
                                                    'ReturnStatement'
                                            ) {
                                                return false;
                                            } else {
                                                return checkConsequentHasNested(
                                                    consequent,
                                                );
                                            }
                                        },
                                    );
                                if (
                                    getLengthOfCodeBlock(currentCase.loc) >=
                                    previousCasesBeforeCurrentCase.length +
                                        numberOfContinuousCases.reduce(
                                            (prev, { loc }) =>
                                                prev +
                                                getLengthOfCodeBlock(loc),
                                            0,
                                        )
                                ) {
                                    return false;
                                }
                            } else if (
                                getLengthOfCodeBlock(nextCase.loc) >=
                                numberOfContinuousCases.length +
                                    numberOfContinuousCases.reduce(
                                        (prev, { loc }) =>
                                            prev + getLengthOfCodeBlock(loc),
                                        0,
                                    )
                            ) {
                                return false;
                            }
                        }
                    }
                    return true;
                });
                if (isReportable) {
                    ruleContext.report({
                        node: statement,
                        messageId,
                    });
                }
            },
        }),
    };
};

export default switchLinter;
