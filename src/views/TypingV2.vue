<template>
    <div w="100%" h="100%" p-20px>
        <input ref="fakeInputRef" id="fake-input" type="password" autocomplete="off" autocorrect="off" autocapitalize="off"
            aria-hidden="true" style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px"
            @keyup="onKeyUp($event)" @keydown="onKeyDown($event)" />
        <div position-fixed z-999 m-x="24px" m-y="12px" p-x="24px" p-y="12px" flex flex-row flex-justify-between>
            <!-- <button btn @click="toggleDark()">切换</button> -->
        </div>
        <div h-full bg="#1b1b1b" b-rd="24px" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start pt35 pb20 px10 gap5
            row-gap="30px" @click="inputFocus">
            <div h-full bg="#1b1b1b" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start gap10 row-gap="30px"
                overflow-y-auto class="type-container">
                <div ref="textRef" v-for="(item, index) in textData.textDetail" :key="index" flex flex-col flex-items-center
                    font-size-45px>
                    <div flex flex-row gap1>
                        <span v-for="(i, ind) in item.signs" :key="ind">
                            <span :class="i.d" font-100>
                                {{ i.s ? i.s : i.c }}
                            </span>
                        </span>
                    </div>
                    <span :class="item.d" font-900>{{ item.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import { generateTypeTemplate } from '../utils/index'

const fakeInputRef = ref()

onMounted(() => {
    inputFocus()
})

const inputFocus = () => {
    fakeInputRef.value.focus()
}

const text = ref(`这是一段示例文本，用于展示文本的基本格式和排版。这段文本包含了一些常见的文本元素，例如标题、段落、列表和引用。 
`)

const textData = ref(generateTypeTemplate(text.value))

const init = () => {
    textData.value.textDetail[0].signs[0].d = "ready"
    textData.value.textDetail[0].d = "tready"
}

init()

// 文本文字位置
let textPosition = 0
// 文本字母位置
let pinyinPosition = 0
// 退格次数
let backspaceCount = 0

/**
 * 处理当前输入位置的函数
 * type为next表示当前正在输入，prev表示当前正在退格
 */
const positionChange = (type: string) => {
    let oldValue = { textPosition, pinyinPosition }
    if (type === "next") {
        if (pinyinPosition + 1 == textData.value.textDetail[textPosition].signsLength) {
            textPosition++
            pinyinPosition = 0
        } else {
            pinyinPosition++
        }
    }
    if (type === "prev") {
        if (pinyinPosition == 0) {
            textPosition--
            pinyinPosition = textData.value.textDetail[textPosition].signsLength - 1
        } else {
            pinyinPosition--
        }
    }
    let newValue: Position = { textPosition, pinyinPosition }
    return {
        oldValue, newValue
    }
}

const stateChange = (oldValue: Position, newValue: Position, type: SignsState) => {
    /**
     * 处理字母状态
     */

    // 当前字母默认 | 当前字母输入正确 | 当前字母输入错误 | 当前字母修改
    textData.value.textDetail[oldValue.textPosition].signs[oldValue.pinyinPosition].d = type
    // 上一字母待输入 | 下一字母等待输入
    textData.value.textDetail[newValue.textPosition].signs[newValue.pinyinPosition].d = "ready"

    /**
     * 处理文字状态
     * oldValue.textPosition < newValue.textPosition 说明在输入
     * oldValue.textPosition > newValue.textPosition 说明在退格
     * */
    if (oldValue.textPosition < newValue.textPosition) {
        // 看下当前文字位置所输入的拼音是否有打错的
        let hasErr = textData.value.textDetail[oldValue.textPosition].signs.filter(sign => sign.d === "error")
        if (hasErr.length !== 0) {
            // 又打错的字母则文字状态为错误
            textData.value.textDetail[oldValue.textPosition].d = "error"
        } else {
            // 否则就为正确
            textData.value.textDetail[oldValue.textPosition].d = "success"
        }
        textData.value.textDetail[newValue.textPosition].d = "tready"
    } else if (oldValue.textPosition > newValue.textPosition) {
        textData.value.textDetail[oldValue.textPosition].d = "primary"
        textData.value.textDetail[newValue.textPosition].d = "tready"
    }
}

const onKeyUp = (e: KeyboardEvent) => {
    console.log(backspaceCount)
}

const onKeyDown = (e: KeyboardEvent) => {
    let targetKey = textData.value.textDetail[textPosition].signs[pinyinPosition].c
    if (e.key === targetKey) {
        const { oldValue, newValue } = positionChange("next")
        // 如果退格数大于零则表示本次输入为修改
        if (backspaceCount > 0) {
            stateChange(oldValue, newValue, "warning")
            // 修改完要减少退格数
            backspaceCount--
            return
        }
        stateChange(oldValue, newValue, "success")
        return
    } else if (e.key !== targetKey && e.key !== "Backspace") {
        const { oldValue, newValue } = positionChange("next")
        // 如果退格数大于零即使打错也要减少退格数
        if (backspaceCount > 0) {
            backspaceCount--
        }
        stateChange(oldValue, newValue, "error")
        return
    } else if (e.key === "Backspace" && textPosition + pinyinPosition !== 0) {
        const { oldValue, newValue } = positionChange("prev")
        stateChange(oldValue, newValue, "primary")
        // 记录退格次数
        backspaceCount++
        return
    }
}

</script>

<style scoped></style>