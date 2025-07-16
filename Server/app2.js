import { createReadStream } from 'node:fs'
import { createServer} from 'node:http'

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    res.write(`Bonjour ${url.searchParams.get('name')}`)
    res.end()
})
server.listen('9992')