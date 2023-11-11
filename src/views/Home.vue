<template>
    <div w="100%" h="100%" p-20px flex flex-col justify-center flex-items-center>
        <div w="100%" text-center font-size-60px m-b="100px" flex flex-items-baseline justify-center>
            <div>{{ str }}</div>
            <div w-15px h-22px border-white :class="isShow ? `border-b-5px` : ``"></div>
        </div>
        <div>
            <button btn m-r-50px @click="router.push('/Typing')">开始练习</button>
            <button btn @click="dialogDisplay = true">自定义练习</button>
        </div>
    </div>
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
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import router from '@/router/index'
import Dialog from '@/components/Dialog.vue'
import { usText } from '@/composables/index';

const isShow = ref(false)

onMounted(() => {
    setInterval(() => {
        isShow.value = !isShow.value
    }, 500)
    autoPrint()
})

const title = 'Nice Typing'
let str = ref("")

const autoPrint = () => {
    let index = 0
    setInterval(() => {
        str.value += title.substring(index, index + 1)
        index++
    }, 150)
}

usText.value = ""

const dialogDisplay = ref(false)

const text = ref("")

const start = () => {
    usText.value = text.value
    router.push('/Typing')
}

const closeDialog = () => {
    usText.value = ""
    dialogDisplay.value = false
    text.value = ""
}

</script>
