<template>
	<div class="container mx-auto bg-gray-50 shadow-md p-5">
		<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
			<Column colSpan="3">
				<WordsActions />
			</Column>
			<Column colSpan="1">
				<AddWord />
			</Column>

			<Column colSpan="2">
				<div v-if="words.length === 0" class="word-list-container">
					<p class="text-gray-500">
						No words available. Please add new words or reset to defaults.
					</p>
				</div>
				<WordList v-else :words="words" class="word-list-container" />
			</Column>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import WordList from "@/components/words/WordList.vue";
import WordsActions from "@/components/words/WordActions.vue";
import AddWord from "@/components/words/AddWord.vue";
import Column from "~/components/ui/Column.vue";

const store = useStore();
const words = computed(() => store.getters["words/allWords"]);
const wordListRef = ref(WordList);

onMounted(() => {
	store.dispatch("words/initializeWords");
});
</script>

<style scoped>
.word-list-container {
	@apply bg-white p-5 rounded-lg shadow-md  max-h-[600px] overflow-y-auto border border-gray-300 relative;
}
</style>
