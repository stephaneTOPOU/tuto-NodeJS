import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'


const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    res.write(`Bonjour ${(await json(req)).name}`)
    res.end()
})
server.listen('9991')