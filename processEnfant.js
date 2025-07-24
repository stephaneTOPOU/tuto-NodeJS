import { createServer } from 'node:http';

createServer((req, res) => {
    res.write('Bonjour')
    res.end()
}).listen('8888')