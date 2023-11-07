import { ref } from "vue"
import pinyin from "pinyin"

export const generateTypeTemplate = (text: string) => {
	text = text.trim()
	const template = ref<{ textDetail: TextDetail[]; totalSigns: number }>({
		textDetail: [],
		totalSigns: 0,
	})

	for (let char of text) {
		if (char === " ") continue
		// 拼音字符形式
		let pinyinCharacters = pinyin(char, { style: pinyin.STYLE_NORMAL }).join("")
		// 拼音字母形式
		let pinyinAlphabet = pinyin(char).join("")
		let signs: Signs[] = []
		for (let i = 0; i < pinyinAlphabet.length; i++) {
			let c = pinyinCharacters[i].replace("。", ".").replace("，", ",").replace("、", "\\")
			let s = pinyinAlphabet[i]

			if (c !== s) signs.push({ c, s, d: "primary" })
			else signs.push({ c, d: "primary" })
		}
		template.value.textDetail.push({ text: char, signs: signs, signsLength: signs.length, d: "primary" })
		template.value.totalSigns += signs.length
	}

	return template.value
}
