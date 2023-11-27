import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("../views/Home.vue"),
		},
		{
			path: "/Typing",
			name: "Typing",
			component: () => import("../views/TypingV2.vue"),
		},
		{
			path: "/Keyboard",
			name: "Keyboard",
			component: () => import("../views/Keyboard.vue"),
		},
	],
})

export default router
