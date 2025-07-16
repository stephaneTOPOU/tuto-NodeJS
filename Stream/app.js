import { createReadStream, createWriteStream } from 'node:fs'  
import { stat } from 'node:fs/promises'

const stream = createReadStream('video.mp4')


// const { size} = await stat('video.mp4')
// let read = 0
// stream.on('data', (chunk) => {
//     read += chunk.length
//     console.log(Math.round(100 * read / size))
// })
// stream.on('close', () => {
// console.log('Stream closed')
// })

const writeStream = createWriteStream('video-copy.mp4')
stream.pipe(writeStream)