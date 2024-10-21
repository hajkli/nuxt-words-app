import { createStore } from "vuex";
import { wordsModule } from "~/store/modules/words";
import { Word } from "~/types/word";

// Mockovanie fetch
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		status: 200,
		statusText: "OK",
		headers: {
			get: () => null,
		},
		json: () =>
			Promise.resolve([
				{ id: "1", text: "mocked word 1" },
				{ id: "2", text: "mocked word 2" },
			]),
	} as unknown as Response)
) as jest.Mock;

describe("wordsModule Vuex Store", () => {
	let store: any;

	beforeEach(() => {
		store = createStore({
			modules: {
				words: wordsModule,
			},
		});
	});

	it("should have initial state", () => {
		const state = store.state.words;
		expect(state.words).toEqual([]);
		expect(state.dragable).toBe(false);
	});

	it("should set words correctly", () => {
		const words: Word[] = [
			{ id: "1", text: "testword1" },
			{ id: "2", text: "testword2" },
		];
		store.dispatch("words/setWords", words);
		const state = store.state.words;
		expect(state.words).toEqual(words);
	});

	it("should add a word correctly", () => {
		const word: Word = { id: "3", text: "test" };
		store.dispatch("words/addWord", word);
		const state = store.state.words;
		expect(state.words).toContainEqual(word);
	});

	it("should remove a word by ID", () => {
		const word: Word = { id: "3", text: "test" };
		store.dispatch("words/addWord", word);
		store.dispatch("words/removeWord", word.id);
		const state = store.state.words;
		expect(state.words).not.toContainEqual(word);
	});

	it("should set dragable state correctly", () => {
		store.dispatch("words/setDragable", true);
		const state = store.state.words;
		expect(state.dragable).toBe(true);
	});

	it("should initialize words from localStorage", () => {
		const words: Word[] = [
			{ id: "1", text: "stored word 1" },
			{ id: "2", text: "stored word 2" },
		];
		localStorage.setItem("words", JSON.stringify(words));
		store.dispatch("words/initializeWords");
		const state = store.state.words;
		expect(state.words).toEqual(words);
		localStorage.removeItem("words"); // Clean up
	});

	it("should fetch words correctly", async () => {
		await store.dispatch("words/fetchWords");
		const state = store.state.words;
		expect(state.words).toEqual([
			{ id: "1", text: "mocked word 1" },
			{ id: "2", text: "mocked word 2" },
		]);
	});

	it("should handle error in fetchWords gracefully", async () => {
		(global.fetch as jest.Mock).mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
			} as Response)
		);

		await store.dispatch("words/fetchWords");
		const state = store.state.words;
		expect(state.words).toEqual([]);
	});

	it("should get all words", () => {
		const words: Word[] = [
			{ id: "1", text: "test1" },
			{ id: "2", text: "test2" },
		];
		store.dispatch("words/setWords", words);
		const allWords = store.getters["words/allWords"];
		expect(allWords).toEqual(words);
	});

	it("should get dragable state", () => {
		store.dispatch("words/setDragable", true);
		const isDragable = store.getters["words/isDragable"];
		expect(isDragable).toBe(true);
	});
});
