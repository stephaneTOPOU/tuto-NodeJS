import { writeFile } from 'node:fs/promises'; 
await writeFile('./Demo.txt', 'Bonjour les gens !', 'utf8', { flag: 'a' })