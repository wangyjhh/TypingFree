<template>
    <div v-show="isVisible" fixed top-0 bottom-0 left-0 right-0 bg="#000/50" z-9999 mohu>
        <div v-if="isVisible" :style="`width: ${width}`" min-w-210px border-rd="8px" absolute top="50%" left=" 50%" centerXY
            max-w-800px bg="#1a1a1a" b-rd>
            <div v-if="title" p-20px bg="#1a1a1a" border-rd="8px">
                <h1 font-size-45px><b>{{ title }}</b></h1>
            </div>
            <div p-20px>
                <slot></slot>
            </div>
            <div p-20px>
                <div flex justify-between>
                    <button btn @click="confirmDialog">再来一次</button>
                    <button btn @click="closeDialog">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    width: {
        type: String,
        default: "50%"
    }
})

const emits = defineEmits<{
    (e: 'confirm'): void
    (e: 'close'): void
}>()

const confirmDialog = () => {
    emits('confirm')
}

const closeDialog = () => {
    emits('close')
}

</script>