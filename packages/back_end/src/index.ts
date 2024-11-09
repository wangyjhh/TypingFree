import { log } from 'node:console'
import http from 'node:http'
import { APP_PORT } from './app.config'
import app from './app/app'

const httpServer = http.createServer(app)

httpServer.listen(APP_PORT, () => {
    log(`server is running at \n> Local: http://typingfree.top:${APP_PORT}`)
})
