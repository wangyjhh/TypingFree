<template>
    <div :style="style" font-size="1vw" w="3.8vw" h="3.8vw" bg="#444" position-relative flex items-center justify-center
        border-rd=".42vw" border="1px solid ##a7a9a7">
        <div ref="keyRef" w="3.4vw" h="3.4vw" p-1vw bg="#1a1a1a" position-absolute top="-0.45vw" color="#fff" flex
            items-center justify-center border-rd=".42vw" transition-all border-b="1px solid #a7a9a7">
            <slot></slot>
        </div>
        <div w="3.4vw" h="3.4vw" p-1vw bg="#222" flex items-center justify-center border-rd=".42vw"></div>
    </div>
</template>

<script lang='ts' setup>
import { ref, watch } from "vue"

const keyRef = ref<HTMLElement | null>(null)

const props = defineProps({
    keyState: Boolean,
    style: String
})

const keydownHandle = () => {
    keyRef.value!.style.top = "0.15vw"
    keyRef.value!.style.background = "#313131"
}

const keyupHandle = () => {
    keyRef.value!.style.top = "-0.45vw"
    keyRef.value!.style.background = "#1a1a1a"

}

watch(props, (newProps) => {
    if (newProps.keyState) {
        keydownHandle()
    } else {
        keyupHandle()
    }
})
</script>