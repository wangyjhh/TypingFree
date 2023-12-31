import app from "./app/app"
import { APP_PORT } from "./app.config"
import fs from "node:fs"
import { join, dirname } from "node:path"
import https from "node:https"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__dirname)

const options = {
	key: fs.readFileSync(join(__dirname, "../cert/typingfree.top.key")),
	cert: fs.readFileSync(join(__dirname, "../cert/typingfree.top.pem")),
}

const httpsServer = https.createServer(options, app)

httpsServer.listen(APP_PORT, () => {
	console.log(`server is running at \n> Local: https://typingfree.top:${APP_PORT}`)
})
