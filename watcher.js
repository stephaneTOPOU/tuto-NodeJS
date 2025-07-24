import { spawn } from 'node:child_process'
import { watch } from 'node:fs/promises'



const [node, _, file] = process.argv

function spawnNode() {
    const pr = spawn(node, [file])
    pr.stdout.pipe(process.stdout)
    pr.stderr.pipe(process.stderr)

    pr.on('close', (code) => {
        if (code !== 0) {
            process.exit(code)
        }
    })
    return pr
}

let childProcess = spawnNode()
const watcher = watch('./', {recursive: true})
for await (const event of watcher) {
    if (event.filename.endsWith('.js')){
        childProcess.kill('SIGKILL')
        childProcess = spawnNode()
    }
}