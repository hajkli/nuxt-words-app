import { Module } from "vuex";

export const userModule: Module<any, any> = {
	namespaced: true,
	state: () => ({
		user: null,
	}),
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		clearUser(state) {
			state.user = null;
		},
	},
	actions: {
		login({ commit }, user) {
			commit("setUser", user);
		},
		logout({ commit }) {
			commit("clearUser");
		},
	},
	getters: {
		isAuthenticated: (state) => !!state.user,
		getUsername: (state) => state.user,
	},
};
