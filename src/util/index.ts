import { Ranges, Locs } from '../type';

const nextStatementComparedToCurrentStatement = ({
    current,
    next,
}: Readonly<{
    current: number;
    next: number;
}>) => (next > current ? 'more' : next < current ? 'less' : 'equal');

const getDifferencesInNumberOfCharacters = (range: Ranges) => {
    if (!range) {
        throw new Error('range is not defined');
    }
    return range[1] - range[0];
};

const getLengthOfCodeBlock = (loc: Locs) => {
    if (!loc) {
        throw new Error('loc is not defined');
    }
    return loc.end.line - loc.start.line;
};

export {
    getLengthOfCodeBlock,
    nextStatementComparedToCurrentStatement,
    getDifferencesInNumberOfCharacters,
};
