import fastify from 'fastify'
import fastifyFormBody from '@fastify/formbody'
import fastifySecureSession from '@fastify/secure-session'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import ejs from 'ejs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPost, listPosts, showPost } from './actions/posts.js'
import { RecordNotFoundError } from './errors/RecordNotFoundError.js'
import { login, logout, register } from './actions/auth.js'
import fs from 'node:fs'
import { NotAuthenticatedError } from './errors/NotAuthenticatedError.js'


const app = fastify()
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.register(fastifySecureSession, {
    cookieName: 'session',
    key: fs.readFileSync(join(rootDir, 'secret-key')),
    cookie: {
        path: '/',
    }
})

app.register(fastifyFormBody)
app.register(fastifyStatic, {
    root: join(rootDir, './public'),
    //prefix: '/public/'
})

app.get('/', listPosts)
app.post('/', createPost)
app.get('/login', login)
app.get('/register', register)
app.post('/login', login)
app.post('/logout', logout)
app.get('/article/:id', showPost)
app.setErrorHandler((error, req, res) => {
    if (error instanceof RecordNotFoundError) {
        return res.status(404).view('templates/404.ejs', { error })
    } else if (error instanceof NotAuthenticatedError) {
        return res.redirect('/login')
    }
    console.error(error)
    res.statusCode = 500
    return {
        error: error.message
    }
})

const start = async () => {
    try { 
        await app.listen({ port: 3000 })
        console.log('Server is running on http://localhost:3000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()