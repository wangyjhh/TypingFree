<template>
    <input ref="fakeInputRef" type="password" autocomplete="off" autocorrect="off" autocapitalize="off" aria-hidden="true"
        style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px" @keyup.prevent="onKeyUp($event)"
        @keydown.prevent="onKeyDown($event)" @input="resetInputValue" />
    <div w="100%" h="100%" p-20px @click="inputFocus">
        <div w="100%" keyboard-ratio border="1px solid  #ddd" grid grid-keyboard>
            <div p-1vw bg-black border="1px solid  #ddd" flex key-gap items-center>
                <Key v-for="item in keystateList" :key-state="item.keystate" :style="item.style">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div bg-black border="1px solid  #ddd">2</div>
            <div bg-black border="1px solid  #ddd">3</div>
            <div bg-black border="1px solid #ddd">4</div>
            <div bg-black border="1px solid #ddd">5</div>
            <div bg-black border="1px solid #ddd">6</div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue"
import Key from '@/components/Key.vue'

const fakeInputRef = ref()
const keystateList = ref([
    { key_alias: 'ESC', key: 'Escape', keystate: false },
    { key_alias: 'F1', key: 'F1', keystate: false, style: 'margin-left:3.8vw' },
    { key_alias: 'F2', key: 'F2', keystate: false },
    { key_alias: 'F3', key: 'F3', keystate: false },
    { key_alias: 'F4', key: 'F4', keystate: false },
    { key_alias: 'F5', key: 'F5', keystate: false, style: 'margin-left:2vw' },
    { key_alias: 'F6', key: 'F6', keystate: false },
    { key_alias: 'F7', key: 'F7', keystate: false },
    { key_alias: 'F8', key: 'F8', keystate: false },
    { key_alias: 'F9', key: 'F9', keystate: false, style: 'margin-left:2vw' },
    { key_alias: 'F10', key: 'F10', keystate: false },
    { key_alias: 'F11', key: 'F11', keystate: false },
    { key_alias: 'F12', key: 'F12', keystate: false },
])

const inputFocus = () => {
    fakeInputRef.value.focus()
}

onMounted(() => {
    inputFocus()
})

const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key)

    let index = keystateList.value.findIndex(item => item.key === e.key)
    if (index === -1) return

    keystateList.value[index].keystate = true
}

const onKeyUp = (e: KeyboardEvent) => {
    let index = keystateList.value.findIndex(item => item.key === e.key)
    if (index === -1) return
    keystateList.value[index].keystate = false
}

const resetInputValue = () => {
    // 每次输入都清空输入框的value值，避免浏览器自动触发密码保存提示
    fakeInputRef.value.value = ""
}

</script>