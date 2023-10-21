<template>
    <div w="100%" h="100%" p-20px>
        <input ref="fakeInputRef" id="fake-input" type="password" autocomplete="off" autocorrect="off" autocapitalize="off"
            aria-hidden="true" style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px;"
            @keyup="onKeyUp($event)" :value="inputValue">
        <div position-fixed z-999 m-x="24px" m-y="12px" p-x="24px" p-y="12px" flex flex-row flex-justify-between>
            <!-- <button btn @click="toggleDark()">切换</button> -->
        </div>
        <div h-full bg="#1b1b1b" b-rd="24px" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start pt35 pb20 px10 gap5
            row-gap="30px" @click="onClick">
            <div h-full bg="#1b1b1b" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start gap10 row-gap="30px"
                overflow-y-auto class="type-container">
                <div ref="textRef" v-for="item, index in textDate" :key="index" flex flex-col flex-items-center
                    font-size-45px>
                    <div flex flex-row gap1>
                        <span v-for="i, ind in item.signs" :key="ind">
                            <span font-100>
                                {{ i.s ? i.s : i.c }}
                            </span>
                        </span>
                    </div>
                    <span font-900>{{ item.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { toggleDark } from '@/composables/index';
import pinyin from 'pinyin';

const fakeInputRef = ref()

onMounted(() => {
    fakeInputRef.value.focus()
    textRef.value![0].children[0].children[0].className = "ready"
    textRef.value![0].children[1].className = "tready"
})

const onClick = () => {
    fakeInputRef.value.focus()
}

interface Char {
    c: string,
    s?: string
}

interface Text {
    text: string
    signs: Char[]
}

const text = ref('我是一段示例文字，你好。请问这个文章要怎么写。')
const textDate = ref<Text[]>([])

for (let char of text.value) {
    if (char === ' ')
        continue

    let pt = pinyin(char, { style: pinyin.STYLE_NORMAL }).join('')
    let py = pinyin(char).join('')
    let t: Char[] = []

    for (let i = 0; i < pt.length; i++) {

        let c = pt[i].replace('。', '.').replace('，', ',')
        let s = py[i]


        if (c !== s)
            t.push({ c, s })
        else
            t.push({ c })
    }
    textDate.value.push({ text: char, signs: t })
}

console.log(textDate.value);


const textRef = ref<HTMLDivElement[]>()

const inputValue = ref<string[]>([])

let textLength = 0
let pinyinLength = 0

const onKeyUp = (e: KeyboardEvent) => {
    let signsLength = textDate.value[textLength].signs.length
    let targetKey = textDate.value[textLength].signs[pinyinLength].c
    if (e.key === 'Backspace') {
        inputValue.value.pop()
        if (pinyinLength === 0) {
            textLength--
            pinyinLength = textDate.value[textLength].signs.length
            textRef.value![textLength].children[0].children[pinyinLength].className = "primary"
            textRef.value![textLength].children[0].children[pinyinLength].className = "ready"

        } else {
            textRef.value![textLength].children[0].children[pinyinLength].className = "primary"
            textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
            pinyinLength--
        }
        console.log(inputValue.value)
        return
    }
    if (e.key === targetKey) {
        if (pinyinLength === signsLength - 1) {
            textRef.value![textLength].children[0].children[pinyinLength].className = "success"
            textLength++
            pinyinLength = 0
            textRef.value![textLength].children[0].children[pinyinLength].className = "ready"

        } else {
            textRef.value![textLength].children[0].children[pinyinLength].className = "success"
            textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
            pinyinLength++
        }
    } else {
        if (pinyinLength === signsLength - 1) {
            textRef.value![textLength].children[0].children[pinyinLength].className = "error"
            textLength++
            pinyinLength = 0
            textRef.value![textLength].children[0].children[pinyinLength].className = "ready"

        } else {
            textRef.value![textLength].children[0].children[pinyinLength].className = "error"
            textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
            pinyinLength++
        }
    }

    inputValue.value.push(e.key)
    console.log(textLength, pinyinLength);

    console.log(inputValue.value)
}

</script>

<style  scoped></style>