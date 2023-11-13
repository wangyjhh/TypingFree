import crypto from "crypto"
export const md5 = (str: any) => {
	const hash = crypto.createHash("md5")
	return hash.update(str).digest("hex")
}
