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
        default: '50%',
    },
})
</script>

<template>
    <div v-show="props.isVisible" fixed top-0 bottom-0 left-0 right-0 bg="#000/50" z-9999 mohu>
        <div
            v-if="props.isVisible" :style="`width: ${props.width}`" min-w-250px border-rd="8px" absolute top="50%" left=" 50%" centerXY
            max-w-800px bg="#1a1a1a" b-rd
        >
            <div v-if="title" p-20px bg="#1a1a1a" border-rd="8px">
                <h1 font-size-45px>
                    <b>{{ props.title }}</b>
                </h1>
            </div>
            <div p-20px>
                <slot />
            </div>
            <div p-20px>
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>
