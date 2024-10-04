import { createConnection } from "mysql"
import type { MysqlError } from "mysql"
import oracledb from "oracledb"
import { DB_CONN } from "../../app.config.js"

oracledb.initOracleClient({ libDir: "[64位客户端安装路径]" })

export const db = (sql: string) => {
	return new Promise((resolve, reject): any => {
		const connection = createConnection(DB_CONN as string)

		connection.connect()

		connection.query(sql, (error: MysqlError, results: any) => {
			if (error) {
				reject(error.sqlMessage)
			}
			resolve(results)
		})

		connection.end()
	})
}

export const odb = async (sql: string) => {
	const options = {
		outFormat: oracledb.OUT_FORMAT_OBJECT,
	}
	const connection = await oracledb.getConnection({
		user: "[user]",
		password: "[password]",
		connectString: "[host:port/databases]",
	})
	const result = await connection.execute(sql, [], options)
	await connection.close()
	return result.rows
}
