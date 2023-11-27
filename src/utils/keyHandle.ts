export const fzone = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]
export const windows = [42, 145, 19]
export const chars = [
	192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 20, 65, 83, 68, 70, 71, 72,
	74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 91, 18, 32, 18, 91, 93, 17,
]
export const dir = [45, 36, 33, 46, 35, 34, 38, 37, 40, 39]
export const num = [144, 111, 106, 109, 103, 104, 105, 100, 101, 102, 97, 98, 99, 110, 107, 13]

interface KMap {
	[key: number]: string | string[]
}

export const KeyMap: KMap = {
	27: "Esc",
	112: "F1",
	113: "F2",
	114: "F3",
	115: "F4",
	116: "F5",
	117: "F6",
	118: "F7",
	119: "F8",
	120: "F9",
	121: "F10",
	122: "F11",
	123: "F12",
	42: "PrtSc",
	145: "ScrLk",
	19: "Pause",
	192: ["`", "~"],
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	55: "7",
	56: "8",
	57: "9",
	48: "0",
	189: ["-", "_"],
	187: ["=", "+"],
	8: "Backspace",
	9: "Tab",
	81: "Q",
	87: "W",
	69: "E",
	82: "R",
	84: "T",
	89: "Y",
	85: "U",
	73: "I",
	79: "O",
	80: "P",
	219: ["[", "{"],
	221: ["]", "}"],
	220: ["\\", "|"],
	20: "CapsLock",
	65: "A",
	83: "S",
	68: "D",
	70: "F",
	71: "G",
	72: "H",
	74: "J",
	75: "K",
	76: "L",
	186: [";", ":"],
	222: ["'", '"'],
	13: "Enter",
	16: "Shift",
	90: "Z",
	88: "X",
	67: "C",
	86: "V",
	66: "B",
	78: "N",
	77: "M",
	188: [",", "<"],
	190: [".", ">"],
	191: ["/", "?"],
	17: "Control",
	91: "Win",
	18: "Alt",
	32: "Space",
	93: "ContextMenu",
	45: "Insert",
	36: "Home",
	33: "PageUp",
	46: "Delete",
	35: "End",
	34: "PageDown",
	38: "Up",
	37: "Left",
	40: "Down",
	39: "Right",
	144: "NumLk",
	111: "/",
	106: "*",
	109: "-",
	107: "+",
	103: "7",
	104: "8",
	105: "9",
	100: "4",
	101: "5",
	102: "6",
	97: "1",
	98: "2",
	99: "3",
	96: "0",
	110: ".",
}

export const getKeyIndex = (key: number) => {
	if (fzone.includes(key)) {
		return { area: "fzone", index: fzone.findIndex((k) => k === key) }
	} else if (windows.includes(key)) {
		return { area: "windows", index: windows.findIndex((k) => k === key) }
	} else if (chars.includes(key)) {
		return { area: "chars", index: chars.findIndex((k) => k === key) }
	} else if (dir.includes(key)) {
		return { area: "dir", index: dir.findIndex((k) => k === key) }
	} else if (num.includes(key)) {
		return { area: "num", index: num.findIndex((k) => k === key) }
	}
}
