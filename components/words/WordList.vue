<template>
	<div ref="scrollContainer" @scroll="onScroll">
		<div class="relative w-full" :style="{ height: totalHeight + 'px' }">
			<div
				v-for="(item, index) in visibleItems"
				:key="item.id"
				class="absolute w-full transition-transform duration-200 ease-linear"
				:style="{ top: itemTopPositions[index] + 'px' }"
				:draggable="isDraggingEnabled"
				@dragstart="isDraggingEnabled ? onDragStart(item) : null"
				@dragover.prevent="isDraggingEnabled ? onDragOver(index) : null"
				@drop="isDraggingEnabled ? onDrop(index) : null"
				@dragend="isDraggingEnabled ? onDragEnd : null"
				@touchstart="isDraggingEnabled ? onTouchStart($event, item) : null"
				@touchmove.prevent="isDraggingEnabled ? onTouchMove($event) : null"
				@touchend="isDraggingEnabled ? onTouchEnd($event) : null"
			>
				<WordCard
					:isDraggedOver="isOverIndex === index"
					:word="item"
					@removeWord="onWordRemove"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import WordCard from "./WordCard.vue";
import { defineProps } from "vue";
import type { Word } from "@/types/word";
import { useStore } from "vuex";

const props = defineProps({
	words: {
		type: Array<Word>,
		required: true,
	},
});
const store = useStore();
const scrollContainer = ref<HTMLElement | null>(null);
const itemHeight = 65;
const visibleCount = 20;

const startIndex = ref(0);
const wordsRef = ref([...props.words]);
const isOverIndex = ref<number | null>(null);
const isDraggingEnabled = ref(false);

onMounted(() => {
	scrollToTop();

	store.watch(
		() => store.getters["words/allWords"],
		(newWords, oldWords) => {
			wordsRef.value = [...newWords];
			if (newWords.length > oldWords.length) {
				scrollToTop();
			}
		}
	);

	store.watch(
		() => store.getters["words/isDragable"],
		(newValue) => {
			isDraggingEnabled.value = newValue;
		},
		{ immediate: true }
	);
});

const scrollToTop = () => {
	if (scrollContainer.value) {
		scrollContainer.value.scrollTop = 0;
	}
};
//Virtual scrolling logic
const visibleItems = computed(() => {
	return wordsRef.value.slice(
		startIndex.value,
		startIndex.value + visibleCount
	);
});

const totalHeight = computed(() => {
	return wordsRef.value.length * itemHeight;
});

const itemTopPositions = computed(() => {
	return visibleItems.value.map(
		(_, index) => (startIndex.value + index) * itemHeight
	);
});

const onScroll = () => {
	if (scrollContainer.value) {
		const scrollTop = scrollContainer.value.scrollTop;
		startIndex.value = Math.floor(scrollTop / itemHeight);
	}
};

// Drag-and-Drop Logic
const draggedItem = ref<Word | null>(null);

const onDragStart = (item: Word) => {
	draggedItem.value = item;
};

const onDragOver = (hoveredItemIndex: number) => {
	isOverIndex.value = hoveredItemIndex;
};

const onDrop = (targetIndex: number) => {
	if (draggedItem.value) {
		const newWordsList = [...wordsRef.value];
		const draggedItemIndex = newWordsList.findIndex(
			(word) => draggedItem.value && word.id === draggedItem.value.id
		);

		if (draggedItemIndex !== -1) {
			newWordsList.splice(draggedItemIndex, 1);
			newWordsList.splice(targetIndex + startIndex.value, 0, draggedItem.value);

			wordsRef.value = newWordsList;
			store.dispatch("words/setWords", newWordsList);
		}

		draggedItem.value = null;
		isOverIndex.value = null;
	}
};

const onDragEnd = () => {
	// Reset drag-related states
	draggedItem.value = null;
	isOverIndex.value = null;
};

// Touch Logic
const onTouchStart = (event: TouchEvent, item: Word) => {
	if (!isDraggingEnabled.value) return;
	event.preventDefault();
	draggedItem.value = item;
};

const onTouchMove = (event: TouchEvent) => {
	if (!isDraggingEnabled.value || !scrollContainer.value) return;

	const touch = event.touches[0];
	if (touch) {
		const containerRect = scrollContainer.value.getBoundingClientRect();
		const touchYRelativeToContainer = touch.clientY - containerRect.top;

		const absoluteTouchY =
			touchYRelativeToContainer + scrollContainer.value.scrollTop;

		const targetIndex =
			Math.floor(absoluteTouchY / itemHeight) - startIndex.value;

		isOverIndex.value = targetIndex;
	}
};

const onTouchEnd = (event: TouchEvent) => {
	if (!isDraggingEnabled.value) return;
	if (isOverIndex.value !== null && draggedItem.value) {
		onDrop(isOverIndex.value);
	}
	draggedItem.value = null;
	isOverIndex.value = null;
};

const onWordRemove = (wordId: string) => {
	store.dispatch("words/removeWord", wordId);
};
</script>

<style scoped></style>
