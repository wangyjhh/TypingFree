import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from "unocss"

export default defineConfig({
	rules: [
		[
			"primary",
			{
				color: "#d4d4d4d5",
			},
		],
		[
			"success",
			{
				background: "rgba(48, 178, 140, 0.2)",
				color: "#3aa675",
			},
		],
		[
			"error",
			{
				background: "rgba(229, 79, 74, 0.2)",
				color: "#e54f4a",
			},
		],
		[
			"warning",
			{
				background: "rgba(253, 194, 79, 0.2)",
				color: "#fdc24f",
			},
		],
		[
			"ready",
			{
				background: "rgba(249, 250, 252, 0.2)",
				color: "#f9fafc",
				"box-shadow": "#ff7008 0px -4px 0px inset",
			},
		],
		[
			"tready",
			{
				background: "rgba(249, 250, 252, 0.2)",
				color: "#f9fafc",
			},
		],
		[
			"centerX",
			{
				transform: "translate(-50%)",
			},
		],
		[
			"centerY",
			{
				transform: "translate(,-50%)",
			},
		],
		[
			"centerXY",
			{
				transform: "translate(-50%,-50%)",
			},
		],
		[
			"shadow",
			{
				"box-shadow": "0 2px 8px rgba(0, 0, 0, 0.2)",
			},
		],
		[
			"mohu",
			{
				"backdrop-filter": "blur(3px)",
			},
		],
		[
			"textColor",
			{
				color: "rgba(255, 255, 255, 0.65)",
			},
		],
		[
			"transition-all",
			{
				transition: "all 0.15s",
			},
		],
		[
			"keyboard-ratio",
			{
				"aspect-ratio": "800/250",
			},
		],
		[
			"grid-keyboard",
			{
				"grid-template-rows": "1fr 5fr",
				"grid-template-columns": "11fr 2fr 3.3fr",
			},
		],
		[
			"key-gap",
			{
				"row-gap": "0.3vw",
				"column-gap": "0.3vw",
			},
		],
	],
	shortcuts: [
		[
			"btn",
			"px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
		],
		[
			"icon-btn",
			"text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none",
		],
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
		presetWebFonts({
			fonts: {
				mono: "JetBrains Mono",
			},
		}),
	],
})
