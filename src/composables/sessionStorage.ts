import type { Ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'

export const usText: Ref<string> = useSessionStorage('text', '')
