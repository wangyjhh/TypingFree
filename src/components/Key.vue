<script lang='ts' setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    keyState: Boolean,
    style: String,
    isNull: Boolean,
    componentWidth: {
        type: Number,
        default: 3.8,
    },
    componentHeight: {
        type: Number,
        default: 3.8,
    },
})

const keyRef = ref<HTMLElement | null>(null)

const keyWidth = computed(() => {
    return props.componentWidth - 0.5
})
const keyHeight = computed(() => {
    return props.componentHeight - 0.5
})

const keydownHandle = () => {
    keyRef.value!.style.top = '0.15vw'
    keyRef.value!.style.background = '#313131'
}

const keyupHandle = () => {
    keyRef.value!.style.top = '-0.45vw'
    keyRef.value!.style.background = '#1a1a1a'
}

watch(props, (newProps) => {
    if (newProps.keyState) {
        keydownHandle()
    }
    else {
        keyupHandle()
    }
})
</script>

<template>
    <div v-if="isNull" :style="`width:${componentWidth}vw;height:${componentHeight}vw`" f />
    <div
        v-else :style="`${style};width:${componentWidth}vw;height:${componentHeight}vw`" bg="#444" position-relative flex
        items-center justify-center border-rd=".42vw" border="1px solid ##a7a9a7"
    >
        <div
            ref="keyRef" :style="`width:${keyWidth}vw;height:${keyHeight}vw`" p-1vw bg="#1a1a1a" position-absolute
            top="-0.45vw" color="#fff" flex items-center justify-center border-rd=".42vw" transition-all
            border-b="0.1vw solid #a7a9a7"
        >
            <slot />
        </div>
        <div
            :style="`width:${keyWidth}vw;height:${keyHeight}vw`" p-1vw bg="#222" flex items-center justify-center
            border-rd=".42vw"
        />
    </div>
</template>
