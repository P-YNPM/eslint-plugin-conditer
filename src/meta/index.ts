import { Rule } from 'eslint';

const generateMeta = ({
    description,
    messages,
}: Readonly<{
    description: string;
    messages: Readonly<{
        [key: string]: string;
    }>;
}>) =>
    ({
        messages,
        type: 'suggestion',
        docs: {
            description,
            category: 'Best Practices',
            recommended: true,
        },
    } as Rule.RuleModule['meta']);

export default generateMeta;
