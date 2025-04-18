<script lang='ts' setup>
import Key from '@/components/Key.vue'
import router from '@/router/index'
import { chars, dir, fzone, getKeyIndex, KeyMap, num, windows } from '@/utils/keyHandle'
import { onMounted, ref } from 'vue'

const reset = () => {
    location.reload()
}

const fakeInputRef = ref()

const fzoneList = ref(fzone.map((key) => {
    let style
    if (key === 112) {
        style = 'margin-left:3.8vw'
    }
    else if (key === 116 || key === 120) {
        style = 'margin-left:2.5vw'
    }
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style,
    }
}))

const windowsList = ref(windows.map((key) => {
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
    }
}))

const charsList = ref(chars.map((key) => {
    let width
    if (key === 8) {
        width = 8.49
    }
    else if (key === 9 || key === 220) {
        width = 6.14
    }
    else if (key === 20) {
        width = 8.08
    }
    else if (key === 13) {
        width = 8.3
    }
    else if (key === 16) {
        width = 10.24
    }
    else if (key === 17 || key === 18 || key === 91 || key === 92 || key === 93) {
        width = 5.14
    }
    else if (key === 32) {
        width = 23.65
    }
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        width,
    }
}))

const dirList = ref(dir.map((key) => {
    if (key === null) {
        return {
            isNull: true,
        }
    }
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
    }
}))

const numList = ref(num.map((key) => {
    let style
    let width
    let height
    if (key === 107) {
        height = 8
        style = 'grid-row: span 2/span 2;'
    }
    else if (key === 13) {
        height = 8
        style = 'grid-row: span 2/span 2;'
    }
    else if (key === 96) {
        width = 8
        style = 'grid-column: span 2/span 2;'
    }
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        width,
        height,
        style,
    }
}))

const inputFocus = () => {
    fakeInputRef.value.focus()
}

onMounted(() => {
    inputFocus()
})

const onKeyDown = (e: KeyboardEvent) => {
    const key = getKeyIndex(e.keyCode)
    if (key?.index === -1)
        return
    switch (key?.area) {
        case 'fzone':
            fzoneList.value[key.index].keystate = true
            break
        case 'windows':
            windowsList.value[key.index].keystate = true
            break
        case 'chars':
            charsList.value[key.index].keystate = true
            break
        case 'dir':
            dirList.value[key.index].keystate = true
            break
        case 'num':
            numList.value[key.index].keystate = true
            break
    }
}

const onKeyUp = (e: KeyboardEvent) => {
    const key = getKeyIndex(e.keyCode)
    if (key?.index === -1)
        return
    switch (key?.area) {
        case 'fzone':
            fzoneList.value[key.index].keystate = false
            break
        case 'windows':
            windowsList.value[key.index].keystate = false
            break
        case 'chars':
            charsList.value[key.index].keystate = false
            break
        case 'dir':
            dirList.value[key.index].keystate = false
            break
        case 'num':
            numList.value[key.index].keystate = false
            break
    }
}

const resetInputValue = () => {
    // 每次输入都清空输入框的value值，避免浏览器自动触发密码保存提示
    fakeInputRef.value.value = ''
}
</script>

<template>
    <input
        ref="fakeInputRef" type="password" autocomplete="off" autocorrect="off" autocapitalize="off"
        aria-hidden="true" style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px"
        @keyup.prevent="onKeyUp($event)" @keydown.prevent="onKeyDown($event)" @input="resetInputValue"
    >
    <div w="100%" h="100%" p-5 @click="inputFocus">
        <div>
            <button btn m-b m-r-20px @click="router.back()">
                返回
            </button>
            <button btn m-r-20px @click="reset">
                刷新
            </button>
        </div>
        <div w="100%" font-size="0.7vw" bg-gray b-rd-2 keyboard-ratio grid grid-keyboard>
            <div p-1vw p-t-2vw p-l-2vw flex key-gap items-center>
                <Key v-for="item in fzoneList" :key="item.keyCode" :key-state="item.keystate" :style="item.style">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw p-t-2vw flex key-gap items-center>
                <Key v-for="item in windowsList" :key="item.keyCode" :key-state="item.keystate">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw p-t-2vw />
            <div p-1vw p-b-2vw p-l-2vw flex flex-wrap key-gap items-center flex-content-center>
                <Key v-for="item in charsList" :key="item.keyCode" :key-state="item.keystate" :component-width="item.width">
                    <template v-if="Array.isArray(item.key_alias)">
                        <span v-for="it in item.key_alias" :key="it">{{ it }}</span>
                    </template>
                    <template v-else>
                        <span>{{ item.key_alias }}</span>
                    </template>
                </Key>
            </div>
            <div p-1vw p-b-2vw grid key-gap grid-cols-3 grid-content-center>
                <Key v-for="item in dirList" :key="item.keyCode" :key-state="item.keystate" :is-null="item.isNull">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw p-b-2vw p-r-2vw grid key-gap grid-cols-4>
                <Key
                    v-for="item in numList" :key="item.keyCode" :key-state="item.keystate"
                    :component-width="item.width" :component-height="item.height" :style="item.style"
                    grid-content-center
                >
                    {{ item.key_alias }}
                </Key>
            </div>
        </div>
    </div>
</template>
