import { env } from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

export const { APP_PORT, DB_CONN } = env
