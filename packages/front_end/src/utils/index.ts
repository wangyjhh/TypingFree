import type { Signs, TextData } from '@/../types'
import pinyin from 'pinyin'
import { ref } from 'vue'

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

export const generateTypeTemplate = (text: string) => {
    text = text.trim().replace('……', '^').replace('——', '_')

    const template = ref<TextData>({
        textDetail: [],
        totalCharacters: 0,
        totalSigns: 0,
    })

    for (const char of text) {
        // 拼音字符形式
        const pinyinCharacters = pinyin(char, { style: pinyin.STYLE_NORMAL }).join('')
        // 拼音字母形式
        const pinyinAlphabet = pinyin(char).join('')
        const signs: Signs[] = []
        for (let i = 0; i < pinyinAlphabet.length; i++) {
            let c = pinyinCharacters[i].replace(replaceReg, dotMap[pinyinCharacters[i]])
            let s = pinyinAlphabet[i]
            if (pinyinCharacters === ' ') {
                c = ' '
                s = 'space'
            }
            else if (pinyinCharacters === '\n') {
                c = 'Enter'
                s = '↵'
            }
            if (c !== s)
                signs.push({ c, s, d: 'primary' })
            else signs.push({ c, d: 'primary' })
        }
        template.value.textDetail.push({ text: char, signs, signsLength: signs.length, d: 'primary' })
        template.value.totalSigns += signs.length
        template.value.totalCharacters += 1
    }
    return template.value
}
