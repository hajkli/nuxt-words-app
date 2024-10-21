import { defineNuxtPlugin, NuxtApp } from "#app";
import { store } from "@/store";

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
	nuxtApp.vueApp.use(store);
});
