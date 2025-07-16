import { watch } from 'node:fs/promises'


const watcher = watch('./')
for await (const event of watcher) {
    console.log(event)
}