import { createStore } from 'vuex';
import AddWord from '@/components/words/AddWord.vue';
import { describe, it, expect } from '@jest/globals';
import { mount } from '@vue/test-utils';

// Vytvorenie mock Vuex obchodu
const store = createStore({
  modules: {
    words: {
      namespaced: true,
      state: () => ({
        words: [],
        dragable: false,
      }),
      actions: {
		  addWord: jest.fn(({ commit, state }, word) => {
			  console.log("addWord", word);
         const newId =
				Math.max(0, ...state.words.map((w) => parseInt(w.id))) + 1;
			word.id = newId.toString();

			commit("ADD_WORD", word);
        }),
      },
      mutations: {
        SET_WORDS(state, words) {
          state.words = words;
        },
        ADD_WORD(state, word) {
          state.words = [word, ...state.words];
        },
        REMOVE_WORD(state, wordId) {
          state.words = state.words.filter((w) => w.id !== wordId);
        },
        SET_DRAGABLE(state, dragable) {
          state.dragable = dragable;
        },
      },
      getters: {
        allWords: (state) => state.words,
        isDragable: (state) => state.dragable,
      },
    },
  },
});


describe('addWord action', () => {
  let commit;
  let state;

  beforeEach(() => {
    commit = jest.fn();
    state = {
      words: [{ id: '1', text: 'hello' }, { id: '2', text: 'world' }]
    };
  });

  it('should add a new word with a new id', () => {
    const word = { text: 'new word' };
    const addWord = jest.fn(({ commit, state }, word) => {
      const newId = Math.max(0, ...state.words.map((w) => parseInt(w.id))) + 1;
      word.id = newId.toString();
      commit("ADD_WORD", word);
    });

    // Call the addWord method
    addWord({ commit, state }, word);

    // Check if commit was called with the correct mutation and payload
    expect(commit).toHaveBeenCalledWith("ADD_WORD", { id: '3', text: 'new word' });
  });
});