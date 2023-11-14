type BaseState = "primary" | "success" | "error"
declare type SignsState = BaseState | "warning" | "ready"
declare type TextState = BaseState | "tready"

declare interface Signs {
	c: string // 拼音字母数组
	s?: string // 拼音对应键盘的按键字符
	d?: SignsState
}

declare interface TextDetail {
	text: string
	signs: Signs[]
	signsLength: number
	d?: TextState
}

declare interface TextData {
	textDetail: TextDetail[]
	totalCharacters: number
	totalSigns: number
}

declare interface Position {
	textPosition: number
	pinyinPosition: number
}
