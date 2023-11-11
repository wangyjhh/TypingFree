import { useSessionStorage } from "@vueuse/core"
import type { Ref } from "vue"
export const usText: Ref<string> = useSessionStorage("text", "")
