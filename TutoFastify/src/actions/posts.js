import { db } from "../database.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"


export const listPosts = (req, res) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()

    res.view('templates/index.ejs', { posts })
}

export const showPost = (req, res) => {
    const postId = req.params.id
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId)

    // if (!post) {
    //     return res.status(404).send('Post not found')
    // }

    if (post === undefined) {
        throw new RecordNotFoundError(`Impossible de trouver l'article avec l'ID ${postId}`)
    }

    return res.view('templates/single.ejs', { post })
}

export const createPost = (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).send('Title and content are required')
    }

    const stmt = db.prepare('INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)')
    const info = stmt.run(title, content, Math.round(Date.now() / 1000))

    return res.redirect('/')
}