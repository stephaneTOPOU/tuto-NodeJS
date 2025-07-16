import { open } from 'node:fs/promises' 

const file = await open('./Demo.txt', 'a')
file.write('Bonjour les gens !\n')
file.close()