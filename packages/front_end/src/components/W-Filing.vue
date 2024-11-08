<script lang="ts" setup>
import { ref } from 'vue'

const filingRef = ref<HTMLAnchorElement>()

const copy = () => {
    const textToCopy = filingRef.value!.innerText

    console.log(textToCopy)

    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            window.open('https://beian.miit.gov.cn/', '_blank')
        })
        .catch((error) => {
            console.error('复制失败', error)
        })
}
</script>

<template>
    <div w="100%" text-center font-size-0.8rem textColor>
        <p>© 2023 王玉杰 丨 备案号: <a ref="filingRef" textColor cursor-pointer @click="copy">皖ICP备2021014439号-2</a></p>
    </div>
</template>
