import { readdir, stat } from "node:fs/promises"

console.time('code')
const files = await readdir('./', { withFileTypes: true })
await Promise.all(
    files.map(async (file) => {
        const parts = [
            file.name,
            file.isDirectory() ? 'D' : 'F',
        ]
        if (!file.isDirectory()) {
            const { size } = await stat(file.name)
            parts.push(`${size} octets`)
        }
        console.log(`${parts.join(' - ')}`)
    })
)
console.timeEnd('code')