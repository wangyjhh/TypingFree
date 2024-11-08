import { pinyin } from 'pinyin-pro'

export const pinyinHandle = async (text: string) => {
    try {
        const pinyinAlphabet = pinyin(text, { v: true, multiple: true }).split(' ')
        return { status: 0, data: { text, pinyin: pinyinAlphabet } }
    }
    catch (error) {
        return { status: 1, err: error }
    }
}
