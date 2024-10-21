<template>
	<div
		class="max-w-full mx-auto bg-white p-5 rounded-lg shadow-md border border-gray-300"
	>
		<h3 class="text-xl font-semibold mb-4">Add New Word</h3>
		<form @submit.prevent="handleAddWord">
			<FormField v-model="newWord" label="New Word:" id="new-word" />
			<ValidationMessage v-if="validationError" :message="validationError" />

			<BaseButton id="add-new-word" type="submit" variant="primary" class="mt-4"
				>Add Word</BaseButton
			>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import FormField from "@/components/ui/FormField.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { Word } from "~/types/word";
import ValidationMessage from "../forms/ValidationMessage.vue";

const store = useStore();
const newWord = ref("");
const validationError = ref("");

const handleAddWord = () => {
	const sanitizedWord = newWord.value.replace(/<[^>]*>?/gm, "").trim();

	if (!sanitizedWord) {
		validationError.value = "Word cannot be empty.";
		return;
	}
	if (sanitizedWord.length < 3) {
		validationError.value = "Word must be at least 3 characters long.";
		return;
	}
	if (sanitizedWord.length > 20) {
		validationError.value = "Word must be no more than 20 characters long.";
		return;
	}

	validationError.value = "";

	const newWordObject: Word = {
		id: "",
		text: sanitizedWord,
	};

	store.dispatch("words/addWord", newWordObject);
	newWord.value = "";
};
</script>
