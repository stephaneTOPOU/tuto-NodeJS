import { readFile } from 'node:fs/promises';

const content = await Promise.all([
    readFile(new URL('./Demo.txt', import.meta.url), 'utf8'),
    readFile(new URL('./package.json', import.meta.url), 'utf8')
])

console.log(content);











