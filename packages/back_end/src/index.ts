import { log } from 'node:console'
import fs from 'node:fs'
import https from 'node:https'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { APP_PORT } from './app.config'
import app from './app/app'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

log(__dirname)

const options = {
    key: fs.readFileSync(join(__dirname, '../cert/typingfree.top.key')),
    cert: fs.readFileSync(join(__dirname, '../cert/typingfree.top.pem')),
}

const httpsServer = https.createServer(options, app)

httpsServer.listen(APP_PORT, () => {
    log(`server is running at \n> Local: https://typingfree.top:${APP_PORT}`)
})
