import { Module } from "vuex";
import { Word } from "~/types/word";

export const wordsModule: Module<any, any> = {
	namespaced: true,
	state: () => ({
		words: [] as Word[],
		dragable: false as boolean,
	}),
	mutations: {
		SET_WORDS(state, words: Word[]) {
			state.words = words;
		},
		ADD_WORD(state, word: Word) {
			state.words = [word, ...state.words];
		},
		REMOVE_WORD(state, wordId: string) {
			state.words = state.words.filter((w: Word) => w.id !== wordId);
		},
		SET_DRAGABLE(state, dragable: boolean) {
			state.dragable = dragable;
		},
	},
	actions: {
		async fetchWords({ commit }) {
			const baseUrl = "http://localhost:3001";
			if (!baseUrl) {
				console.error(
					"API base URL is not defined. Please check the environment configuration."
				);
				return;
			}

			try {
				const response = await fetch(`${baseUrl}/words`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch words: ${response.status} ${response.statusText}`
					);
				}

				const words: Word[] = await response.json();
				commit("SET_WORDS", words);
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error fetching words:", error.message);
				} else {
					console.error("An unknown error occurred while fetching words.");
				}
			}
		},
		addWord({ commit, state }, word: Word) {
			const newId =
				Math.max(0, ...state.words.map((w: Word) => parseInt(w.id))) + 1;
			word.id = newId.toString();

			commit("ADD_WORD", word);
		},
		removeWord({ commit }, wordId: string) {
			commit("REMOVE_WORD", wordId);
		},
		async resetWords({ dispatch }) {
			await dispatch("fetchWords");
		},
		setWords({ commit }, words: Word[]) {
			commit("SET_WORDS", words);
		},
		initializeWords({ dispatch, commit }) {
			const storedWords = localStorage.getItem("words");
			if (storedWords) {
				const words: Word[] = JSON.parse(storedWords);
				commit("SET_WORDS", words);
			} else {
				dispatch("fetchWords");
			}
		},
		setDragable({ commit }, dragable: boolean) {
			commit("SET_DRAGABLE", dragable);
		},
	},
	getters: {
		allWords: (state) => state.words,
		isDragable: (state) => state.dragable,
	},
};
