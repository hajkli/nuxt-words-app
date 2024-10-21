<template>
	<div class="mb-4">
		<label :for="id" class="block text-sm font-medium text-gray-700">{{
			label
		}}</label>
		<input
			:type="type"
			:id="id"
			:value="modelValue"
			@input="handleInput"
			class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			:disabled="disabled"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
	label: String,
	id: String,
	type: { type: String, default: "text" },
	modelValue: String,
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
	emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
