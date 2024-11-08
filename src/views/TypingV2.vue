<script lang='ts' setup>
import Dialog from '@/components/Dialog.vue'
import { usText } from '@/composables/index'
import router from '@/router/index'
import { nextTick, onMounted, ref, watch } from 'vue'

const fakeInputRef = ref()

const typeContainerRef = ref<HTMLDivElement>()

const reset = () => {
    closeDialog()
    location.reload()
}

const back = () => {
    usText.value = ''
    router.back()
}

onMounted(() => {
    inputFocus()
})

const inputFocus = () => {
    fakeInputRef.value.focus()
}

const textData = ref<TextData>(JSON.parse(usText.value))

// 文本文字位置
let textPosition = 0
// 文本字母位置
let pinyinPosition = 0
// 退格次数
let backspaceCount = 0
// 输入次数
let inputCount = 0
// 进度
let schedule = '0%'
// 准确率
let accuracy = '0%'
// 打字开始时间
let startTime: number
// 打字结束时间
let endTime: number
// 按键速度
let keySpeed = '0'
// 打字速度
let typingSpeed = '0'
// 正确的字数
let correctCount = 0
// 错误的字数
let errorCount = 0
// 退格的字数
let backCount = 0

const init = () => {
    textData.value.textDetail[0].signs[0].d = 'ready'
    textData.value.textDetail[0].d = 'tready'
}

init()

/**
 * 处理当前输入位置的函数
 * type为next表示当前正在输入，prev表示当前正在退格
 */
const positionChange = (type: string) => {
    const oldValue = { textPosition, pinyinPosition }
    if (type === 'next') {
        if (pinyinPosition + 1 == textData.value.textDetail[textPosition].signsLength) {
            textPosition++
            pinyinPosition = 0
        }
        else {
            pinyinPosition++
        }
    }
    if (type === 'prev') {
        if (pinyinPosition == 0) {
            textPosition--
            pinyinPosition = textData.value.textDetail[textPosition].signsLength - 1
        }
        else {
            pinyinPosition--
        }
    }
    const newValue: Position = { textPosition, pinyinPosition }
    return {
        oldValue,
        newValue,
    }
}

const stateChange = (oldValue: Position, newValue: Position, type: SignsState) => {
    /**
     * 如果textData.value.textDetail[newValue.textPosition]为undefined，则表示结束
     * 没有下一个文字和字母了，就只更新旧文字字母状态即可
     */
    if (!textData.value.textDetail[newValue.textPosition]) {
        const oldSigns = textData.value.textDetail[oldValue.textPosition].signs
        const hasErr = oldSigns.filter(sign => sign.d === 'error')
        if (hasErr.length !== 0 || type === 'error') {
            // 有打错的字母,或最后一个字母打错则文字状态为错误
            textData.value.textDetail[oldValue.textPosition].d = 'error'
        }
        else {
            // 否则就为正确
            textData.value.textDetail[oldValue.textPosition].d = 'success'
        }
        textData.value.textDetail[oldValue.textPosition].signs[oldValue.pinyinPosition].d = type
        return
    }

    /**
     * 处理字母状态
     */

    // 当前字母默认 | 当前字母输入正确 | 当前字母输入错误 | 当前字母修改
    textData.value.textDetail[oldValue.textPosition].signs[oldValue.pinyinPosition].d = type
    // 上一字母待输入 | 下一字母等待输入
    textData.value.textDetail[newValue.textPosition].signs[newValue.pinyinPosition].d = 'ready'

    /**
     * 处理文字状态
     * oldValue.textPosition < newValue.textPosition 说明在输入
     * oldValue.textPosition > newValue.textPosition 说明在退格
     */
    if (oldValue.textPosition < newValue.textPosition) {
        // 看下当前文字位置所输入的拼音是否有打错的
        const hasErr = textData.value.textDetail[oldValue.textPosition].signs.filter(sign => sign.d === 'error')
        if (hasErr.length !== 0) {
            // 又打错的字母则文字状态为错误
            textData.value.textDetail[oldValue.textPosition].d = 'error'
        }
        else {
            // 否则就为正确
            textData.value.textDetail[oldValue.textPosition].d = 'success'
        }
        textData.value.textDetail[newValue.textPosition].d = 'tready'
    }
    else if (oldValue.textPosition > newValue.textPosition) {
        textData.value.textDetail[oldValue.textPosition].d = 'primary'
        textData.value.textDetail[newValue.textPosition].d = 'tready'
    }
}

// 滚动条自动滚动
const scrollChange = () => {
    nextTick(() => {
        if (textPosition >= textData.value.textDetail.length) {
            typeContainerRef.value!.children[textPosition - 1].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
        else {
            typeContainerRef.value!.children[textPosition].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    })
}

// 更新打字练习相关的数据
const updateTypeInfo = () => {
    const float = Number.parseInt((((inputCount + 1) / textData.value.totalSigns) * 100).toFixed(2))
    schedule = `${float}%`
    let rightCount = 0
    for (let i = 0; i < textPosition; i++) {
        if (textData.value.textDetail[i].d == 'success') {
            rightCount++
        }
    }
    accuracy = `${rightCount == 0 ? 0 : Number.parseInt((((rightCount) / textPosition) * 100).toFixed(2))
    }% `
    const currentTime = Date.now()
    if (!startTime)
        startTime = currentTime
    const timeDiff = currentTime - startTime
    if (timeDiff === 0)
        return
    keySpeed = (inputCount / timeDiff * 60000).toFixed()
    typingSpeed = (textPosition / timeDiff * 60000).toFixed()
}

const endDialogDisplay = ref(false)

const closeDialog = () => {
    endDialogDisplay.value = false
}

// 结束判断
const end = () => {
    if (textPosition == textData.value.textDetail.length) {
        endTime = Date.now()
        const timeDiff = endTime - startTime
        keySpeed = (inputCount / timeDiff * 60000).toFixed()
        typingSpeed = (textPosition / timeDiff * 60000).toFixed()
        textData.value.textDetail.forEach((it) => {
            if (it.d == 'success') {
                correctCount++
            }
            if (it.d == 'error') {
                errorCount++
            }
        })
        endDialogDisplay.value = true
    }
}

// 按键抬起事件
const onKeyUp = (e: KeyboardEvent) => {
    if (!textData.value.textDetail[textPosition]) {
        return
    }
    scrollChange()
}

// 按键按下事件
const onKeyDown = (e: KeyboardEvent) => {
    if (!textData.value.textDetail[textPosition]) {
        return
    }
    scrollChange()
    const targetKey = textData.value.textDetail[textPosition].signs[pinyinPosition].c

    if (e.key === 'Shift' || e.key === 'Tab') {
        return
    }
    if (e.key === targetKey) {
        inputCount++
        const { oldValue, newValue } = positionChange('next')
        // 如果退格数大于零则表示本次输入为修改
        if (backspaceCount > 0) {
            stateChange(oldValue, newValue, 'warning')
            // 修改完要减少退格数
            backspaceCount--
            return
        }
        stateChange(oldValue, newValue, 'success')
    }
    else if (e.key !== targetKey && e.key !== 'Backspace') {
        inputCount++
        const { oldValue, newValue } = positionChange('next')
        // 如果退格数大于零即使打错也要减少退格数
        if (backspaceCount > 0) {
            backspaceCount--
        }
        stateChange(oldValue, newValue, 'error')
    }
    else if (e.key === 'Backspace' && textPosition + pinyinPosition !== 0) {
        inputCount--
        const { oldValue, newValue } = positionChange('prev')
        stateChange(oldValue, newValue, 'primary')
        // 记录退格次数
        backspaceCount++
        backCount++
    }
}

// 输入框输入事件
const resetInputValue = () => {
    // 每次输入都清空输入框的value值，避免浏览器自动触发密码保存提示
    fakeInputRef.value.value = ''
}

watch(textData.value, () => {
    updateTypeInfo()
    end()
})
</script>

<template>
    <div w="100%" h="100%" p-20px>
        <input
            id="fake-input" ref="fakeInputRef" type="password" autocomplete="off" autocorrect="off" autocapitalize="off"
            aria-hidden="true" style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px"
            @keyup="onKeyUp($event)" @keydown="onKeyDown($event)" @input="resetInputValue"
        >
        <div
            h-full bg="#1b1b1b" b-rd="24px" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start pt35 pb25 px10 gap5
            row-gap="30px" @click="inputFocus"
        >
            <div absolute top="5%" left="50%" centerX>
                <button btn m-r-20px @click="reset">
                    重打
                </button>
                <button btn @click="back">
                    返回
                </button>
            </div>
            <div
                ref="typeContainerRef" h-full bg="#1b1b1b" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start gap10
                row-gap="30px" overflow-y-auto class="type-container"
            >
                <div
                    v-for="(item, index) in textData.textDetail" ref="textRef" :key="index" flex flex-col flex-items-center
                    justify-center font-size-45px
                >
                    <div v-if="item.text !== '①'" flex flex-row gap1>
                        <span v-for="(i, ind) in item.signs" :key="ind">
                            <span :class="i.d" font-100>
                                {{ i.s ? i.s : i.c }}
                            </span>
                        </span>
                    </div>
                    <div v-else flex flex-row gap1>
                        <img :class="item.signs[0].d" src="../assets/space.svg">
                    </div>
                    <span :class="item.d" font-900>{{ item.text === "①" ? " " : item.text }}</span>
                </div>
            </div>
            <div absolute bottom="5%" left="50%" centerX>
                <span m="0 3">准确率 <b font-size-20px>{{ accuracy }}</b></span>
                <span m="0 3">按键速度 <b font-size-20px>{{ keySpeed }}键/分钟</b></span>
                <span m="0 3">打字速度 <b font-size-20px>{{ typingSpeed }}字/分钟</b></span>
                <span m="0 3">进度 <b font-size-20px>{{ schedule }}</b></span>
            </div>
        </div>
    </div>
    <Dialog :is-visible="endDialogDisplay" title="成绩" width="15%">
        <div m="0 3">
            准确率 <b>{{ accuracy }}</b>
        </div>
        <div m="0 3">
            按键速度 <b>{{ keySpeed }}键/分钟</b>
        </div>
        <div m="0 3">
            打字速度 <b>{{ typingSpeed }}字/分钟</b>
        </div>
        <div m="0 3">
            总用时 <b>{{ ((endTime - startTime) / 1000).toFixed(2) }}秒</b>
        </div>
        <div m="0 3">
            正确字数 <b>{{ correctCount }}字</b>
        </div>
        <div m="0 3">
            错误字数 <b>{{ errorCount }}字</b>
        </div>
        <div m="0 3">
            退格 <b>{{ backCount }}次</b>
        </div>
        <template #footer>
            <div flex justify-between>
                <button btn @click="reset">
                    再来一次
                </button>
                <button btn @click="closeDialog">
                    关闭
                </button>
            </div>
        </template>
    </Dialog>
</template>
