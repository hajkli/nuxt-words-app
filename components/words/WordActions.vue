<template>
	<div
		class="p-5 bg-white rounded-lg shadow-md border-b border-gray-300 flex flex-col md:flex-row md:justify-between md:items-center"
	>
		<h2
			class="text-2xl font-semibold text-gray-800 w-full md:w-auto mb-4 md:mb-0"
		>
			Words Dashboard
		</h2>

		<div class="actions flex space-x-4">
			<BaseButton @click="toggleDragging" variant="primary">
				{{ isDraggingEnabled ? "Disable Dragging" : "Enable Dragging" }}
			</BaseButton>
			<BaseButton @click="showResetWordsConfirmation" variant="danger">
				Restore Default State
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import BaseButton from "../ui/BaseButton.vue";

const store = useStore();

const showResetWordsConfirmation = () => {
	store.dispatch("modal/showModal", {
		title: "Delete All Words",
		message:
			"Are you sure you want to delete all words and restore default state from server? This action cannot be undone.",
		callback: () => store.dispatch("words/resetWords"),
	});
};

const isDraggingEnabled = computed(() => store.getters["words/isDragable"]);

const toggleDragging = () => {
	store.dispatch("words/setDragable", !isDraggingEnabled.value);
};
</script>
