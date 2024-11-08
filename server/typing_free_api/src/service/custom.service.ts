import { pinyin } from 'pinyin-pro'

export const getcustomHandle = async (text: string) => {
    try {
        const replaceReg: RegExp = /([，。；：？、！“”’‘￥（）【】《》])/g

        const dotMap: Record<string, string> = {
            '；': ';',
            '。': '.',
            '，': ',',
            '：': ':',
            '、': '\\',
            '？': '?',
            '！': '!',
            '’': '\'',
            '‘': '\'',
            '“': '"',
            '”': '"',
            '￥': '$',
            '（': '(',
            '）': ')',
            '【': '[',
            '】': ']',
            '《': '<',
            '》': '>',
        }

        text = text.trim().replace('……', '^').replace('——', '_').replace(' ', '①')
        // console.log(findSpaces(text))

        const template: TextData = {
            textDetail: [],
            totalCharacters: 0,
            totalSigns: 0,
        }
        // 拼音字符形式
        const pinyinCharacters = pinyin(text, { v: true, toneType: 'none' }).split(' ')
        // 	// 拼音字母形式
        const pinyinAlphabet = pinyin(text).split(' ')
        const textArr = text.split('')
        for (let i = 0; i < textArr.length; i++) {
            const signs: Signs[] = []
            for (let j = 0; j < pinyinAlphabet[i].length; j++) {
                let c = pinyinCharacters[i][j].replace(replaceReg, dotMap[pinyinCharacters[i][j]])
                let s = pinyinAlphabet[i][j]
                if (pinyinCharacters[i] === '①') {
                    c = ' '
                    s = 'space'
                }
                else if (pinyinCharacters[i] === '\n') {
                    c = 'Enter'
                    s = '↵'
                }
                if (c !== s)
                    signs.push({ c, s, d: 'primary' })
                else signs.push({ c, d: 'primary' })
            }
            template.textDetail.push({ text: textArr[i], signs, signsLength: signs.length, d: 'primary' })
            template.totalSigns += signs.length
            template.totalCharacters += 1
        }
        return { status: 0, data: template }
    }
    catch (error) {
        return { status: 1, err: error }
    }
}
