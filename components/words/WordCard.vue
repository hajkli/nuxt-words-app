<template>
	<div
		:class="[
			'word-card',
			{ 'drag-over': isDraggedOver },
			'flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4',
		]"
	>
		<p class="text-lg font-medium">{{ word.text }}</p>
		<button
			v-if="!isDraggingEnabled"
			@click="showDeleteConfirmation"
			class="ml-4"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-red-500 hover:text-red-700"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<div v-else class="ml-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-6 w-6 text-gray-500"
			>
				<path
					d="M4 10h4v2H4v-2zm6 0h4v2h-4v-2zm6 0h4v2h-4v-2zm0 4h4v2h-4v-2zm-6 0h4v2h-4v-2zm-6 0h4v2H4v-2zm0-8h4v2H4V6zm6 0h4v2h-4V6zm6 0h4v2h-4V6zm0 12h4v2h-4v-2zm-6 0h4v2h-4v-2zm-6 0h4v2H4v-2z"
				/>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, computed } from "vue";
import { useStore } from "vuex";
import { Word } from "~/types/word";

const props = defineProps({
	word: {
		type: Object as PropType<Word>,
		required: true,
	},
	isDraggedOver: Boolean,
});

const emit = defineEmits(["removeWord"]);

const store = useStore();
const isDraggingEnabled = computed(() => store.getters["words/isDragable"]);

const showDeleteConfirmation = () => {
	store.dispatch("modal/showModal", {
		title: "Delete Word",
		message: "Are you sure you want to delete this word?",
		callback: () => emit("removeWord", props.word.id),
	});
};
</script>

<style scoped>
.word-card {
	transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.word-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.word-card:active {
	transform: none;
	@apply shadow-sm mb-4;
}
.drag-over {
	@apply border-2 border-dashed border-blue-500 bg-blue-100;
}
</style>
