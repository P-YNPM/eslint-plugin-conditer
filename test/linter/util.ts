import * as fs from 'fs';

const readTestData =
    (statement: 'ternary' | 'switch' | 'if') => (type: 'valid' | 'invalid') =>
        new Promise<string>((resolve, reject) => {
            let fetchData = '';
            fs.createReadStream(
                `${process.cwd()}/test/linter/${statement}/${type}.js`,
            )
                .on('data', (data) => (fetchData = data.toString()))
                .on('end', () => resolve(fetchData))
                .on('error', reject);
        });

export default readTestData;
