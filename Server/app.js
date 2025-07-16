import { createReadStream } from 'node:fs'
import { createServer} from 'node:http'

const server = createServer((req, res) => {
    console.log(req.headers)
    const file = createReadStream('./index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    file.pipe(res, { end: false })
    file.on('end', () => res.end())
})
server.listen('9999')