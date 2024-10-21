<template>
	<button :id="id" :class="computedClasses" @click="onClick">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
	id: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "button",
	},
	variant: {
		type: String,
		default: "primary",
		validator: (value: string) =>
			["primary", "secondary", "danger"].includes(value),
	},
});

const emit = defineEmits(["click"]);

const computedClasses = computed(() => {
	let baseClasses = "px-4 py-2 rounded-md font-bold focus:outline-none";
	if (props.variant === "primary") {
		baseClasses += " bg-blue-500 text-white hover:bg-blue-600";
	} else if (props.variant === "secondary") {
		baseClasses += " bg-gray-500 text-white hover:bg-gray-600";
	} else if (props.variant === "danger") {
		baseClasses += " bg-red-500 text-white hover:bg-red-600";
	}
	return baseClasses;
});

const onClick = (event: Event) => {
	emit("click", event);
};
</script>
