<template>
	<p class="text-red-500 text-sm mb-2">
		{{ message }}
	</p>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	message: {
		type: String,
		required: false,
		default: "",
	},
});
</script>
