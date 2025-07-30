import { db } from "../database.js"
import { hash, verify} from '@phc/argon2'

export const login = async(req, res) => {
    const params = {}
    if (req.method === 'POST') {
        const { username, password } = req.body
        params.username = username
        const user = db.prepare('SELECT * FROM users WHERE username = ?')
            .get(username)
        if (user != undefined && await verify(user.password, password)) {
            req.session.user = {
                id: user.id,
                username: user.username
            }
            return res.redirect('/')
        }
        params.error = 'Identifiants incorrects'
    }
    return res.view('templates/Auth/login.ejs', params)
}

export const register = (req, res) => {
    return res.view('templates/Auth/register.ejs')
}

export const logout = (req, res) => {
    req.session.delete()
    return res.redirect('/')
}