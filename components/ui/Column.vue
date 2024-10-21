<template>
	<div :class="computedColSpan">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
	colSpan: {
		type: String,
		required: true,
	},
});

const computedColSpan = computed(() => {
	return `col-span-1 md:col-span-${props.colSpan}`;
});
</script>
