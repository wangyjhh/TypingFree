declare type SignsState = "primary" | "success" | "error" | "warning" | "ready"
declare type TextState = "primary" | "success" | "error" | "tready"

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

declare interface Position {
	textPosition: number
	pinyinPosition: number
}
