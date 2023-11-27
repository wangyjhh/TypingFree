<template>
    <input ref="fakeInputRef" type="password" autocomplete="off" autocorrect="off" autocapitalize="off" aria-hidden="true"
        style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px" @keyup.prevent="onKeyUp($event)"
        @keydown.prevent="onKeyDown($event)" @input="resetInputValue" />
    <div w="100%" h="100%" p-20px @click="inputFocus">
        <div w="100%" keyboard-ratio border="1px solid  #ddd" grid grid-keyboard>
            <div p-1vw bg-black border="1px solid  #ddd" flex key-gap items-center>
                <Key v-for="item in fzoneList" :key-state="item.keystate" :style="item.style">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw bg-black border="1px solid  #ddd" flex key-gap items-center>
                <Key v-for="item in windowsList" :key-state="item.keystate">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw bg-black border="1px solid  #ddd"></div>
            <div p-1vw bg-black border="1px solid #ddd" flex flex-wrap key-gap items-center>
                <Key v-for="item in charsList" :key-state="item.keystate">
                    <template v-if="Array.isArray(item.key_alias)">
                        <span v-for="it in item.key_alias">{{ it }}</span>
                    </template>
                    <template v-else>

                        <span>{{ item.key_alias }}</span>
                    </template>
                </Key>
            </div>
            <div p-1vw bg-black border="1px solid #ddd" grid grid-rows-5 grid-cols-3>
                <Key v-for="item in dirList" :key-state="item.keystate">
                    {{ item.key_alias }}
                </Key>
            </div>
            <div p-1vw bg-black border="1px solid #ddd" grid grid-rows-5 grid-cols-4>
                <Key v-for="item in numList" :key-state="item.keystate">
                    {{ item.key_alias }}
                </Key>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue"
import Key from '@/components/Key.vue'
import { getKeyIndex, KeyMap, fzone, windows, chars, dir, num } from '@/utils/keyHandle';

fzone.map((key) => {

    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style: 'margin-left:3.8vw'
    }

})


const fakeInputRef = ref()

const fzoneList = ref(fzone.map((key) => {
    let style = undefined
    if (key === 112) {
        style = 'margin-left:3.8vw'
    } else if (key === 116 || key === 120) {
        style = 'margin-left:2vw'
    }
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style
    }
}))

const windowsList = ref(windows.map((key) => {
    let style = undefined
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style
    }
}))

const charsList = ref(chars.map((key) => {
    let style = undefined
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style
    }
}))

const dirList = ref(dir.map((key) => {
    let style = undefined
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style
    }
}))

const numList = ref(num.map((key) => {
    let style = undefined
    return {
        key_alias: KeyMap[key],
        keyCode: key,
        keystate: false,
        style
    }
}))

const inputFocus = () => {
    fakeInputRef.value.focus()
}

onMounted(() => {
    inputFocus()
})



const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key, e.keyCode)
    let key = getKeyIndex(e.keyCode)
    console.log(key);

    if (key?.index === -1) return
    switch (key?.area) {
        case "fzone":
            fzoneList.value[key.index].keystate = true
            break;
        case "windows":
            windowsList.value[key.index].keystate = true
            break;
        case "chars":
            charsList.value[key.index].keystate = true
            break;
        case "dir":
            dirList.value[key.index].keystate = true
            break;
        case "num":
            numList.value[key.index].keystate = true
            break;
    }
    console.log(windowsList.value[2].keystate);

}

const onKeyUp = (e: KeyboardEvent) => {
    let key = getKeyIndex(e.keyCode)
    if (key?.index === -1) return
    switch (key?.area) {
        case "fzone":
            fzoneList.value[key.index].keystate = false
            break;
        case "windows":
            windowsList.value[key.index].keystate = false
            break;
        case "chars":
            charsList.value[key.index].keystate = false
            break;
        case "dir":
            dirList.value[key.index].keystate = false
            break;
        case "num":
            numList.value[key.index].keystate = false
            break;
    }
    console.log(windowsList.value[2].keystate);

}

const resetInputValue = () => {
    // 每次输入都清空输入框的value值，避免浏览器自动触发密码保存提示
    fakeInputRef.value.value = ""
}

</script>