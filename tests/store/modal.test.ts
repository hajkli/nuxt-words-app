import { createStore } from "vuex";
import { modalModule, ModalState } from "~/store/modules/modal";
import { expect } from "@jest/globals";

describe("modalModule", () => {
	let store: any;

	beforeEach(() => {
		store = createStore({
			modules: {
				modal: modalModule,
			},
		});
	});

	it("should have the correct initial state", () => {
		const state: ModalState = store.state.modal;
		expect(state.isVisible).toBe(false);
		expect(state.title).toBe("");
		expect(state.message).toBe("");
		expect(state.callback).toBe(null);
	});

	it("should show modal with correct data on SHOW_MODAL mutation", () => {
		const payload = {
			title: "Test Title",
			message: "Test Message",
			callback: jest.fn(),
		};
		store.commit("modal/SHOW_MODAL", payload);
		const state: ModalState = store.state.modal;
		expect(state.isVisible).toBe(true);
		expect(state.title).toBe(payload.title);
		expect(state.message).toBe(payload.message);
		expect(state.callback).toBe(payload.callback);
	});

	it("should hide modal on HIDE_MODAL mutation", () => {
		store.commit("modal/HIDE_MODAL");
		const state: ModalState = store.state.modal;
		expect(state.isVisible).toBe(false);
		expect(state.title).toBe("");
		expect(state.message).toBe("");
		expect(state.callback).toBe(null);
	});

	it("should dispatch showModal action and commit SHOW_MODAL mutation", () => {
		const payload = {
			title: "Test Title",
			message: "Test Message",
			callback: jest.fn(),
		};
		store.dispatch("modal/showModal", payload);
		const state: ModalState = store.state.modal;
		expect(state.isVisible).toBe(true);
		expect(state.title).toBe(payload.title);
		expect(state.message).toBe(payload.message);
		expect(state.callback).toBe(payload.callback);
	});

	it("should dispatch hideModal action and commit HIDE_MODAL mutation", () => {
		store.dispatch("modal/hideModal");
		const state: ModalState = store.state.modal;
		expect(state.isVisible).toBe(false);
		expect(state.title).toBe("");
		expect(state.message).toBe("");
		expect(state.callback).toBe(null);
	});

	it("should return the correct modal state from modalState getter", () => {
		const state: ModalState = store.getters["modal/modalState"];
		expect(state).toEqual(store.state.modal);
	});
});
