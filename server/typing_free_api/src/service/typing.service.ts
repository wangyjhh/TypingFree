export const helloHandle = async (username: string) => {
	try {
		return { status: 0, message: username }
	} catch (error) {
		return { status: 1, message: error }
	}
}
