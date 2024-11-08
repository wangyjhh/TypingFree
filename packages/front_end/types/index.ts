export type BaseState = 'primary' | 'success' | 'error'
export type SignsState = BaseState | 'warning' | 'ready'
export type TextState = BaseState | 'tready'

export interface Signs {
    c: string // 拼音字母数组
    s?: string // 拼音对应键盘的按键字符
    d?: SignsState
}

export interface TextDetail {
    text: string
    signs: Signs[]
    signsLength: number
    d?: TextState
}

export interface TextData {
    textDetail: TextDetail[]
    totalCharacters: number
    totalSigns: number
}

export interface Position {
    textPosition: number
    pinyinPosition: number
}
