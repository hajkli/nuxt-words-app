<template>
	<div
		v-if="modalState.isVisible"
		class="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
	>
		<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
			<h2 class="text-xl font-semibold mb-4">{{ modalState.title }}</h2>
			<p class="mb-6">{{ modalState.message }}</p>
			<div class="flex justify-end space-x-4">
				<BaseButton
					id="confirmation-modal-cancel"
					@click="onCancel"
					variant="secondary"
					>Cancel</BaseButton
				>
				<BaseButton
					id="confirmation-modal-confirm"
					@click="onConfirm"
					variant="danger"
					>Confirm</BaseButton
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import BaseButton from "./BaseButton.vue";

const store = useStore();
const modalState = store.getters["modal/modalState"];

const onCancel = () => {
	store.dispatch("modal/hideModal");
};

const onConfirm = () => {
	if (modalState.callback) {
		modalState.callback();
	}
	store.dispatch("modal/hideModal");
};
</script>
