<template>
    <div w="100%" h="100%" p-20px>
        <input ref="fakeInputRef" id="fake-input" type="password" autocomplete="off" autocorrect="off" autocapitalize="off"
            aria-hidden="true" style="outline: none; position: fixed; font-size: 1px; left: 50%; top: -200px"
            @keyup="onKeyUp($event)" @keydown="onKeyDown($event)" :value="inputValue" />
        <div position-fixed z-999 m-x="24px" m-y="12px" p-x="24px" p-y="12px" flex flex-row flex-justify-between>
            <!-- <button btn @click="toggleDark()">切换</button> -->
        </div>
        <div h-full bg="#1b1b1b" b-rd="24px" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start pt35 pb20 px10 gap5
            row-gap="30px" @click="onClick">
            <div h-full bg="#1b1b1b" mb="12px" flex="~ 1 1 0%" flex-wrap flex-justify-start gap10 row-gap="30px"
                overflow-y-auto class="type-container">
                <div ref="textRef" v-for="(item, index) in textData.textDetail" :key="index" flex flex-col flex-items-center
                    font-size-45px>
                    <div flex flex-row gap1>
                        <span v-for="(i, ind) in item.signs" :key="ind">
                            <span font-100>
                                {{ i.s ? i.s : i.c }}
                            </span>
                        </span>
                    </div>
                    <span font-900>{{ item.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { generateTypeTemplate } from '../utils/index';

const fakeInputRef = ref()

onMounted(() => {
    fakeInputRef.value.focus()
    textRef.value![0].children[0].children[0].className = "ready"
    textRef.value![0].children[1].className = "tready"
})

const onClick = () => {
    fakeInputRef.value.focus()
}

const text = ref(`这是一段示例文本，用于展示文本的基本格式和排版。这段文本包含了一些常见的文本元素，例如标题、段落、列表和引用。  
  
一、标题  
  
这是一个标题，用于概括文本的主要内容。标题应该简明扼要地表达文本的主题或核心信息。  
  
二、段落  
  
段落是文本的基本组成单元，用于表达一个完整的思想或观点。每个段落应该有一个主题句，概括该段落的中心思想。  
  
三、列表  
  
列表是一种组织文本的方法，用于列举一系列相关的项目或要点。列表应该按照重要性的顺序进行排列，并使用适当的标记来表示每个项目的类型。  
  
四、引用  
  
引用是一种引用外部来源的方式，用于支持文本中的观点或提供额外的信息。引用应该清晰地表明引用的来源，并使用适当的引号或括号来标记引用的内容。
`)

const textData = ref(generateTypeTemplate(text.value))


const textRef = ref<HTMLDivElement[]>()

const inputValue = ref<string[]>([])

const backCount = ref(0)

let textLength = 0
let pinyinLength = 0

const onKeyDown = (e: KeyboardEvent) => {
    let signsLength = textData.value.textDetail[textLength].signs.length
    let targetKey = textData.value.textDetail[textLength].signs[pinyinLength].c
    if (e.key === "Backspace") {
        if (inputValue.value.length === 0) return
        inputValue.value.pop()
        if (pinyinLength === 0) {
            textRef.value![textLength].children[0].children[pinyinLength].className = "primary"
            textLength--
            pinyinLength = textData.value.textDetail[textLength].signs.length - 1
            textRef.value![textLength].children[0].children[pinyinLength].className = "ready"
        } else {
            textRef.value![textLength].children[0].children[pinyinLength].className = "primary"
            textRef.value![textLength].children[0].children[pinyinLength - 1].className = "ready"
            pinyinLength--
        }
        backCount.value++
        return
    }
    if (e.key === targetKey) {
        if (backCount.value != 0) {
            if (inputValue.value.length === textData.value.totalSigns - 1) {
                textRef.value![textLength].children[0].children[pinyinLength].className = "warning"
            } else {
                if (pinyinLength === signsLength - 1) {
                    textRef.value![textLength].children[0].children[pinyinLength].className = "warning"
                    textLength++
                    pinyinLength = 0
                    textRef.value![textLength].children[0].children[pinyinLength].className = "ready"
                } else {
                    textRef.value![textLength].children[0].children[pinyinLength].className = "warning"
                    textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
                    pinyinLength++
                }
            }
            if (backCount.value !== 0) {
                backCount.value--
            }
        } else {
            if (inputValue.value.length === textData.value.totalSigns - 1) {
                textRef.value![textLength].children[0].children[pinyinLength].className = "success"
            } else {
                if (pinyinLength === signsLength - 1) {
                    textRef.value![textLength].children[0].children[pinyinLength].className = "success"
                    textLength++
                    pinyinLength = 0
                    textRef.value![textLength].children[0].children[pinyinLength].className = "ready"
                } else {
                    textRef.value![textLength].children[0].children[pinyinLength].className = "success"
                    textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
                    pinyinLength++
                }
            }
        }
    } else {
        if (inputValue.value.length === textData.value.totalSigns - 1) {
            textRef.value![textLength].children[0].children[pinyinLength].className = "error"
        } else {
            if (pinyinLength === signsLength - 1) {
                textRef.value![textLength].children[0].children[pinyinLength].className = "error"
                textLength++
                pinyinLength = 0
                textRef.value![textLength].children[0].children[pinyinLength].className = "ready"
            } else {
                textRef.value![textLength].children[0].children[pinyinLength].className = "error"
                textRef.value![textLength].children[0].children[pinyinLength + 1].className = "ready"
                pinyinLength++
            }
        }
    }

    inputValue.value.push(e.key)
}

const onKeyUp = (e: KeyboardEvent) => {
    if (inputValue.value.length === textData.value.totalSigns) {
        alert("结束")
    }
}
</script>

<style scoped></style>
