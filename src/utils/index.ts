import { ref } from "vue"
import pinyin from "pinyin"

const replaceReg: RegExp = /([\，\。\；\：\？\、\！\“\”\’\‘\￥\（\）\【\】\《\》])/g

const dotMap: Record<string, string> = {
	"；": ";",
	"。": ".",
	"，": ",",
	"：": ":",
	"、": "\\",
	"？": "?",
	"！": "!",
	"’": "'",
	"‘": "'",
	"“": '"',
	"”": '"',
	"￥": "$",
	"（": "(",
	"）": ")",
	"【": "[",
	"】": "]",
	"《": "<",
	"》": ">",
}

export const generateTypeTemplate = (text: string) => {
	text = text.trim().replace("……", "^").replace("——", "_")

	const template = ref<TextData>({
		textDetail: [],
		totalCharacters: 0,
		totalSigns: 0,
	})

	for (let char of text) {
		// 拼音字符形式
		let pinyinCharacters = pinyin(char, { style: pinyin.STYLE_NORMAL }).join("")
		// 拼音字母形式
		let pinyinAlphabet = pinyin(char).join("")
		let signs: Signs[] = []
		for (let i = 0; i < pinyinAlphabet.length; i++) {
			let c = pinyinCharacters[i].replace(replaceReg, dotMap[pinyinCharacters[i]])
			let s = pinyinAlphabet[i]
			if (pinyinCharacters === " ") {
				c = " "
				s = "space"
			} else if (pinyinCharacters === "\n") {
				c = "Enter"
				s = "↵"
			}
			if (c !== s) signs.push({ c, s, d: "primary" })
			else signs.push({ c, d: "primary" })
		}
		template.value.textDetail.push({ text: char, signs: signs, signsLength: signs.length, d: "primary" })
		template.value.totalSigns += signs.length
		template.value.totalCharacters += 1
	}
	return template.value
}
