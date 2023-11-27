<template>
    <div w="100%" h="100%" p-20px flex flex-col justify-center flex-items-center>
        <div position-absolute top-5 left-5>
            <button btn @click="router.push('/Keyboard')">键盘测试</button>
        </div>
        <div w="60%" border-rd="10px" text-center font-size-60px m-b="100px" flex flex-items-baseline justify-center
            bg="#1b1b1b" p-50px>
            <div id="typing"></div>
        </div>
        <div>
            <button btn m-r-50px @click="defaultStart">开始练习</button>
            <button btn @click="dialogDisplay = true">自定义练习</button>
        </div>
    </div>
    <WFiling position-absolute left="50%" bottom="1rem" centerX></WFiling>
    <Dialog :is-visible="dialogDisplay">
        <div box-border>
            <textarea v-model="text" w="100%" box-border placeholder="请输入自定义练习模板" bg-dark resize-none overflow-y-auto
                rows="10"></textarea>
        </div>
        <template v-slot:footer>
            <div flex justify-between>
                <button btn @click="start">开始</button>
                <button btn @click="closeDialog">关闭</button>
            </div>
        </template>
    </Dialog>
    <span></span>
</template>


<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import router from '@/router/index'
import WFiling from '@/components/W-Filing.vue';
import Dialog from '@/components/Dialog.vue'
import { usText } from '@/composables/index'
import TypeIt from "typeit";
import { getDefault, getCustom } from '@/api/index';

let cursor = ref(`
<span style="margin-left:8px;background:rgba(249, 250, 252, 0.2);color:#f9faf;box-shadow:#ff7008 0px -4px 0px inset">|</span>`)

onMounted(() => {
    // @ts-ignore
    new TypeIt("#typing", {
        startDelay: 1000,
        deleteSpeed: 100,
        loop: true,
        loopDelay: 2000,
        cursorChar: cursor.value
    })
        .type(`<span style="background: rgba(48, 178, 140, 0.2);color:#3aa675;">Typing </span>`)
        .type(`<span style="background: rgba(229, 79, 74, 0.2);color:#e54f4a;">Bound</span>`)
        .pause(1000)
        .delete(5, { delay: 350 })
        .type(`<span style="background: rgba(253, 194, 79, 0.2);color:#fdc24f;">Free</span>`)
        .pause(2000)
        .delete(11, { delay: 350 })
        .type(`Typing Free`)
        .pause(5000)
        .go()
})

const dialogDisplay = ref(false)

const text = ref("")

const defaultStart = async () => {
    const data = await getDefault()
    usText.value = JSON.stringify(data)
    router.push('/Typing')
}

const start = async () => {
    const data = await getCustom(text.value)
    usText.value = JSON.stringify(data)
    router.push('/Typing')
}

const closeDialog = () => {
    usText.value = ""
    dialogDisplay.value = false
    text.value = ""
}

</script>
