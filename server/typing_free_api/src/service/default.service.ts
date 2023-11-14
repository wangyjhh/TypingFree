import { t1, t2, t3, t4, t5 } from "../template/index"

export const getdefaultHandle = async (id: string) => {
	try {
		switch (id) {
			case "1":
				return { status: 0, data: t1 }
			case "2":
				return { status: 0, data: t2 }
				break
			case "3":
				return { status: 0, data: t3 }
				break
			case "4":
				return { status: 0, data: t4 }
				break
			case "5":
				return { status: 0, data: t5 }
				break
		}
	} catch (error) {
		return { status: 1, err: error }
	}
}
