import $http from "@/utils/request"

const generateRandomNumber = (): number => {
	// 生成1到10之间的随机整数
	const randomNumber = Math.floor(Math.random() * 5) + 1 // Math.random()生成0到1之间的随机小数，乘以10并向下取整得到0到9之间的随机整数，加1得到1到10之间的随机整数
	return randomNumber
}

export const getDefault = async () => {
	const { data: res } = await $http.get(`/getdefault/${generateRandomNumber()}`)
	if (res.status !== 0) {
		return
	}
	return res.data
}

export const getCustom = async (text: string) => {
	const { data: res } = await $http.post("/getcustom", {
		text,
	})
	if (res.status !== 0) {
		return
	}
	return res.data
}
