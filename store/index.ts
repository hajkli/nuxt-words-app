import { createStore } from "vuex";
import { userModule } from "./modules/user";
import { wordsModule } from "./modules/words";
import { modalModule } from "./modules/modal";

export const store = createStore({
	modules: {
		user: userModule,
		words: wordsModule,
		modal: modalModule,
	},
});

store.subscribe((mutation, state) => {
	if (mutation.type.startsWith("words/")) {
		localStorage.setItem("words", JSON.stringify(state.words.words));
	}
});

export default store;
