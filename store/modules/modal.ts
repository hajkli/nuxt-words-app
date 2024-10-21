import { Module } from "vuex";

export interface ModalState {
	isVisible: boolean;
	title: string;
	message: string;
	callback: (() => void) | null;
}

export const modalModule: Module<ModalState, any> = {
	namespaced: true,
	state: () => ({
		isVisible: false,
		title: "",
		message: "",
		callback: null,
	}),
	mutations: {
		SHOW_MODAL(state, { title, message, callback }) {
			state.isVisible = true;
			state.title = title;
			state.message = message;
			state.callback = callback;
		},
		HIDE_MODAL(state) {
			state.isVisible = false;
			state.title = "";
			state.message = "";
			state.callback = null;
		},
	},
	actions: {
		showModal({ commit }, { title, message, callback }) {
			commit("SHOW_MODAL", { title, message, callback });
		},
		hideModal({ commit }) {
			commit("HIDE_MODAL");
		},
	},
	getters: {
		modalState: (state) => state,
	},
};
